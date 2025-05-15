// external import
import { useState } from "react";

// internal import
import UsersTable from "../shared/Users";
import UserActions from "../shared/UserAction";

// types import
import { IUser } from "../../types/stuff";
import { useUserDetails } from "../../hooks/useUserDetails";
import { useRecoilValue } from "recoil";
import { selectUserDetailsAtom } from "../../recoil/usersAtom";

interface UsersWithDetailsProps {
  usersData: IUser[];
}

const UsersWithDetails = ({ usersData }: UsersWithDetailsProps) => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>();
  const detailedUser = useRecoilValue(selectUserDetailsAtom);

  useUserDetails(selectedUser?.id || "");

  const handleClick = (user: IUser) => {
    setSelectedUser(user);
  };

  const handleDelete = (userId: string) => {};

  return (
    <div className="w-full flex gap-4 ">
      <div className=" basis-[60%] bg-background text-foreground p-2 rounded-lg">
        <UsersTable
          users={usersData}
          onClick={handleClick}
          onDelete={handleDelete}
        />
      </div>
      <div className=" flex-grow bg-background text-foreground p-2">
        {detailedUser ? (
          <UserActions user={detailedUser} />
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
