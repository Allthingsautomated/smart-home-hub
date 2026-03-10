import { useState } from "react";
import { trpc } from "@/lib/trpc";

interface Platform {
  name: "instagram" | "x" | "youtube";
  label: string;
  icon: string;
}

const PLATFORMS: Record<string, Platform> = {
  instagram: { name: "instagram", label: "Instagram", icon: "instagram" },
  x: { name: "x", label: "X (Twitter)", icon: "twitter" },
  youtube: { name: "youtube", label: "YouTube", icon: "youtube" },
};

/**
 * Hook for managing social media operations
 * Handles credential management, posting, and validation
 */
export function useSocialMedia() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<
    ("instagram" | "x" | "youtube")[]
  >([]);

  // Queries
  const connectedPlatforms = trpc.social.getConnectedPlatforms.useQuery();
  const platformSettings = trpc.social.getAllPlatformSettings.useQuery();
  const validateCreds = trpc.social.validateCredentials.useQuery({
    platform: selectedPlatforms[0] || "instagram",
  });

  // Mutations
  const connectAccountMutation =
    trpc.social.connectSocialAccount.useMutation();
  const disconnectAccountMutation =
    trpc.social.disconnectSocialAccount.useMutation();
  const getOAuthUrlMutation = trpc.social.getOAuthUrl.useMutation();
  const handleOAuthMutation = trpc.social.handleOAuthCallback.useMutation();
  const postToInstagramMutation = trpc.social.postToInstagram.useMutation();
  const postToXMutation = trpc.social.postToX.useMutation();
  const postToYoutubeMutation = trpc.social.postToYoutube.useMutation();
  const updateSettingsMutation =
    trpc.social.updatePlatformSettings.useMutation();
  const previewContentMutation = trpc.social.previewPlatformContent.useMutation();

  /**
   * Initiates OAuth flow for a platform
   */
  const connectPlatform = async (platform: "instagram" | "x" | "youtube") => {
    setIsConnecting(true);
    try {
      const result = await getOAuthUrlMutation.mutateAsync({ platform });
      // Store code verifier if provided (for X)
      if (result.codeVerifier) {
        sessionStorage.setItem(
          `oauth_verifier_${platform}`,
          result.codeVerifier
        );
      }
      // Redirect to OAuth provider
      window.location.href = result.url;
    } catch (error) {
      console.error(`Failed to get OAuth URL for ${platform}:`, error);
      setIsConnecting(false);
    }
  };

  /**
   * Completes OAuth flow
   */
  const completeOAuth = async (
    platform: "instagram" | "x" | "youtube",
    code: string
  ) => {
    try {
      const codeVerifier = sessionStorage.getItem(
        `oauth_verifier_${platform}`
      );
      const result = await handleOAuthMutation.mutateAsync({
        platform,
        code,
        codeVerifier: codeVerifier || undefined,
      });

      // Clean up
      sessionStorage.removeItem(`oauth_verifier_${platform}`);

      // Refresh connected platforms
      await connectedPlatforms.refetch();

      return result;
    } catch (error) {
      console.error(`OAuth callback failed for ${platform}:`, error);
      throw error;
    }
  };

  /**
   * Disconnects a social account
   */
  const disconnectPlatform = async (
    platform: "instagram" | "x" | "youtube"
  ) => {
    try {
      await disconnectAccountMutation.mutateAsync({ platform });
      await connectedPlatforms.refetch();
    } catch (error) {
      console.error(`Failed to disconnect ${platform}:`, error);
      throw error;
    }
  };

  /**
   * Posts to Instagram
   */
  const postToInstagram = async (
    blogPostId: number,
    caption?: string,
    businessAccountId?: string
  ) => {
    setIsPosting(true);
    try {
      return await postToInstagramMutation.mutateAsync({
        blogPostId,
        caption,
        businessAccountId,
      });
    } finally {
      setIsPosting(false);
    }
  };

  /**
   * Posts to X
   */
  const postToX = async (
    blogPostId: number,
    tweet?: string,
    blogUrl?: string
  ) => {
    setIsPosting(true);
    try {
      return await postToXMutation.mutateAsync({
        blogPostId,
        tweet,
        blogUrl,
      });
    } finally {
      setIsPosting(false);
    }
  };

  /**
   * Posts to YouTube
   */
  const postToYoutube = async (
    blogPostId: number,
    content?: string,
    imageUrl?: string
  ) => {
    setIsPosting(true);
    try {
      return await postToYoutubeMutation.mutateAsync({
        blogPostId,
        content,
        imageUrl,
      });
    } finally {
      setIsPosting(false);
    }
  };

  /**
   * Updates platform settings
   */
  const updateSettings = async (
    platform: "instagram" | "x" | "youtube",
    settings: {
      autoPost?: boolean;
      hashtagTemplate?: string;
      contentTemplate?: string;
    }
  ) => {
    try {
      return await updateSettingsMutation.mutateAsync({
        platform,
        ...settings,
      });
    } catch (error) {
      console.error(`Failed to update settings for ${platform}:`, error);
      throw error;
    }
  };

  /**
   * Preview content on platforms
   */
  const previewContent = async (
    blogPostId: number,
    platforms: ("instagram" | "x" | "youtube")[]
  ) => {
    try {
      return await previewContentMutation.mutateAsync({
        blogPostId,
        platforms,
      });
    } catch (error) {
      console.error("Failed to preview content:", error);
      throw error;
    }
  };

  /**
   * Gets platform information
   */
  const getPlatform = (name: "instagram" | "x" | "youtube") => {
    return PLATFORMS[name];
  };

  /**
   * Checks if a platform is connected
   */
  const isPlatformConnected = (platform: "instagram" | "x" | "youtube") => {
    return connectedPlatforms.data?.some((p) => p.platform === platform) ?? false;
  };

  return {
    // State
    isConnecting,
    isPosting,
    selectedPlatforms,
    setSelectedPlatforms,

    // Data
    connectedPlatforms: connectedPlatforms.data || [],
    platformSettings: platformSettings.data || [],
    isLoadingPlatforms: connectedPlatforms.isLoading,
    isLoadingSettings: platformSettings.isLoading,

    // Methods
    connectPlatform,
    completeOAuth,
    disconnectPlatform,
    postToInstagram,
    postToX,
    postToYoutube,
    updateSettings,
    previewContent,
    getPlatform,
    isPlatformConnected,

    // Mutations
    mutations: {
      connectAccount: connectAccountMutation,
      disconnectAccount: disconnectAccountMutation,
      postToInstagram: postToInstagramMutation,
      postToX: postToXMutation,
      postToYoutube: postToYoutubeMutation,
    },
  };
}
