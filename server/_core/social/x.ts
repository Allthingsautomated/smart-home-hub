import { ENV } from "../env";
import { decryptCredentials } from "./credentialManager";

interface XTweetResult {
  data: {
    id: string;
    text: string;
  };
}

interface XMetricsResult {
  data: {
    public_metrics: {
      retweet_count: number;
      reply_count: number;
      like_count: number;
      quote_count: number;
      bookmark_count: number;
      impression_count: number;
    };
  };
}

/**
 * X (Twitter) API v2 Service
 * Handles posting tweets and retrieving metrics
 * API Reference: https://developer.twitter.com/en/docs/twitter-api
 */

const X_API_V2 = "https://api.twitter.com/2";

/**
 * Posts a tweet to X
 */
export async function postTweetToX(
  encryptedCredentials: string,
  text: string,
  mediaIds?: string[]
): Promise<{ postId: string }> {
  try {
    const credentials = decryptCredentials(encryptedCredentials);

    const payload: Record<string, any> = {
      text,
    };

    if (mediaIds && mediaIds.length > 0) {
      payload.media = {
        media_ids: mediaIds,
      };
    }

    const response = await fetch(`${X_API_V2}/tweets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${credentials.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `X API error: ${error.errors?.[0]?.message || response.statusText}`
      );
    }

    const data = (await response.json()) as XTweetResult;

    return {
      postId: data.data.id,
    };
  } catch (error) {
    throw new Error(
      `Failed to post tweet to X: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Gets metrics for a specific tweet
 */
export async function getTweetMetrics(
  tweetId: string,
  encryptedCredentials: string
): Promise<{
  views: number;
  likes: number;
  retweets: number;
  replies: number;
  quotes: number;
}> {
  try {
    const credentials = decryptCredentials(encryptedCredentials);

    const response = await fetch(
      `${X_API_V2}/tweets/${tweetId}?tweet.fields=public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${credentials.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch tweet metrics");
    }

    const data = (await response.json()) as XMetricsResult;
    const metrics = data.data.public_metrics;

    return {
      views: metrics.impression_count,
      likes: metrics.like_count,
      retweets: metrics.retweet_count,
      replies: metrics.reply_count,
      quotes: metrics.quote_count,
    };
  } catch (error) {
    console.error(
      `Failed to get X tweet metrics: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return { views: 0, likes: 0, retweets: 0, replies: 0, quotes: 0 };
  }
}

/**
 * Uploads media to X for use in tweets
 */
export async function uploadMediaToX(
  mediaUrl: string,
  encryptedCredentials: string,
  mediaType: "image" | "gif" | "video" = "image"
): Promise<string> {
  try {
    const credentials = decryptCredentials(encryptedCredentials);

    // Download the media file
    const mediaResponse = await fetch(mediaUrl);
    if (!mediaResponse.ok) {
      throw new Error("Failed to download media file");
    }

    const mediaBuffer = await mediaResponse.arrayBuffer();
    const mediaData = Buffer.from(mediaBuffer).toString("base64");

    // Upload to X
    const body = new URLSearchParams({
      media_data: mediaData,
      media_category: mediaType === "video" ? "TweetGif" : "TweetImage",
    });

    const response = await fetch(`https://upload.twitter.com/1.1/media/upload.json`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${credentials.accessToken}`,
      },
      body,
    });

    if (!response.ok) {
      throw new Error("Failed to upload media to X");
    }

    const data = (await response.json()) as { media_id_string: string };
    return data.media_id_string;
  } catch (error) {
    throw new Error(
      `Failed to upload media to X: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Generates OAuth authorization URL for X
 */
export function generateXAuthUrl(redirectUri: string, codeChallenge: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: ENV.xClientId,
    redirect_uri: redirectUri,
    scope: "tweet.write tweet.read users.read",
    state: Math.random().toString(36).substring(7),
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  return `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
}

/**
 * Exchanges X authorization code for access token
 */
export async function exchangeXAuthCode(
  code: string,
  redirectUri: string,
  codeVerifier: string
): Promise<{ accessToken: string; expiresIn: number; refreshToken?: string }> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: ENV.xClientId,
    redirect_uri: redirectUri,
    code,
    code_verifier: codeVerifier,
  });

  const response = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${ENV.xClientId}:${ENV.xClientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Failed to exchange X auth code: ${error.error_description || response.statusText}`
    );
  }

  const data = (await response.json()) as {
    access_token: string;
    expires_in: number;
    refresh_token?: string;
  };

  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
    refreshToken: data.refresh_token,
  };
}

/**
 * Refreshes X access token using refresh token
 */
export async function refreshXAccessToken(
  refreshToken: string
): Promise<{ accessToken: string; expiresIn: number }> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: ENV.xClientId,
  });

  const response = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${ENV.xClientId}:${ENV.xClientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    throw new Error("Failed to refresh X access token");
  }

  const data = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };

  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
  };
}

/**
 * Validates X API credentials
 */
export async function validateXCredentials(
  encryptedCredentials: string
): Promise<boolean> {
  try {
    const credentials = decryptCredentials(encryptedCredentials);
    const response = await fetch(`${X_API_V2}/users/me`, {
      headers: {
        Authorization: `Bearer ${credentials.accessToken}`,
      },
    });

    return response.ok;
  } catch {
    return false;
  }
}
