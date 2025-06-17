// external import
import { Route } from "react-router";

// internal import
import TeacherDashboard from "@/features/dashboard/pages/TeacherDashboard";
import TransactionDetails from "@/features/salary/components/ui/TransactionDetails";
import Salary from "@/features/salary/pages/Salary";
import Chat from "@/features/chats/pages/Chat";
import Collage from "@/features/collage/pages/Collage";
import CommonOffice from "@/features/office/pages/CommonOffice";
import Profile from "@/features/profile/pages/Profile";
import StudyRoom from "@/features/studyroom/pages/StudyRoom";
import Attendance from "@/features/attendance/pages/Attendance";
import Announcement from "@/features/chats/pages/Announcement";
import Dropbox from "@/features/chats/pages/Dropbox";
import Community from "@/features/chats/pages/Community";
import ChatsGroup from "@/features/chats/pages/ChatsGroup";

const teacherRoutes = (
  <>
    <Route index element={<TeacherDashboard />} />
    <Route path="studyroom" element={<StudyRoom />} />
    <Route path="attendance" element={<Attendance />} />
    <Route path="salary" element={<Salary />}>
      <Route index element={<p>Select a transaction</p>} />
      <Route path=":transactionId" element={<TransactionDetails />} />
    </Route>
    <Route path="announcement" element={<Announcement />} />
    <Route path="classgroup" element={<ChatsGroup />} />
    <Route path="community" element={<Community />} />
    <Route path="dropbox" element={<Dropbox />} />
    <Route path="office" element={<CommonOffice />} />
    <Route path="collage" element={<Collage />} />
    <Route path="profile" element={<Profile />} />
  </>
);

// export
export default teacherRoutes;
