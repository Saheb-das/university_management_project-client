// external import
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

// internal import
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UsersWithDetails from "../components/ui/UsersWithDetails";
import { useUsersByRole } from "../hooks/useUsersByRole";

// types import
import { selectUserDetailsAtom, usersAtom } from "../recoil/usersAtom";
import { TStuffRole } from "../types/stuff";

const AllStuff = ({ admin }: { admin: Boolean }) => {
  const [role, setRole] = useState<string>("");
  const [userRole, setUserRole] = useState("");
  const users = useRecoilValue(usersAtom);
  const setSelectedUser = useSetRecoilState(selectUserDetailsAtom);

  useUsersByRole(userRole as TStuffRole);

  const handleGet = () => {
    setUserRole(role);
  };

  useEffect(() => {
    setSelectedUser(undefined);
  }, [userRole]);

  return (
    <div className="">
      <div className="flex gap-3 mt-4">
        <Select onValueChange={setRole} value={role}>
          <SelectTrigger className="mb-1 w-60">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            {admin ? (
              <>
                <SelectItem value="admin">Admin</SelectItem>
              </>
            ) : (
              <>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="examceller">Examceller</SelectItem>
                <SelectItem value="accountant">Accountant</SelectItem>
                <SelectItem value="counsellor">Counsellor</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
        <Button className="capitalize cursor-pointer" onClick={handleGet}>
          get
        </Button>
      </div>

      <div>
        {users.length > 0 ? (
          <>
            <UsersWithDetails usersData={users} />
          </>
        ) : (
          <p className="mt-6 capitalize text-lg font-semibold">
            there are no users
          </p>
        )}
      </div>
    </div>
  );
};

export default AllStuff;
