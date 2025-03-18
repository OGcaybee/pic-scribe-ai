
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageUpload: (file: File, imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match("image.*")) {
      toast.error("Please upload an image file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 5MB");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    onImageUpload(file, imageUrl);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg transition-all ${
        isDragging 
          ? "border-blue-500 bg-blue-50" 
          : "border-blue-200 hover:border-blue-400 bg-gradient-to-b from-blue-50/50 to-indigo-50/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={triggerFileInput}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center space-y-4 py-12 px-4">
        <div className="rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 p-4 shadow-md">
          <ImageIcon className="h-8 w-8 text-white" />
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-blue-800">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-blue-600/80 mt-1">
            PNG, JPG, GIF up to 5MB
          </p>
        </div>
        <Button 
          variant="outline" 
          type="button" 
          className="mt-4 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
        >
          <Upload className="h-4 w-4 mr-2" />
          Select Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
