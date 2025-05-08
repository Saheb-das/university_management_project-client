// external import
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

// internal import
import { useAvatar } from "../hooks/useAvatar";
import { avatarUrlAtom } from "../recoil/atom/avatarAtom";
import { toast } from "sonner";
import UploadInput from "@/components/shared/UploadInput";

function UploadAvatar() {
  const setAvatarUrl = useSetRecoilState(avatarUrlAtom);
  const avatarUrl = useRecoilValue(avatarUrlAtom);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useAvatar();

  const handleFileSelect = (file: File) => {
    setIsLoading(true);

    mutate(file, {
      onSuccess: (newUrl) => {
        setAvatarUrl(newUrl);
        toast.success("Avatar uploaded successfully!");
      },
      onError: () => {
        toast.error("Error uploading avatar.");
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };
  return (
    <div className="flex flex-col items-center gap-6">
      {avatarUrl ? (
        <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-sm bg-background">
          <img
            src={avatarUrl}
            alt="Current Avatar"
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <p className="text-muted-foreground">No avatar selected</p>
      )}
      <UploadInput onFileSelect={handleFileSelect} />
      {isLoading && <p className="text-muted-foreground">Uploading...</p>}
    </div>
  );
}

export default UploadAvatar;
