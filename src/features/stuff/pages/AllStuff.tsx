import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import UsersWithDetails from "../components/ui/UsersWithDetails";
import { IUser } from "../components/shared/Users";

type Role = "examceller" | "counsellor" | "accountant" | "teacher" | "student";

const initialUser = [
  {
    id: 1,
    name: "John Doe",
    qualification: "PhD",

    status: "regular",
  },
  {
    id: 2,
    name: "Jane Smith",
    qualification: "MSc",

    status: "suspend",
  },
  {
    id: 3,
    name: "Bob Johnson",
    qualification: "PhD",

    status: "regular",
  },
  {
    id: 4,
    name: "Alice Brown",
    qualification: "MEd",

    status: "blocked",
  },
];

const AllStuff = ({ admin }: { admin: Boolean }) => {
  const [role, setRole] = useState<Role | string>("");
  const [users, setUsers] = useState<IUser[] | []>([]);
  const handleRoleList = () => {
    setUsers(initialUser);
  };
  const handleStatus = () => {};
  const handleDelete = () => {};
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
                <SelectItem value="accountent">Accountent</SelectItem>
                <SelectItem value="counsellor">Counsellor</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
        <Button className="capitalize cursor-pointer" onClick={handleRoleList}>
          get
        </Button>
      </div>

      <div>
        {users.length !== 0 && (
          <UsersWithDetails
            role={role as Role}
            onDelete={handleDelete}
            onStatusChange={handleStatus}
            usersData={users}
          />
        )}
      </div>
    </div>
  );
};

export default AllStuff;
