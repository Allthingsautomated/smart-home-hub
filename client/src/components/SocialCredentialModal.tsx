import { useState } from "react";
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
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

type Platform = "instagram" | "x" | "youtube";

interface SocialCredentialModalProps {
  platform: Platform;
  onClose: () => void;
  onSave: (
    platform: Platform,
    accessToken: string,
    accountHandle: string,
    additionalData?: Record<string, string>
  ) => Promise<void>;
  isLoading?: boolean;
}

// Platform-specific credential schemas
const instagramSchema = z.object({
  accessToken: z.string().min(1, "Access token is required"),
  accountHandle: z.string().min(1, "Account handle is required"),
  businessAccountId: z.string().optional(),
});

const xSchema = z.object({
  accessToken: z.string().min(1, "Bearer token is required"),
  accountHandle: z.string().min(1, "Account handle (@username) is required"),
  apiKey: z.string().optional(),
  apiSecret: z.string().optional(),
});

const youtubeSchema = z.object({
  accessToken: z.string().min(1, "API key is required"),
  accountHandle: z.string().min(1, "Channel name is required"),
  channelId: z.string().optional(),
});

const schemas: Record<Platform, any> = {
  instagram: instagramSchema,
  x: xSchema,
  youtube: youtubeSchema,
};

const platformInfo: Record<Platform, { title: string; description: string }> = {
  instagram: {
    title: "Connect Instagram",
    description:
      "Enter your Instagram API credentials to enable posting to Instagram.",
  },
  x: {
    title: "Connect X (Twitter)",
    description: "Enter your X (Twitter) API credentials to enable posting.",
  },
  youtube: {
    title: "Connect YouTube",
    description:
      "Enter your YouTube API credentials to enable posting to YouTube.",
  },
};

const platformFields: Record<Platform, Array<{ name: string; label: string; placeholder: string; required: boolean }>> = {
  instagram: [
    {
      name: "accessToken",
      label: "Access Token",
      placeholder: "Your Instagram access token",
      required: true,
    },
    {
      name: "businessAccountId",
      label: "Business Account ID (optional)",
      placeholder: "Your Business Account ID",
      required: false,
    },
    {
      name: "accountHandle",
      label: "Account Handle",
      placeholder: "your.username",
      required: true,
    },
  ],
  x: [
    {
      name: "accessToken",
      label: "Bearer Token",
      placeholder: "Your X Bearer Token",
      required: true,
    },
    {
      name: "apiKey",
      label: "API Key (optional)",
      placeholder: "Your API Key",
      required: false,
    },
    {
      name: "apiSecret",
      label: "API Secret (optional)",
      placeholder: "Your API Secret",
      required: false,
    },
    {
      name: "accountHandle",
      label: "Account Handle",
      placeholder: "@yourhandle",
      required: true,
    },
  ],
  youtube: [
    {
      name: "accessToken",
      label: "API Key",
      placeholder: "Your YouTube API Key",
      required: true,
    },
    {
      name: "channelId",
      label: "Channel ID (optional)",
      placeholder: "Your Channel ID",
      required: false,
    },
    {
      name: "accountHandle",
      label: "Channel Name",
      placeholder: "Your Channel Name",
      required: true,
    },
  ],
};

export function SocialCredentialModal({
  platform,
  onClose,
  onSave,
  isLoading: externalIsLoading,
}: SocialCredentialModalProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [validationSuccess, setValidationSuccess] = useState(false);

  const schema = schemas[platform];
  const info = platformInfo[platform];
  const fields = platformFields[platform];

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const validateCreds = trpc.social.validateCredentials.useMutation();

  const handleTestConnection = async () => {
    const formData = getValues();
    if (!formData.accessToken) {
      setValidationError("Access token is required to test");
      return;
    }

    setIsValidating(true);
    setValidationError(null);
    setValidationSuccess(false);

    try {
      const result = await validateCreds.mutateAsync({
        platform,
      });

      if (result.valid) {
        setValidationSuccess(true);
        setValidationError(null);
      } else {
        setValidationError(result.message || "Invalid credentials");
        setValidationSuccess(false);
      }
    } catch (error) {
      setValidationError(
        error instanceof Error ? error.message : "Validation failed"
      );
      setValidationSuccess(false);
    } finally {
      setIsValidating(false);
    }
  };

  const onSubmit = async (data: any) => {
    setValidationError(null);
    try {
      await onSave(platform, data.accessToken, data.accountHandle, data);
    } catch (error) {
      setValidationError(
        error instanceof Error ? error.message : "Failed to save credentials"
      );
    }
  };

  const isLoading = externalIsLoading || isValidating;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{info.title}</DialogTitle>
          <DialogDescription>{info.description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Input Fields */}
          {fields.map((field) => (
            <div key={field.name}>
              <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Input
                id={field.name}
                type="password"
                placeholder={field.placeholder}
                {...register(field.name)}
                disabled={isLoading}
                className="mt-1"
              />
              {errors[field.name] && (
                <p className="text-sm text-red-500 mt-1">
                  {errors[field.name]?.message as string}
                </p>
              )}
            </div>
          ))}

          {/* Validation Messages */}
          {validationSuccess && (
            <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-md text-sm">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Credentials validated successfully</span>
            </div>
          )}

          {validationError && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Platform-specific info */}
          <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700">
            <p className="font-medium mb-1">How to get your credentials:</p>
            {platform === "instagram" && (
              <ul className="list-disc list-inside space-y-1">
                <li>Go to Instagram Developer Portal</li>
                <li>Create an app and get your access token</li>
                <li>Get your Business Account ID from App Roles</li>
              </ul>
            )}
            {platform === "x" && (
              <ul className="list-disc list-inside space-y-1">
                <li>Go to Twitter Developer Portal</li>
                <li>Create an application</li>
                <li>Generate Bearer Token from API Keys & Tokens</li>
              </ul>
            )}
            {platform === "youtube" && (
              <ul className="list-disc list-inside space-y-1">
                <li>Go to Google Cloud Console</li>
                <li>Enable YouTube Data API</li>
                <li>Create API Key in Credentials</li>
              </ul>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleTestConnection}
              disabled={isLoading}
            >
              {isValidating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Test Connection
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {externalIsLoading && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Connect
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
