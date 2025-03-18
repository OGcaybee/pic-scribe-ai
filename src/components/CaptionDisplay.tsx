
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Copy, CheckCircle2 } from "lucide-react";
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
    toast.success("Caption copied to clipboard", {
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    });
  };

  if (!caption && !isLoading) {
    return null;
  }

  return (
    <div className="mt-6 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-blue-800">Generated Caption</h3>
        <div className="flex space-x-2">
          {caption && (
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              title="Copy to clipboard"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
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
              className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
            >
              <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-md bg-white border border-blue-100 p-4 font-mono text-sm shadow-inner">
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse bg-blue-100 rounded"></div>
            <div className="h-4 w-4/5 animate-pulse bg-blue-100 rounded"></div>
            <div className="h-4 w-3/5 animate-pulse bg-blue-100 rounded"></div>
          </div>
        ) : (
          <p className="text-blue-900">{caption}</p>
        )}
      </div>
    </div>
  );
};

export default CaptionDisplay;
