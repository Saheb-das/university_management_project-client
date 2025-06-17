// external import
import { Route } from "react-router";

// internal import
import TransactionDetails from "@/features/salary/components/ui/TransactionDetails";
import Salary from "@/features/salary/pages/Salary";
import Collage from "@/features/collage/pages/Collage";
import Profile from "@/features/profile/pages/Profile";
import ExamcellerOffice from "@/features/office/pages/ExamcellerOffice";
import Result from "@/features/result/pages/Result";
import ExamcellerDashboard from "@/features/dashboard/pages/ExamcellerDashboard";
import Announcement from "@/features/chats/pages/Announcement";
import Dropbox from "@/features/chats/pages/Dropbox";
import Community from "@/features/chats/pages/Community";

const examcellerRoutes = (
  <>
    <Route index element={<ExamcellerDashboard />} />
    <Route path="results" element={<Result />} />
    <Route path="salary" element={<Salary />}>
      <Route index element={<p>Select a transaction</p>} />
      <Route path=":transactionId" element={<TransactionDetails />} />
    </Route>
    <Route path="announcement" element={<Announcement />} />
    <Route path="community" element={<Community />} />
    <Route path="dropbox" element={<Dropbox />} />
    <Route path="office" element={<ExamcellerOffice />} />
    <Route path="collage" element={<Collage />} />
    <Route path="profile" element={<Profile />} />
  </>
);

// export
export default examcellerRoutes;
