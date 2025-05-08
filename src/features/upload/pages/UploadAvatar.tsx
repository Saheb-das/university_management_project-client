// external import
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";

// internal import
import { useAvatar } from "../hooks/useAvatar";
import UploadInput from "@/components/shared/UploadInput";
import { completeProfileAtom } from "@/features/profile/recoil/atom/completeProfileAtom";

const apiUrl = import.meta.env.VITE_SERVER_BASE_URL;

function UploadAvatar() {
  const setUser = useSetRecoilState(completeProfileAtom);
  const user = useRecoilValue(completeProfileAtom);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useAvatar();

  const handleFileSelect = (file: File) => {
    setIsLoading(true);

    mutate(file, {
      onSuccess: (res) => {
        const updateRes = res?.profile;
        setUser((prev) => {
          if (!prev) {
            return prev;
          }

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
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };
  return (
    <div className="flex flex-col items-center gap-6">
      {user?.profile.avatar ? (
        <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-sm bg-background">
          <img
            src={`${apiUrl}/${user.profile.avatar.replace(/\\/g, "/")}`}
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
