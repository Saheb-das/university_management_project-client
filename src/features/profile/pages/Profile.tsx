// external import
import { useState } from "react";

// internal import
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShowProfile from "../components/ui/ShowProfile";
import UpdateProfile from "../components/ui/UpdateProfile";
import ChangePassword from "../components/ui/ChangePassword";

export interface IPassword {
  oldPassword: string;
  newPassword: string;
}

export interface IProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  address: string;
  highestDegree: string;
  specialization: string;
  bankName: string;
  accountNo: string;
  ifscCode: string;
  profileImg: string;
}

const dummyProfile: IProfile = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phoneNo: "+1-202-555-0191",
  address: "1234 Elm Street, Springfield, IL, USA",
  highestDegree: "Master of Science",
  specialization: "Computer Science",
  bankName: "Bank of America",
  accountNo: "123456789012",
  ifscCode: "BOFA0001234",
  profileImg:
    "https://i.pinimg.com/736x/50/c3/f7/50c3f70a5ff4fa2b8a235bfbf6bf9fa9.jpg",
};

const Profile = () => {
  const [userData, setUserData] = useState(dummyProfile);
  // TODO: fetch user data

  const handleUpdate = () => {};

  const handlePassword = () => {};

  return (
    <>
      <div className="container mx-auto p-4">
        <Tabs defaultValue="view">
          <TabsList className=" gird grid-cols-5">
            <TabsTrigger className="text-base" value="view">
              View Profile
            </TabsTrigger>
            <TabsTrigger className="text-base" value="update">
              Update Profile
            </TabsTrigger>
            <TabsTrigger className="text-base" value="change-password">
              Change Password
            </TabsTrigger>
          </TabsList>
          <TabsContent value="view">
            {userData && <ShowProfile data={userData} role={"student"} />}
          </TabsContent>
          <TabsContent value="update">
            {userData && (
              <UpdateProfile userData={userData} onUpdate={handleUpdate} />
            )}
          </TabsContent>
          <TabsContent value="change-password">
            <ChangePassword onChangePassword={handlePassword} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

// export
export default Profile;
