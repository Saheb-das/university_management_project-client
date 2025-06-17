// external import
import { Route } from "react-router";

// internal import
import SuperAdminDashboard from "@/features/dashboard/pages/superadminDashboard";
import TransactionDetails from "@/features/salary/components/ui/TransactionDetails";
import Salary from "@/features/salary/pages/Salary";
import CollageWithTab from "@/features/collage/pages/CollageWithTab";
import Profile from "@/features/profile/pages/Profile";
import Department from "@/features/department/pages/Department";
import Stuff from "@/features/stuff/pages/Stuff";
import Announcement from "@/features/chats/pages/Announcement";

const superadminRoutes = (
  <>
    <Route index element={<SuperAdminDashboard />} />
    <Route path="salary" element={<Salary />}>
      <Route index element={<p>Select a transaction</p>} />
      <Route path=":transactionId" element={<TransactionDetails />} />
    </Route>
    <Route path="announcement" element={<Announcement />} />
    <Route path="admin" element={<Stuff admin={true} />} />
    <Route path="department" element={<Department />} />
    <Route path="collage" element={<CollageWithTab />} />
    <Route path="profile" element={<Profile />} />
  </>
);

// export
export default superadminRoutes;
