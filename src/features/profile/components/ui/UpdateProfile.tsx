// external import
import { useState } from "react";

// internal import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LabeledInput from "../shared/LabeledInput";
import { TRole } from "@/zod/auth";
import UploadAvatar from "@/features/upload/pages/UploadAvatar";
import { useRecoilValue } from "recoil";
import { completeProfileAtom } from "../../recoil/atom/profileAtom";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import { toast } from "sonner";

export interface UpdateProps {
  email: string;
  address: string;
  phoneNo: string;
  role: TRole;
  profileImg: string;
  highestDegree?: string;
  specialization?: string;
}

function UpdateProfile() {
  const userInfo = useRecoilValue(completeProfileAtom);

  const [updatableData, setUpdatableData] = useState({
    email: userInfo?.email,
    address: userInfo?.profile.address,
    phoneNo: userInfo?.profile.phoneNo,
    highestDegree: userInfo?.profile.stuff?.highestDegree,
    specialization: userInfo?.profile.stuff?.specializedIn,
  });

  const role = userInfo?.role;
  const { mutate, isPending } = useUpdateProfile();

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: key, value } = e.target;

    setUpdatableData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!role) {
      toast.error("User role is missing. Cannot update profile.");
      return;
    }

    mutate(
      { id: userInfo?.id!, data: updatableData, role: role },
      {
        onSuccess: () => {
          // TODO: client state
          toast.success("profile update successfully");
        },
        onError: () => {
          toast.error("profile update fails");
        },
      }
    );
  };

  return (
    <Card className="mt-4">
      <CardHeader>{/* <CardTitle>Edit Profile</CardTitle> */}</CardHeader>
      <CardContent className="grid lg:grid-cols-2 ">
        <UploadAvatar />

        <form onSubmit={handleSubmit} className="space-y-4">
          <LabeledInput
            name="email"
            type="email"
            label="email"
            value={updatableData.email || ""}
            handleChange={handleUpdate}
          />

          <LabeledInput
            name="address"
            type="text"
            label="address"
            value={updatableData.address || ""}
            handleChange={handleUpdate}
          />

          <LabeledInput
            name="phoneNo"
            type="string"
            label="phone number"
            value={updatableData.phoneNo || ""}
            handleChange={handleUpdate}
          />

          {userInfo?.role !== "student" && (
            <>
              <LabeledInput
                name="highestDegree"
                type="string"
                label="highestDegree"
                value={updatableData.highestDegree || ""}
                handleChange={handleUpdate}
              />
              <LabeledInput
                name="specialization"
                type="string"
                label="specialization"
                value={updatableData.specialization || ""}
                handleChange={handleUpdate}
              />
            </>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// export
export default UpdateProfile;
