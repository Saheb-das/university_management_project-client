// external import
import { useState } from "react";

// internal import
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUsersByRole } from "@/features/stuff/hooks/useUsersByRole";
import { TStuffRole } from "@/features/stuff/types/stuff";

const roles = ["admin", "teacher", "accountant", "counsellor", "examceller"];

const StuffFilter = () => {
  const [role, setRole] = useState<string>("");
  const [selRole, setSelRole] = useState("");

  useUsersByRole(selRole as TStuffRole);

  const handleGet = () => {
    if (!role) return;

    setSelRole(role);
  };
  return (
    <div>
      <h1 className="text-xl my-2 font-semibold">Get Users to send Salary</h1>
      <div className="flex items-center gap-4 w-full max-w-lg mt-6">
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((r) => (
              <SelectItem key={r} value={r} className="capitalize">
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleGet}>Get</Button>
      </div>
    </div>
  );
};

export default StuffFilter;
