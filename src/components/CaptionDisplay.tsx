
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CaptionDisplayProps {
  caption: string | null;
  isLoading: boolean;
  onRegenerate: () => void;
}

const CaptionDisplay: React.FC<CaptionDisplayProps> = ({
  caption,
  isLoading,
  onRegenerate,
}) => {
  const copyToClipboard = () => {
    if (!caption) return;
    
    navigator.clipboard.writeText(caption);
    toast.success("Caption copied to clipboard");
  };

  if (!caption && !isLoading) {
    return null;
  }

  return (
    <div className="mt-6 rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Generated Caption</h3>
        <div className="flex space-x-2">
          {caption && (
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              title="Copy to clipboard"
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
          {caption && (
            <Button
              variant="outline"
              size="icon"
              onClick={onRegenerate}
              disabled={isLoading}
              title="Generate new caption"
            >
              <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-md bg-muted p-3 font-mono text-sm">
        {isLoading ? (
          <div className="h-6 w-full animate-pulse-slow bg-gray-200 rounded"></div>
        ) : (
          <p>{caption}</p>
        )}
      </div>
    </div>
  );
};

export default CaptionDisplay;
