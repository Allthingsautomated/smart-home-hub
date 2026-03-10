import { ENV } from "../env";
import { decryptCredentials } from "./credentialManager";

interface YoutubeVideoResult {
  id: string;
}

interface YoutubePlaylistItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    playlistId: string;
    position: number;
  };
}

/**
 * YouTube Data API v3 Service
 * Handles posting to YouTube Community and managing playlists
 * API Reference: https://developers.google.com/youtube/v3
 */

const YOUTUBE_API_V3 = "https://www.googleapis.com/youtube/v3";

/**
 * Creates a YouTube community post
 * Community posts are text-based updates for channel members
 */
export async function createYoutubePost(
  encryptedCredentials: string,
  content: string,
  imageUrl?: string
): Promise<{ postId: string }> {
  try {
    const credentials = decryptCredentials(encryptedCredentials);

    // First, get the authenticated user's channel
    const channelId = await getYoutubeChannelId(credentials.accessToken);
    if (!channelId) {
      throw new Error("YouTube channel not found");
    }

    const payload: Record<string, any> = {
      snippet: {
        textContent: {
          content,
        },
      },
    };

    if (imageUrl) {
      payload.snippet.imageUrl = imageUrl;
    }

    const response = await fetch(
      `${YOUTUBE_API_V3}/activities?part=snippet&access_token=${credentials.accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `YouTube API error: ${error.error?.message || response.statusText}`
      );
    }

    const data = (await response.json()) as { id: string };

    return {
      postId: data.id,
    };
  } catch (error) {
    throw new Error(
      `Failed to create YouTube post: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Adds a video to a YouTube playlist
 * Useful for creating blog-related playlists
 */
export async function addVideoToPlaylist(
  encryptedCredentials: string,
  playlistId: string,
  videoId: string,
  note?: string
): Promise<{ itemId: string }> {
  try {
    const credentials = decryptCredentials(encryptedCredentials);

    const payload: Record<string, any> = {
      snippet: {
        playlistId,
        resourceId: {
          kind: "youtube#video",
          videoId,
        },
        position: 0,
      },
    };

    if (note) {
      payload.snippet.note = note;
    }

    const response = await fetch(
      `${YOUTUBE_API_V3}/playlistItems?part=snippet&access_token=${credentials.accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `YouTube API error: ${error.error?.message || response.statusText}`
      );
    }

    const data = (await response.json()) as YoutubePlaylistItem;

    return {
      itemId: data.id,
    };
  } catch (error) {
    throw new Error(
      `Failed to add video to playlist: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Gets the authenticated user's channel ID
 */
async function getYoutubeChannelId(accessToken: string): Promise<string | null> {
  const response = await fetch(
    `${YOUTUBE_API_V3}/channels?part=id&mine=true&access_token=${accessToken}`
  );

  if (!response.ok) {
    console.error("Failed to get YouTube channel ID");
    return null;
  }

  const data = (await response.json()) as {
    items: Array<{ id: string }>;
  };

  return data.items?.[0]?.id || null;
}

/**
 * Gets video statistics
 */
export async function getVideoStats(
  videoId: string,
  encryptedCredentials: string
): Promise<{
  views: number;
  likes: number;
  comments: number;
}> {
  try {
    const credentials = decryptCredentials(encryptedCredentials);

    const response = await fetch(
      `${YOUTUBE_API_V3}/videos?part=statistics&id=${videoId}&access_token=${credentials.accessToken}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch video statistics");
    }

    const data = (await response.json()) as {
      items: Array<{
        statistics: {
          viewCount: string;
          likeCount?: string;
          commentCount?: string;
        };
      }>;
    };

    const stats = data.items?.[0]?.statistics || {};

    return {
      views: parseInt(stats.viewCount || "0", 10),
      likes: parseInt(stats.likeCount || "0", 10),
      comments: parseInt(stats.commentCount || "0", 10),
    };
  } catch (error) {
    console.error(
      `Failed to get YouTube video stats: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return { views: 0, likes: 0, comments: 0 };
  }
}

/**
 * Creates a new YouTube playlist
 */
export async function createPlaylist(
  encryptedCredentials: string,
  title: string,
  description?: string,
  isPrivate: boolean = false
): Promise<string> {
  try {
    const credentials = decryptCredentials(encryptedCredentials);

    const payload = {
      snippet: {
        title,
        description,
      },
      status: {
        privacyStatus: isPrivate ? "private" : "public",
      },
    };

    const response = await fetch(
      `${YOUTUBE_API_V3}/playlists?part=snippet,status&access_token=${credentials.accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `YouTube API error: ${error.error?.message || response.statusText}`
      );
    }

    const data = (await response.json()) as { id: string };
    return data.id;
  } catch (error) {
    throw new Error(
      `Failed to create playlist: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Generates OAuth authorization URL for YouTube
 */
export function generateYoutubeAuthUrl(redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: ENV.youtubeClientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/youtube",
    access_type: "offline",
    prompt: "consent",
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

/**
 * Exchanges YouTube authorization code for access token
 */
export async function exchangeYoutubeAuthCode(
  code: string,
  redirectUri: string
): Promise<{ accessToken: string; refreshToken?: string; expiresIn: number }> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: ENV.youtubeClientId,
    client_secret: ENV.youtubeClientSecret,
    code,
    redirect_uri: redirectUri,
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Failed to exchange YouTube auth code: ${error.error_description || response.statusText}`
    );
  }

  const data = (await response.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  };

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}

/**
 * Refreshes YouTube access token
 */
export async function refreshYoutubeAccessToken(
  refreshToken: string
): Promise<{ accessToken: string; expiresIn: number }> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: ENV.youtubeClientId,
    client_secret: ENV.youtubeClientSecret,
    refresh_token: refreshToken,
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body,
  });

  if (!response.ok) {
    throw new Error("Failed to refresh YouTube access token");
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
 * Validates YouTube API credentials
 */
export async function validateYoutubeCredentials(
  encryptedCredentials: string
): Promise<boolean> {
  try {
    const credentials = decryptCredentials(encryptedCredentials);
    const response = await fetch(
      `${YOUTUBE_API_V3}/channels?part=id&mine=true&access_token=${credentials.accessToken}`
    );

    return response.ok;
  } catch {
    return false;
  }
}
