// external import
import { Route } from "react-router";

// internal import
import Academic from "@/features/academic/pages/Academic";
import Collage from "@/features/collage/pages/Collage";
import StudentDashboard from "@/features/dashboard/pages/StudentDashboard";
import NoteViewer from "@/features/notes/components/ui/NoteViewer";
import NoteLayout from "@/features/notes/layout/NoteLayout";
import Notes from "@/features/notes/pages/Notes";
import StudentOffice from "@/features/office/pages/StudentOffice";
import Profile from "@/features/profile/pages/Profile";
import TuitionFeeReceipt from "@/features/tution-fees/components/ui/TutionFeeReciept";
import MakeTutionFeeLayout from "@/features/tution-fees/layout/MakeTutionFeeLayout";
import MakeTutionFees from "@/features/tution-fees/pages/MakeTutionFees";
import Announcement from "@/features/chats/pages/Announcement";
import Dropbox from "@/features/chats/pages/Dropbox";
import Classroom from "@/features/chats/pages/Classroom";

const studentRoutes = (
  <>
    <Route index element={<StudentDashboard />} />
    <Route path="academic" element={<Academic />} />
    <Route path="tution-fees" element={<MakeTutionFeeLayout />}>
      <Route index element={<MakeTutionFees />} />
      <Route path="reciept" element={<TuitionFeeReceipt />} />
    </Route>
    <Route path="notes" element={<NoteLayout />}>
      <Route index element={<Notes />} />
      <Route path=":noteId" element={<NoteViewer />} />
    </Route>
    <Route path="announcement" element={<Announcement />} />
    <Route path="classroom" element={<Classroom />} />
    <Route path="dropbox" element={<Dropbox />} />
    <Route path="office" element={<StudentOffice />} />
    <Route path="collage" element={<Collage />} />
    <Route path="profile" element={<Profile />} />
  </>
);

export default studentRoutes;
