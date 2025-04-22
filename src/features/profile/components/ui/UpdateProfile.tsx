// external import
import { useState } from "react";

// internal import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LabeledInput from "../shared/LabeledInput";
import { TRole } from "@/zod/auth";

export interface UpdateProps {
  email: string;
  address: string;
  phoneNo: string;
  role: TRole;
  profileImg: string;
  highestDegree?: string;
  specialization?: string;
}

interface UpdateProfileProps {
  userData: UpdateProps;
  onUpdate: (updatable: UpdateProps) => void;
}

function UpdateProfile({ userData, onUpdate }: UpdateProfileProps) {
  const [updatableData, setUpdatableData] = useState<UpdateProps>({
    email: userData.email,
    address: userData.address,
    phoneNo: userData.phoneNo,
    profileImg: userData.profileImg,
    role: userData.role,
    highestDegree: userData.highestDegree,
    specialization: userData.specialization,
  });

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: key, value, files } = e.target;

    if (key === "image" && files) {
      const file = files[0];

      setUpdatableData((prev) => {
        return {
          ...prev,
          [key]: file,
        };
      });
    } else {
      setUpdatableData((prev) => {
        return {
          ...prev,
          [key]: value,
        };
      });
    }
  };

  const handleSubmit = () => {
    onUpdate(updatableData);
  };

  return (
    <Card className="mt-4">
      <CardHeader>{/* <CardTitle>Edit Profile</CardTitle> */}</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <LabeledInput
            name="email"
            type="email"
            label="email"
            value={updatableData.email}
            handleChange={handleUpdate}
          />

          <LabeledInput
            name="address"
            type="text"
            label="address"
            value={updatableData.address}
            handleChange={handleUpdate}
          />

          <LabeledInput
            name="phoneNo"
            type="string"
            label="phone number"
            value={updatableData.phoneNo}
            handleChange={handleUpdate}
          />

          {userData.role !== "student" && (
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

          <LabeledInput
            name="profileImg"
            type="file"
            label="profile image"
            value={updatableData.profileImg}
            handleChange={handleUpdate}
          />

          <Button type="submit">Update Profile</Button>
        </form>
      </CardContent>
    </Card>
  );
}

// export
export default UpdateProfile;
