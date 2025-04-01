// internal import
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Role = "examceller" | "counsellor" | "accountant" | "teacher" | "student";

export interface IUser {
  id: number;
  name: string;
  qualification?: string;
  admissionYear?: string;
  departments?: string[];
  status: string;
}

interface UserTableProps {
  role: Role;
  users: IUser[];
  handleClick: (user: number) => void;
  handleDelete: (userId: number) => void;
}

const Users = ({ role, users, handleClick, handleDelete }: UserTableProps) => {
  let rowItems;
  if (role === "student") {
    rowItems = ["name", "department", "admission year", "status", "action"];
  } else if (role === "teacher") {
    rowItems = ["name", "department", "qualification", "status", "action"];
  } else {
    rowItems = ["name", "qualification", "status", "action"];
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {rowItems.map((rowItem) => (
            <TableHead key={rowItem} className="capitalize">
              {rowItem}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users &&
          users.map((user) => (
            <TableRow
              key={user.id}
              onClick={() => handleClick(user.id)}
              className="cursor-pointer text-base"
            >
              <TableCell>{user.name}</TableCell>
              {role === "student" ? (
                <>
                  <TableCell>{user.departments?.join(",")}</TableCell>
                  <TableCell>{user.admissionYear}</TableCell>
                </>
              ) : role === "teacher" ? (
                <>
                  <TableCell className="capitalize">
                    {user.departments?.join(", ")}
                  </TableCell>
                  <TableCell>{user.qualification}</TableCell>
                </>
              ) : (
                <TableCell>{user.qualification}</TableCell>
              )}

              <TableCell>
                <Badge
                  variant={
                    user.status === "regular"
                      ? "default"
                      : user.status === "suspend"
                      ? "outline"
                      : "destructive"
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

// export
export default Users;
