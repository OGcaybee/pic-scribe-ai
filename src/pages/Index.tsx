
import React, { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import CaptionDisplay from "@/components/CaptionDisplay";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateCaption } from "@/services/captionService";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <Header />
      
      <main className="flex-grow">
        <div className="container max-w-4xl py-12 md:py-16 px-4">
          <div className="text-center mb-10 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              AI-Powered Image Captions
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Upload an image and get an AI-generated caption instantly. Perfect for social media posts, accessibility, or content creation.
            </p>
            <div className="flex items-center justify-center">
              <span className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                <Sparkles className="h-3.5 w-3.5" />
                Powered by advanced AI
              </span>
            </div>
          </div>

          <Card className="border-blue-100 shadow-md overflow-hidden bg-white backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
              <CardTitle className="text-blue-800">Image Caption Generator</CardTitle>
              <CardDescription>
                Drop an image or click to upload and we'll generate a descriptive caption
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {!selectedImage ? (
                <ImageUploader onImageUpload={handleImageUpload} />
              ) : (
                <div className="space-y-6">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted shadow-inner">
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
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
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
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 mb-4">1</div>
              <h3 className="text-lg font-semibold mb-2">Upload Your Image</h3>
              <p className="text-muted-foreground text-sm">Drag and drop or browse your files to upload an image. We support JPG, PNG, and GIF formats.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 mb-4">2</div>
              <h3 className="text-lg font-semibold mb-2">AI Processing</h3>
              <p className="text-muted-foreground text-sm">Our advanced AI model analyzes your image to understand the content, context, and details.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 mb-4">3</div>
              <h3 className="text-lg font-semibold mb-2">Get Your Caption</h3>
              <p className="text-muted-foreground text-sm">Receive a beautifully crafted caption that perfectly describes your image, ready to use.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
