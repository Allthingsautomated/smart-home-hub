import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PreviewContent {
  content: string;
  characterCount: number;
  valid: boolean;
  message?: string;
}

interface SocialPreviewPanelProps {
  platform: "instagram" | "x" | "youtube";
  preview?: PreviewContent;
  isLoading?: boolean;
  error?: string;
}

export function SocialPreviewPanel({
  platform,
  preview,
  isLoading,
  error,
}: SocialPreviewPanelProps) {
  const getPlatformConfig = () => {
    switch (platform) {
      case "instagram":
        return {
          maxCharacters: 2200,
          label: "Instagram",
          icon: "📷",
          description: "Carousel/Feed Post",
          bgGradient: "from-pink-500 to-purple-500",
        };
      case "x":
        return {
          maxCharacters: 280,
          label: "X (Twitter)",
          icon: "𝕏",
          description: "Tweet",
          bgGradient: "from-slate-900 to-slate-800",
        };
      case "youtube":
        return {
          maxCharacters: 5000,
          label: "YouTube",
          icon: "▶️",
          description: "Community Post",
          bgGradient: "from-red-500 to-red-600",
        };
    }
  };

  const config = getPlatformConfig();
  const charCount = preview?.characterCount || 0;
  const maxChars = config.maxCharacters;
  const percentUsed = (charCount / maxChars) * 100;

  const getCharacterCountColor = () => {
    if (percentUsed > 100) return "text-red-600";
    if (percentUsed > 80) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b">
          <div
            className={cn(
              "text-3xl w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br",
              `bg-gradient-to-br ${config.bgGradient}`
            )}
          >
            {config.icon}
          </div>
          <div>
            <h3 className="font-semibold">{config.label}</h3>
            <p className="text-xs text-muted-foreground">{config.description}</p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-2">
            <div className="h-32 bg-muted rounded-lg animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-md bg-red-50 p-3 flex gap-2 items-start">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Preview Content */}
        {preview && !isLoading && !error && (
          <div className="space-y-3">
            {/* Validation Status */}
            <div className="flex items-center gap-2">
              {preview.valid ? (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Ready to post</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Content too long</span>
                </div>
              )}
            </div>

            {/* Content Preview */}
            <div className="bg-muted rounded-lg p-4 max-h-64 overflow-y-auto">
              <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                {preview.content}
              </p>
            </div>

            {/* Character Count */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-muted-foreground">
                  Character Count
                </span>
                <span className={cn("text-sm font-semibold", getCharacterCountColor())}>
                  {charCount} / {maxChars}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    percentUsed > 100
                      ? "bg-red-500"
                      : percentUsed > 80
                        ? "bg-orange-500"
                        : "bg-green-500"
                  )}
                  style={{ width: `${Math.min(percentUsed, 100)}%` }}
                />
              </div>
            </div>

            {/* Warning if over limit */}
            {preview.message && !preview.valid && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                {preview.message}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && !preview && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              Preview will appear here once content is generated
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
