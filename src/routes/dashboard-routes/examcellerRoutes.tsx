// external import
import { Route } from "react-router";

// internal import
import TransactionDetails from "@/features/salary/components/ui/TransactionDetails";
import Salary from "@/features/salary/pages/Salary";
import Chat from "@/features/chats/pages/Chat";
import Collage from "@/features/collage/pages/Collage";
import Profile from "@/features/profile/pages/Profile";
import ExamcellerOffice from "@/features/office/pages/ExamcellerOffice";
import Result from "@/features/result/pages/Result";

const examcellerRoutes = (
  <>
    <Route index element={<h1>examceller dashboard</h1>} />
    <Route path="results" element={<Result />} />
    <Route path="salary" element={<Salary />}>
      <Route index element={<p>Select a transaction</p>} />
      <Route path=":transactionId" element={<TransactionDetails />} />
    </Route>
    <Route path="announcement" element={<Chat chatType="announcement" />} />
    <Route path="community" element={<Chat chatType="community" />} />
    <Route path="dropbox" element={<Chat chatType="dropbox" />} />
    <Route path="office" element={<ExamcellerOffice />} />
    <Route path="collage" element={<Collage />} />
    <Route path="profile" element={<Profile />} />
  </>
);

// export
export default examcellerRoutes;
