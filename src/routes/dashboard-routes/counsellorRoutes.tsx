// external import
import { Route } from "react-router";

// internal import
import CounsellorDashboard from "@/features/dashboard/pages/CounsellorDashboard";
import TransactionDetails from "@/features/salary/components/ui/TransactionDetails";
import Salary from "@/features/salary/pages/Salary";
import Collage from "@/features/collage/pages/Collage";
import CommonOffice from "@/features/office/pages/CommonOffice";
import Profile from "@/features/profile/pages/Profile";
import Admission from "@/features/admission/pages/Admission";
import Announcement from "@/features/chats/pages/Announcement";
import Dropbox from "@/features/chats/pages/Dropbox";
import Community from "@/features/chats/pages/Community";

const counsellorRoutes = (
  <>
    <Route index element={<CounsellorDashboard />} />
    <Route path="admission" element={<Admission />} />
    <Route path="salary" element={<Salary />}>
      <Route index element={<p>Select a transaction</p>} />
      <Route path=":transactionId" element={<TransactionDetails />} />
    </Route>
    <Route path="announcement" element={<Announcement />} />
    <Route path="community" element={<Community />} />
    <Route path="dropbox" element={<Dropbox />} />
    <Route path="office" element={<CommonOffice />} />
    <Route path="collage" element={<Collage />} />
    <Route path="profile" element={<Profile />} />
  </>
);

// export
export default counsellorRoutes;
