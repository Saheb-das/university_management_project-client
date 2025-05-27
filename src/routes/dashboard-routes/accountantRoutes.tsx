// external import
import { Route } from "react-router";

// internal import
import TransactionDetails from "@/features/salary/components/ui/TransactionDetails";
import Salary from "@/features/salary/pages/Salary";
import Chat from "@/features/chats/pages/Chat";
import Collage from "@/features/collage/pages/Collage";
import CommonOffice from "@/features/office/pages/CommonOffice";
import Profile from "@/features/profile/pages/Profile";
import Transaction from "@/features/transactions/pages/Transactions";
import CheckTutionFees from "@/features/tution-fees/pages/CheckTutionFees";

const accountantRoutes = (
  <>
    <Route index element={<h1>accountant dashboard</h1>} />
    <Route path="check-fees" element={<CheckTutionFees />} />
    <Route path="salary" element={<Salary />}>
      <Route index element={<p>Select a transaction</p>} />
      <Route path=":transactionId" element={<TransactionDetails />} />
    </Route>
    <Route path="transactions" element={<Transaction />} />
    <Route path="announcement" element={<Chat chatType="announcement" />} />
    <Route path="community" element={<Chat chatType="community" />} />
    <Route path="dropbox" element={<Chat chatType="dropbox" />} />
    <Route path="office" element={<CommonOffice />} />
    <Route path="collage" element={<Collage />} />
    <Route path="profile" element={<Profile />} />
  </>
);

// export
export default accountantRoutes;
