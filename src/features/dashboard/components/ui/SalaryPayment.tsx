// external import
import { useState } from "react";

// internal import
import { useUserDetails } from "@/features/stuff/hooks/useUserDetails";
import StuffList from "./StuffList";
import StuffDetails from "./StuffDetails";

const SalaryPayment = () => {
  const [selectedUser, setSelectedUser] = useState("");

  useUserDetails(selectedUser);

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-5 max-w-7xl mx-auto">
      <StuffList selUser={selectedUser} onUserSelect={handleUserSelect} />
      <StuffDetails />
    </div>
  );
};

export default SalaryPayment;
