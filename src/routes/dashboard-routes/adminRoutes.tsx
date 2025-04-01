// external import
import { Route } from "react-router";

// internal import
import Chat from "@/features/chats/pages/Chat";
import AdminDashboard from "@/features/dashboard/pages/adminDashboard";
import TransactionDetails from "@/features/salary/components/ui/TransactionDetails";
import Salary from "@/features/salary/pages/Salary";
import Collage from "@/features/collage/pages/Collage";
import CommonOffice from "@/features/office/pages/CommonOffice";
import Stuff from "@/features/stuff/pages/Stuff";
import AsignTeacher from "@/features/asign-teacher/pages/AsignTeacher";
import AsignTeacherLayout from "@/features/asign-teacher/layout/AsignTeacherLayout";
import TeachersList from "@/features/asign-teacher/components/ui/TeachersList";
import Profile from "@/features/profile/pages/Profile";
import FilteredStudents from "@/features/student/pages/FilteredStudents";

const adminRoutes = (
  <>
    <Route index element={<AdminDashboard />} />
    <Route path="salary" element={<Salary />}>
      <Route index element={<p>Select a transaction</p>} />
      <Route path=":transactionId" element={<TransactionDetails />} />
    </Route>
    <Route path="announcement" element={<Chat chatType="announcement" />} />
    <Route path="students" element={<FilteredStudents />} />
    <Route path="stuff" element={<Stuff admin={false} />} />
    <Route path="asign-teachers" element={<AsignTeacherLayout />}>
      <Route index element={<TeachersList />} />
      <Route path=":teacherId" element={<AsignTeacher />} />
    </Route>
    <Route path="office" element={<CommonOffice />} />
    <Route path="collage" element={<Collage />} />
    <Route path="profile" element={<Profile />} />
  </>
);

// export
export default adminRoutes;
