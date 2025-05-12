// external import
import { useState, useRef } from "react";
import { Upload, ImagePlus } from "lucide-react"; // Icons for UI
import { useRecoilValue, useSetRecoilState } from "recoil";

// internal import
import { Button } from "@/components/ui/button"; // Assuming you're using some Button component
import { Label } from "@/components/ui/label"; // Assuming you're using some Label component
import { collageAtom } from "@/features/collage/recoil/collageAtom";
import { useLogo } from "../hooks/useLogo";
import { toast } from "sonner";

const apiBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;

function UploadLogo() {
  const collageInfo = useRecoilValue(collageAtom);
  const setCollage = useSetRecoilState(collageAtom);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { mutate, isPending } = useLogo(collageInfo?.avatar || "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreview(reader.result as string);
      handleUpload(file);
    };
  };

  const handleUpload = (file: File) => {
    mutate(file, {
      onSuccess: (res) => {
        const updatedCollage = res?.collageLogo;
        setCollage((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            avatar: updatedCollage?.avatar ?? null,
          };
        });
      },
      onError: () => {
        toast.error("logo not updated");
      },
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const imageToShow = preview
    ? preview
    : collageInfo?.avatar
    ? `${apiBaseUrl}/${collageInfo.avatar.replace(/\\/g, "/")}`
    : null;
  return (
    <>
      <div className="mx-auto flex flex-col bg-secondary items-center gap-4 p-6  rounded-2xl shadow-md w-full max-w-sm">
        <Label className="text-lg font-semibold text-foreground capitalize"></Label>
        <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-sm bg-background">
          {imageToShow ? (
            <img
              src={imageToShow}
              alt={`Collage Logo Preview`}
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
          {isPending ? "Uploading..." : "Upload New Logo"}
        </Button>
      </div>
    </>
  );
}

export default UploadLogo;
