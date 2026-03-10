import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type Platform = "instagram" | "x" | "youtube";

interface SocialSettingsModalProps {
  platform: Platform;
  onClose: () => void;
}

const settingsSchema = z.object({
  autoPost: z.boolean(),
  hashtagTemplate: z.string().optional(),
  contentTemplate: z.string().optional(),
  isEnabled: z.boolean(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

const platformInfo: Record<Platform, { title: string; limits: string }> = {
  instagram: {
    title: "Instagram Settings",
    limits: "Character limit: 2,200 characters",
  },
  x: {
    title: "X (Twitter) Settings",
    limits: "Character limit: 280 characters per post",
  },
  youtube: {
    title: "YouTube Settings",
    limits: "Character limit: 5,000 characters",
  },
};

export function SocialSettingsModal({
  platform,
  onClose,
}: SocialSettingsModalProps) {
  const getPlatformSettings = trpc.social.getPlatformSettings.useQuery({
    platform,
  });

  const updateSettingsMutation =
    trpc.social.updatePlatformSettings.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      autoPost: false,
      hashtagTemplate: "",
      contentTemplate: "",
      isEnabled: true,
    },
  });

  // Load existing settings
  useEffect(() => {
    if (getPlatformSettings.data) {
      reset({
        autoPost: getPlatformSettings.data.autoPost === "true",
        hashtagTemplate: getPlatformSettings.data.hashtagTemplate || "",
        contentTemplate: getPlatformSettings.data.contentTemplate || "",
        isEnabled: getPlatformSettings.data.isEnabled !== "false",
      });
    }
  }, [getPlatformSettings.data, reset]);

  const onSubmit = async (data: SettingsFormData) => {
    try {
      await updateSettingsMutation.mutateAsync({
        platform,
        ...data,
      });
      toast.success("Settings saved successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to save settings");
      console.error("Settings error:", error);
    }
  };

  const info = platformInfo[platform];
  const isLoading =
    getPlatformSettings.isLoading || updateSettingsMutation.isPending;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{info.title}</DialogTitle>
          <DialogDescription>{info.limits}</DialogDescription>
        </DialogHeader>

        {getPlatformSettings.isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Enable/Disable Toggle */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <Checkbox
                id="isEnabled"
                {...register("isEnabled")}
                defaultChecked={true}
              />
              <Label htmlFor="isEnabled" className="cursor-pointer">
                Enable posting to {platform === "x" ? "X" : platform}
              </Label>
            </div>

            {/* Auto-Post Toggle */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <Checkbox id="autoPost" {...register("autoPost")} />
              <Label htmlFor="autoPost" className="cursor-pointer">
                Auto-post blog content when published
              </Label>
            </div>

            {/* Hashtag Template */}
            <div>
              <Label htmlFor="hashtagTemplate">
                Hashtag Template{" "}
                <span className="text-sm text-gray-500">(optional)</span>
              </Label>
              <Input
                id="hashtagTemplate"
                placeholder="#example #hashtags"
                {...register("hashtagTemplate")}
                disabled={isLoading}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                These hashtags will be added to all posts
              </p>
              {errors.hashtagTemplate && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.hashtagTemplate.message}
                </p>
              )}
            </div>

            {/* Content Template */}
            <div>
              <Label htmlFor="contentTemplate">
                Content Template{" "}
                <span className="text-sm text-gray-500">(optional)</span>
              </Label>
              <Textarea
                id="contentTemplate"
                placeholder="Example: Check out our latest blog post: {title} - {url}"
                {...register("contentTemplate")}
                disabled={isLoading}
                className="mt-1 h-24 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Available variables: {"{title}"}, {"{excerpt}"}, {"{url}"}
              </p>
              {errors.contentTemplate && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.contentTemplate.message}
                </p>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700">
              <p className="font-medium mb-1">Templates:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>{"{title}"} - Blog post title</li>
                <li>{"{excerpt}"} - Blog post excerpt</li>
                <li>{"{url}"} - Blog post URL</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Save Settings
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
