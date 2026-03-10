import { ENV } from "../env";
import { decryptCredentials, updateCredentialExpiry } from "./credentialManager";

interface InstagramMediaResult {
  id: string;
}

interface InstagramInsightsResult {
  data: Array<{
    name: string;
    period: string;
    values: Array<{ value: number }>;
  }>;
}

/**
 * Instagram Graph API Service
 * Handles posting to Instagram and retrieving metrics
 * API Reference: https://developers.facebook.com/docs/instagram-api
 */

const INSTAGRAM_API_VERSION = "v18.0";
const INSTAGRAM_GRAPH_API = "https://graph.instagram.com";

/**
 * Posts media to Instagram
 * Supports carousel posts (multiple images) and single image posts
 */
export async function postMediaToInstagram(
  encryptedCredentials: string,
  caption: string,
  imageUrl: string,
  businessAccountId?: string
): Promise<{ postId: string }> {
  try {
    const credentials = decryptCredentials(encryptedCredentials);

    // If no account ID provided, get the user's Instagram Business Account
    const accountId = businessAccountId || (await getInstagramBusinessAccountId(credentials.accessToken));

    if (!accountId) {
      throw new Error("Instagram business account not found");
    }

    // Create the media container
    const containerResult = await createMediaContainer(
      accountId,
      credentials.accessToken,
      caption,
      imageUrl
    );

    if (!containerResult.id) {
      throw new Error("Failed to create media container");
    }

    // Publish the media using the container ID
    const publishResult = await publishMedia(
      accountId,
      credentials.accessToken,
      containerResult.id
    );

    return {
      postId: publishResult.id,
    };
  } catch (error) {
    throw new Error(
      `Failed to post to Instagram: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Creates a media container on Instagram (prerequisite for publishing)
 */
async function createMediaContainer(
  businessAccountId: string,
  accessToken: string,
  caption: string,
  imageUrl: string
): Promise<InstagramMediaResult> {
  const url = `${INSTAGRAM_GRAPH_API}/${businessAccountId}/media`;

  const body = new URLSearchParams({
    image_url: imageUrl,
    caption: caption,
    access_token: accessToken,
  });

  const response = await fetch(url, {
    method: "POST",
    body,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Instagram API error: ${error.error?.message || response.statusText}`
    );
  }

  return response.json() as Promise<InstagramMediaResult>;
}

/**
 * Publishes a media container to Instagram feed
 */
async function publishMedia(
  businessAccountId: string,
  accessToken: string,
  containerCreationId: string
): Promise<InstagramMediaResult> {
  const url = `${INSTAGRAM_GRAPH_API}/${businessAccountId}/media_publish`;

  const body = new URLSearchParams({
    creation_id: containerCreationId,
    access_token: accessToken,
  });

  const response = await fetch(url, {
    method: "POST",
    body,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Instagram API error: ${error.error?.message || response.statusText}`
    );
  }

  return response.json() as Promise<InstagramMediaResult>;
}

/**
 * Gets the Instagram Business Account ID for the authenticated user
 */
export async function getInstagramBusinessAccountId(
  accessToken: string
): Promise<string | null> {
  const url = `${INSTAGRAM_GRAPH_API}/me/ig_user_id?access_token=${accessToken}`;

  const response = await fetch(url);

  if (!response.ok) {
    console.error("Failed to get Instagram business account ID");
    return null;
  }

  const data = (await response.json()) as { ig_user_id: string };
  return data.ig_user_id;
}

/**
 * Gets insights for a specific Instagram post
 */
export async function getPostInsights(
  postId: string,
  encryptedCredentials: string
): Promise<{ views: number; likes: number; comments: number; shares: number }> {
  try {
    const credentials = decryptCredentials(encryptedCredentials);
    const url = `${INSTAGRAM_GRAPH_API}/${postId}/insights?metric=impressions,engagement,reach&access_token=${credentials.accessToken}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch post insights");
    }

    const data = (await response.json()) as InstagramInsightsResult;

    const insights = {
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
    };

    // Parse insights data
    for (const metric of data.data) {
      if (metric.values && metric.values.length > 0) {
        const value = metric.values[0].value;
        if (metric.name === "impressions") insights.views = value;
        if (metric.name === "engagement") insights.likes = value;
      }
    }

    return insights;
  } catch (error) {
    console.error(
      `Failed to get Instagram post insights: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return { views: 0, likes: 0, comments: 0, shares: 0 };
  }
}

/**
 * Generates OAuth authorization URL for Instagram
 */
export function generateInstagramAuthUrl(redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: ENV.instagramAppId,
    redirect_uri: redirectUri,
    scope: "instagram_business_content_publish,instagram_business_manage_messages",
    response_type: "code",
  });

  return `https://api.instagram.com/oauth/authorize?${params.toString()}`;
}

/**
 * Exchanges Instagram authorization code for access token
 */
export async function exchangeInstagramAuthCode(
  code: string,
  redirectUri: string
): Promise<{ accessToken: string; userId: string; expiresIn?: number }> {
  const body = new URLSearchParams({
    client_id: ENV.instagramAppId,
    client_secret: ENV.instagramAppSecret,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    code,
  });

  const response = await fetch("https://graph.instagram.com/v18.0/access_token", {
    method: "POST",
    body,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Failed to exchange Instagram auth code: ${error.error?.message || response.statusText}`
    );
  }

  const data = (await response.json()) as {
    access_token: string;
    user_id: string;
    expires_in?: number;
  };

  return {
    accessToken: data.access_token,
    userId: data.user_id,
    expiresIn: data.expires_in,
  };
}

/**
 * Refreshes Instagram access token (if applicable)
 * Instagram tokens are long-lived (60+ days) but may need refresh
 */
export async function refreshInstagramAccessToken(
  encryptedCredentials: string,
  refreshToken?: string
): Promise<string> {
  if (!refreshToken) {
    throw new Error("Instagram refresh token not available");
  }

  const body = new URLSearchParams({
    grant_type: "refresh_access_token",
    access_token: refreshToken,
  });

  const response = await fetch(
    `https://graph.instagram.com/v18.0/refresh_access_token?${body.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to refresh Instagram access token");
  }

  const data = (await response.json()) as {
    access_token: string;
    expires_in?: number;
  };

  return data.access_token;
}

/**
 * Validates Instagram API credentials
 */
export async function validateInstagramCredentials(
  encryptedCredentials: string
): Promise<boolean> {
  try {
    const credentials = decryptCredentials(encryptedCredentials);
    const url = `${INSTAGRAM_GRAPH_API}/me?access_token=${credentials.accessToken}`;

    const response = await fetch(url);
    return response.ok;
  } catch {
    return false;
  }
}
