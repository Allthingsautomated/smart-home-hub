import { useState } from "react";
import { SocialPlatformCard } from "@/components/SocialPlatformCard";
import { SocialCredentialModal } from "@/components/SocialCredentialModal";
import { SocialSettingsModal } from "@/components/SocialSettingsModal";
import ServicePageHeader from "@/components/ServicePageHeader";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type Platform = "instagram" | "x" | "youtube";

const PLATFORMS: Array<{ id: Platform; label: string }> = [
  { id: "instagram", label: "Instagram" },
  { id: "x", label: "X (Twitter)" },
  { id: "youtube", label: "YouTube" },
];

export default function AdminSocialConnections() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );
  const [showCredentialModal, setShowCredentialModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isLoading, setIsLoading] = useState<Record<Platform, boolean>>({
    instagram: false,
    x: false,
    youtube: false,
  });

  // Queries
  const connectedPlatforms = trpc.social.getConnectedPlatforms.useQuery();
  const validateCreds = trpc.social.validateCredentials.useQuery({
    platform: selectedPlatform || "instagram",
  });

  // Mutations
  const connectAccountMutation =
    trpc.social.connectSocialAccount.useMutation();
  const disconnectAccountMutation =
    trpc.social.disconnectSocialAccount.useMutation();

  const handleConnect = (platform: Platform) => {
    setSelectedPlatform(platform);
    setShowCredentialModal(true);
  };

  const handleDisconnect = async (platform: Platform) => {
    setIsLoading((prev) => ({ ...prev, [platform]: true }));
    try {
      await disconnectAccountMutation.mutateAsync({ platform });
      await connectedPlatforms.refetch();
      toast.success(`${PLATFORMS.find(p => p.id === platform)?.label} disconnected`);
    } catch (error) {
      toast.error(`Failed to disconnect ${platform}`);
      console.error("Disconnect error:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [platform]: false }));
    }
  };

  const handleOpenSettings = (platform: Platform) => {
    setSelectedPlatform(platform);
    setShowSettingsModal(true);
  };

  const handleSaveCredentials = async (
    platform: Platform,
    accessToken: string,
    accountHandle: string,
    additionalData?: Record<string, string>
  ) => {
    setIsLoading((prev) => ({ ...prev, [platform]: true }));
    try {
      await connectAccountMutation.mutateAsync({
        platform,
        accessToken,
        accountHandle,
      });
      await connectedPlatforms.refetch();
      setShowCredentialModal(false);
      toast.success(`${PLATFORMS.find(p => p.id === platform)?.label} connected successfully`);
    } catch (error) {
      toast.error(`Failed to connect ${platform}`);
      console.error("Connect error:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [platform]: false }));
    }
  };

  const connectedMap = new Map(
    connectedPlatforms.data?.map((p) => [p.platform, p]) || []
  );

  return (
    <div className="min-h-screen bg-white">
      <ServicePageHeader
        title="Social Media Connections"
        subtitle="Manage your connected social media accounts"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-gray-600 mb-8">
            Connect your social media accounts to enable automatic posting of
            blog content to your platforms.
          </p>

          {connectedPlatforms.isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PLATFORMS.map((p) => (
                <div
                  key={p.id}
                  className="h-64 bg-gray-200 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PLATFORMS.map((platform) => {
                const connected = connectedMap.get(platform.id);
                return (
                  <SocialPlatformCard
                    key={platform.id}
                    platform={platform.id}
                    label={platform.label}
                    isConnected={!!connected}
                    accountHandle={connected?.accountHandle}
                    onConnect={() => handleConnect(platform.id)}
                    onDisconnect={() => handleDisconnect(platform.id)}
                    onSettings={() => handleOpenSettings(platform.id)}
                    isLoading={isLoading[platform.id]}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Credential Input Modal */}
      {showCredentialModal && selectedPlatform && (
        <SocialCredentialModal
          platform={selectedPlatform}
          onClose={() => setShowCredentialModal(false)}
          onSave={handleSaveCredentials}
          isLoading={isLoading[selectedPlatform]}
        />
      )}

      {/* Settings Modal */}
      {showSettingsModal && selectedPlatform && (
        <SocialSettingsModal
          platform={selectedPlatform}
          onClose={() => setShowSettingsModal(false)}
        />
      )}
    </div>
  );
}
