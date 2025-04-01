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

const teacherRoutes = (
  <>
    <Route index element={<TeacherDashboard />} />
    <Route path="studyroom" element={<StudyRoom />} />
    <Route path="attendance" element={<Attendance />} />
    <Route path="salary" element={<Salary />}>
      <Route index element={<p>Select a transaction</p>} />
      <Route path=":transactionId" element={<TransactionDetails />} />
    </Route>
    <Route path="announcement" element={<Chat chatType="announcement" />} />
    <Route path="classgroup" element={<Chat chatType="classgroup" />} />
    <Route path="community" element={<Chat chatType="community" />} />
    <Route path="dropbox" element={<Chat chatType="dropbox" />} />
    <Route path="office" element={<CommonOffice />} />
    <Route path="collage" element={<Collage />} />
    <Route path="profile" element={<Profile />} />
  </>
);

// export
export default teacherRoutes;
