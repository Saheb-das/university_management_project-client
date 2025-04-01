// external import
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="w-full px-3">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
