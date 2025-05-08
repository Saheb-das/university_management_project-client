// internal import
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShowProfile from "../components/ui/ShowProfile";
import UpdateProfile from "../components/ui/UpdateProfile";
import ChangePassword from "../components/ui/ChangePassword";
import { TRole } from "@/zod/auth";

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
  role: TRole;
  highestDegree: string;
  specialization: string;
  bankName: string;
  accountNo: string;
  ifscCode: string;
  profileImg: string;
}

const Profile = () => {
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
            <ShowProfile />
          </TabsContent>
          <TabsContent value="update">
            <UpdateProfile />
          </TabsContent>
          <TabsContent value="change-password">
            <ChangePassword />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

// export
export default Profile;
