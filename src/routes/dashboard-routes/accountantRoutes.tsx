// external import
import { Route } from "react-router";

// internal import
import TransactionDetails from "@/features/salary/components/ui/TransactionDetails";
import Salary from "@/features/salary/pages/Salary";
import Collage from "@/features/collage/pages/Collage";
import CommonOffice from "@/features/office/pages/CommonOffice";
import Profile from "@/features/profile/pages/Profile";
import Transaction from "@/features/transactions/pages/Transactions";
import CheckTutionFees from "@/features/tution-fees/pages/CheckTutionFees";
import Announcement from "@/features/chats/pages/Announcement";
import Dropbox from "@/features/chats/pages/Dropbox";
import Community from "@/features/chats/pages/Community";
import AccountantDashboard from "@/features/dashboard/pages/AccountantDashboard";

const accountantRoutes = (
  <>
    <Route index element={<AccountantDashboard />} />
    <Route path="check-fees" element={<CheckTutionFees />} />
    <Route path="salary" element={<Salary />}>
      <Route index element={<p>Select a transaction</p>} />
      <Route path=":transactionId" element={<TransactionDetails />} />
    </Route>
    <Route path="transactions" element={<Transaction />} />
    <Route path="announcement" element={<Announcement />} />
    <Route path="community" element={<Community />} />
    <Route path="dropbox" element={<Dropbox />} />
    <Route path="office" element={<CommonOffice />} />
    <Route path="collage" element={<Collage />} />
    <Route path="profile" element={<Profile />} />
  </>
);

// export
export default accountantRoutes;
