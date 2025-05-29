// external import
import { useState } from "react";

// internal import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { IUser, IUserProfile } from "../../types/stuff";
import { useUpdateStatus } from "../../hooks/useUpdateStatus";
import { toast } from "sonner";
import { useSetRecoilState } from "recoil";
import { selectUserDetailsAtom, usersAtom } from "../../recoil/usersAtom";

interface UserDetailsProps {
  user: IUserProfile;
}

const UserActions = ({ user }: UserDetailsProps) => {
  const [userStatus, setUserStatus] = useState<IUser["activeStatus"]>(
    user.activeStatus
  );
  const setDetailsUser = useSetRecoilState(selectUserDetailsAtom);
  const setUsers = useSetRecoilState(usersAtom);

  const { mutate, isPending } = useUpdateStatus(user.id, user.role);

  const handleStatus = () => {
    mutate(userStatus, {
      onSuccess: (res) => {
        if (!res) return res;

        const user = res.user;

        setUsers((prev) => {
          return prev.map((item) =>
            item.id === user.id
              ? { ...item, activeStatus: user.activeStatus }
              : item
          );
        });

        setDetailsUser((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            activeStatus: user.activeStatus,
          };
        });

        if (res.success) {
          toast.success(res.message || "update successfull");
        }
      },
      onError: (err) => {
        toast.error(err.message || "updation failed");
      },
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg capitalize">
            {user.firstName} {user.lastName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* some details */}
          <dl className="space-y-2">
            <div className="flex gap-2">
              <dt className="font-semibold ">Qualification:</dt>
              <dd>{user.profile.stuff.highestDegree}</dd>
            </div>

            <div className="flex gap-2">
              <dt className="font-semibold">Current Status:</dt>
              <dd>
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
              </dd>
            </div>
            <div className="pt-4">
              <dt className="font-semibold mb-2">Change Status:</dt>
              <dd>
                <Select
                  onValueChange={(v: IUser["activeStatus"]) => setUserStatus(v)}
                  value={userStatus}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="suspend">Suspend</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </dd>
            </div>
            <div className="pt-2">
              <Button onClick={handleStatus} disabled={isPending}>
                {isPending ? "Updating..." : "Update Status"}
              </Button>
            </div>
          </dl>
        </CardContent>
      </Card>
    </>
  );
};

// export
export default UserActions;
