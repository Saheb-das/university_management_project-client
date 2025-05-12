import { useState, useRef } from "react";
import { Button } from "@/components/ui/button"; // Assuming you're using some Button component
import { Label } from "@/components/ui/label"; // Assuming you're using some Label component
import { Upload, ImagePlus } from "lucide-react"; // Icons for UI

interface UploadInputProps {
  onFileSelect: (file: File) => void; // callback function to handle the selected file
  title: string;
  prevImg: string;
}

const UploadInput = ({ onFileSelect, title, prevImg }: UploadInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreview(reader.result as string);
      onFileSelect(file);
    };
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const imageToShow = preview ? preview : prevImg ? prevImg : null;

  return (
    <div className="mx-auto flex flex-col bg-secondary items-center gap-4 p-6  rounded-2xl shadow-md w-full max-w-sm">
      <Label className="text-lg font-semibold text-foreground capitalize">
        {title}
      </Label>
      <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-sm bg-background">
        {imageToShow ? (
          <img
            src={imageToShow}
            alt={`${title} Preview`}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-muted-foreground">
            <ImagePlus className="w-8 h-8" />
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <Button onClick={handleUploadClick} variant="outline" className="gap-2">
        <Upload className="w-4 h-4" />
        Upload New Photo
      </Button>
    </div>
  );
};

export default UploadInput;
