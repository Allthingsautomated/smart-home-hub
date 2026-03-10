import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Share2, Copy, Check } from "lucide-react";
import { useSocialMedia } from "@/hooks/useSocialMedia";

interface BlogShareMenuProps {
  blogPostId: number;
  blogUrl: string;
  blogTitle: string;
}

export function BlogShareMenu({
  blogPostId,
  blogUrl,
  blogTitle,
}: BlogShareMenuProps) {
  const [copied, setCopied] = useState(false);
  const [activePost, setActivePost] = useState<string | null>(null);
  const { connectedPlatforms, postToInstagram, postToX, postToYoutube } =
    useSocialMedia();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(blogUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareToInstagram = async () => {
    try {
      setActivePost("instagram");
      await postToInstagram(blogPostId);
      // Show success toast
    } catch (error) {
      console.error("Failed to post to Instagram:", error);
      // Show error toast
    } finally {
      setActivePost(null);
    }
  };

  const handleShareToX = async () => {
    try {
      setActivePost("x");
      await postToX(blogPostId, undefined, blogUrl);
      // Show success toast
    } catch (error) {
      console.error("Failed to post to X:", error);
      // Show error toast
    } finally {
      setActivePost(null);
    }
  };

  const handleShareToYoutube = async () => {
    try {
      setActivePost("youtube");
      await postToYoutube(blogPostId);
      // Show success toast
    } catch (error) {
      console.error("Failed to post to YouTube:", error);
      // Show error toast
    } finally {
      setActivePost(null);
    }
  };

  const isInstagramConnected = connectedPlatforms.some(
    (p) => p.platform === "instagram"
  );
  const isXConnected = connectedPlatforms.some((p) => p.platform === "x");
  const isYoutubeConnected = connectedPlatforms.some(
    (p) => p.platform === "youtube"
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
          Copy & Share
        </DropdownMenuLabel>

        <DropdownMenuItem onClick={handleCopyLink} className="gap-2">
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy link</span>
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
          Share on Social Media
        </DropdownMenuLabel>

        {/* Instagram */}
        <DropdownMenuItem
          onClick={handleShareToInstagram}
          disabled={!isInstagramConnected || activePost === "instagram"}
          className="gap-2"
        >
          <span className="text-lg">📷</span>
          <span className="flex-1">Instagram</span>
          {activePost === "instagram" && (
            <span className="text-xs text-muted-foreground">Posting...</span>
          )}
        </DropdownMenuItem>

        {/* X */}
        <DropdownMenuItem
          onClick={handleShareToX}
          disabled={!isXConnected || activePost === "x"}
          className="gap-2"
        >
          <span className="text-lg">𝕏</span>
          <span className="flex-1">X (Twitter)</span>
          {activePost === "x" && (
            <span className="text-xs text-muted-foreground">Posting...</span>
          )}
        </DropdownMenuItem>

        {/* YouTube */}
        <DropdownMenuItem
          onClick={handleShareToYoutube}
          disabled={!isYoutubeConnected || activePost === "youtube"}
          className="gap-2"
        >
          <span className="text-lg">▶️</span>
          <span className="flex-1">YouTube</span>
          {activePost === "youtube" && (
            <span className="text-xs text-muted-foreground">Posting...</span>
          )}
        </DropdownMenuItem>

        {/* No connections message */}
        {!isInstagramConnected && !isXConnected && !isYoutubeConnected && (
          <>
            <DropdownMenuSeparator className="my-2" />
            <div className="px-2 py-1.5 text-xs text-muted-foreground">
              No social media accounts connected
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
