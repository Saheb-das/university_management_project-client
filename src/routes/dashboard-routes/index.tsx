// external import
import { useState, useEffect } from "react";
import { Routes, useParams } from "react-router";

// internal import
import accountantRoutes from "./accountantRoutes";
import adminRoutes from "./adminRoutes";
import counsellorRoutes from "./counsellorRoutes";
import examcellerRoutes from "./examcellerRoutes";
import studentRoutes from "./studentRoutes";
import superadminRoutes from "./superadminRoutes";
import teacherRoutes from "./teacherRoutes";

const DashboardRoutes = () => {
  const { userRole } = useParams<{ userRole: string }>();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (userRole) {
      setRole(userRole.slice(0, -1)); // Remove the trailing 's' from userRole
    }
  }, [userRole]);

  if (!role) {
    return <div>Loading...</div>; // Show loading until role is determined
  }

  return (
    <>
      <Routes>
        {role === "superadmin" && superadminRoutes}
        {role === "admin" && adminRoutes}
        {role === "counsellor" && counsellorRoutes}
        {role === "examceller" && examcellerRoutes}
        {role === "accountant" && accountantRoutes}
        {role === "teacher" && teacherRoutes}
        {role === "student" && studentRoutes}
      </Routes>
    </>
  );
};

// export
export default DashboardRoutes;
