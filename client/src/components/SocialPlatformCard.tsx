import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, LinkIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialPlatformCardProps {
  platform: "instagram" | "x" | "youtube";
  label: string;
  isConnected: boolean;
  accountHandle?: string;
  onConnect: () => void;
  onDisconnect: () => void;
  onSettings: () => void;
  isLoading?: boolean;
  error?: string;
}

export function SocialPlatformCard({
  platform,
  label,
  isConnected,
  accountHandle,
  onConnect,
  onDisconnect,
  onSettings,
  isLoading,
  error,
}: SocialPlatformCardProps) {
  const [showConfirmDisconnect, setShowConfirmDisconnect] = useState(false);

  const getPlatformColor = () => {
    switch (platform) {
      case "instagram":
        return "from-pink-500 to-purple-500";
      case "x":
        return "from-slate-900 to-slate-800";
      case "youtube":
        return "from-red-500 to-red-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getPlatformIcon = () => {
    switch (platform) {
      case "instagram":
        return "📷";
      case "x":
        return "𝕏";
      case "youtube":
        return "▶️";
      default:
        return "🔗";
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "text-3xl w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br",
                getPlatformColor()
              )}
            >
              {getPlatformIcon()}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{label}</h3>
              {isConnected && accountHandle && (
                <p className="text-sm text-muted-foreground">
                  @{accountHandle}
                </p>
              )}
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            {isConnected ? (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Connected</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-gray-500">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Not connected</span>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {!isConnected ? (
            <Button
              onClick={onConnect}
              disabled={isLoading}
              className="w-full gap-2"
            >
              <LinkIcon className="w-4 h-4" />
              {isLoading ? "Connecting..." : `Connect ${label}`}
            </Button>
          ) : (
            <>
              <Button
                onClick={onSettings}
                variant="outline"
                className="flex-1"
              >
                Settings
              </Button>

              {!showConfirmDisconnect ? (
                <Button
                  onClick={() => setShowConfirmDisconnect(true)}
                  variant="outline"
                  className="flex-1 text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              ) : (
                <div className="flex-1 flex gap-2">
                  <Button
                    onClick={() => setShowConfirmDisconnect(false)}
                    variant="outline"
                    className="flex-1"
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      onDisconnect();
                      setShowConfirmDisconnect(false);
                    }}
                    variant="destructive"
                    className="flex-1"
                    size="sm"
                  >
                    Disconnect
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Info Text */}
        {isConnected && (
          <p className="text-xs text-muted-foreground">
            Your account is securely connected. You can post blog content to
            this platform.
          </p>
        )}
      </div>
    </Card>
  );
}
