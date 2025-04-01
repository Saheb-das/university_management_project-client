// external import
import { useEffect, useState } from "react";
import { toast } from "sonner";

// internal import
import Users, { IUser } from "../shared/Users";
import UserActions from "../shared/UserAction";

type Role = "examceller" | "counsellor" | "accountant" | "teacher" | "student";

interface UsersWithDetailsProps {
  role: Role;
  usersData: IUser[];
  onStatusChange: (userId: number, newStatus: IUser["status"]) => void;
  onDelete: (userId: number) => void;
}

const UsersWithDetails = ({
  role,
  usersData,
  onStatusChange,
  onDelete,
}: UsersWithDetailsProps) => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>();

  useEffect(() => {
    if (selectedUser) {
      setSelectedUser(() =>
        usersData.find((user) => user.id === selectedUser.id)
      );
    }
  }, [usersData]);

  const handleClick = async (userId: number) => {
    try {
      // TODO: API call
      // const user = await fetch(`${apiUrl}/${userId}`)
      // TODO: Check user
      setSelectedUser(() => usersData.find((item) => item.id === userId));
    } catch (error) {
      toast("user fetching problem");
    }
  };

  // for ui updation

  return (
    <div className="w-full flex gap-4 ">
      <div className=" basis-[60%] bg-background text-foreground p-2 rounded-lg">
        <Users
          role={role}
          users={usersData}
          handleClick={handleClick}
          handleDelete={onDelete}
        />
      </div>
      <div className=" flex-grow bg-background text-foreground p-2">
        {selectedUser ? (
          <UserActions user={selectedUser} onStatusChange={onStatusChange} />
        ) : (
          <h1 className="text-2xl mt-10 text-center capitalize font-medium">
            click list item to show details
          </h1>
        )}
      </div>
    </div>
  );
};

// export
export default UsersWithDetails;
