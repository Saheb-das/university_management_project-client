// external import
import { BrowserRouter, Route, Routes } from "react-router";

// internal import
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardRoutes from "./dashboard-routes";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";

const BaseRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* auth routes */}
        <Route element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* dashboard routes */}
        <Route element={<DashboardLayout />}>
          <Route path=":userRole/:userId/*" element={<DashboardRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default BaseRouter;
