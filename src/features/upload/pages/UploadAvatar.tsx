// external import
import { useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";

// internal import
import { useAvatar } from "../hooks/useAvatar";
import { completeProfileAtom } from "@/features/profile/recoil/atom/profileAtom";
import { Label } from "@/components/ui/label";
import { ImagePlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { convertFilePathUrl } from "@/utils/convertPath";

function UploadAvatar() {
  const setUser = useSetRecoilState(completeProfileAtom);
  const user = useRecoilValue(completeProfileAtom);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { mutate, isPending } = useAvatar(user?.profile.avatar || "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreview(reader.result as string); // show preview
      handleUpload(file);
    };
  };

  // this function can be props
  const handleUpload = (file: File) => {
    mutate(file, {
      onSuccess: (res) => {
        const updateRes = res?.profile;
        setUser((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            profile: {
              ...prev.profile,
              avatar: updateRes?.avatar,
            },
          };
        });
        toast.success("Avatar uploaded successfully!");
      },
      onError: () => {
        toast.error("Error uploading avatar.");
      },
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const imageToShow = preview
    ? preview
    : user?.profile.avatar
    ? convertFilePathUrl(user.profile.avatar)
    : null;
  return (
    <div className="flex flex-col items-center gap-6 mb-4">
      <Label className="text-lg font-semibold text-foreground">
        Profile Picture
      </Label>

      <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-sm bg-background">
        {imageToShow ? (
          <img
            src={imageToShow}
            alt="Avatar Preview"
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

      <Button
        onClick={handleUploadClick}
        variant="secondary"
        className="gap-2 cursor-pointer"
      >
        <Upload className="w-4 h-4" />
        {isPending ? "Uploading..." : "Upload New Photo"}
      </Button>
    </div>
  );
}

export default UploadAvatar;
