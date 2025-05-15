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

// types import
import { IUser } from "../../types/stuff";

interface UserTableProps {
  users: IUser[];
  onClick: (user: IUser) => void;
  onDelete: (userId: string) => void;
}

const UsersTable = ({ users, onClick, onDelete }: UserTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="capitalize">name</TableHead>
          <TableHead className="capitalize">role</TableHead>
          <TableHead className="capitalize">status</TableHead>
          <TableHead className="capitalize">action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow
            key={user.id}
            onClick={() => onClick(user)}
            className="cursor-pointer text-base"
          >
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Badge
                variant={
                  user.activeStatus === "regular"
                    ? "default"
                    : user.activeStatus === "suspend"
                    ? "outline"
                    : "destructive"
                }
              >
                {user.activeStatus}
              </Badge>
            </TableCell>
            {/* TODO: delete functionalities added later  */}
            <TableCell>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(user.id)}
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
export default UsersTable;
