import { useRef, useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { ImageIcon, Loader2, X } from "lucide-react";

interface PhotoUploadProps {
  onUpload: (url: string) => void;
  currentUrl?: string;
}

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export default function PhotoUpload({ onUpload, currentUrl }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(currentUrl ?? "");

  const uploadMutation = trpc.upload.uploadImage.useMutation({
    onSuccess: ({ url }) => {
      setPreview(url);
      onUpload(url);
      toast.success("Image uploaded successfully");
    },
    onError: (err) => {
      toast.error(`Upload failed: ${err.message}`);
    },
  });

  const handleFile = (file: File) => {
    if (file.size > MAX_SIZE_BYTES) {
      toast.error("Image must be under 10 MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      uploadMutation.mutate({
        base64,
        filename: file.name,
        contentType: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  };

  const handleClear = () => {
    setPreview("");
    onUpload("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Cover preview"
            className="h-40 w-full max-w-sm rounded-lg object-cover border border-border"
          />
          {uploadMutation.isPending && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
          {!uploadMutation.isPending && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute -top-2 -right-2 rounded-full bg-background border border-border p-0.5 shadow hover:bg-muted transition"
              aria-label="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center gap-2 w-full max-w-sm h-32 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition cursor-pointer text-muted-foreground"
        >
          <ImageIcon className="w-6 h-6" />
          <span className="text-sm">Click or drag an image to upload</span>
          <span className="text-xs">PNG, JPG, WEBP — max 10 MB</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
