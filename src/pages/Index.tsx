
import React, { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import CaptionDisplay from "@/components/CaptionDisplay";
import { generateCaption } from "@/services/captionService";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<{
    file: File;
    url: string;
  } | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (file: File, imageUrl: string) => {
    setSelectedImage({ file, url: imageUrl });
    setCaption(null);
    handleGenerateCaption(file);
  };

  const handleGenerateCaption = async (file: File) => {
    try {
      setIsLoading(true);
      const generatedCaption = await generateCaption(file);
      setCaption(generatedCaption);
    } catch (error) {
      console.error("Error generating caption:", error);
      toast.error("Failed to generate caption. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateCaption = () => {
    if (selectedImage) {
      handleGenerateCaption(selectedImage.file);
    }
  };

  return (
    <div className="container max-w-4xl py-8 md:py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">
          PicScribe AI
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload an image and get an AI-generated caption instantly. Perfect for social media posts, accessibility, or content creation.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Image Caption Generator</CardTitle>
          <CardDescription>
            Drop an image or click to upload and we'll generate a descriptive caption
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!selectedImage ? (
            <ImageUploader onImageUpload={handleImageUpload} />
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                <img
                  src={selectedImage.url}
                  alt="Uploaded image"
                  className="h-full w-full object-contain"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setCaption(null);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Upload a different image
                </button>
              </div>

              <CaptionDisplay
                caption={caption}
                isLoading={isLoading}
                onRegenerate={regenerateCaption}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
