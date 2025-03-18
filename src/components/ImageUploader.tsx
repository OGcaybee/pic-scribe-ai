
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
      className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
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
      <div className="flex flex-col items-center justify-center space-y-4 py-4">
        <div className="rounded-full bg-blue-100 p-3">
          <Upload className="h-6 w-6 text-blue-500" />
        </div>
        <div className="text-center">
          <p className="text-base font-medium">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-gray-500">
            PNG, JPG, GIF up to 5MB
          </p>
        </div>
        <Button variant="outline" type="button" className="mt-2">
          Select Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
