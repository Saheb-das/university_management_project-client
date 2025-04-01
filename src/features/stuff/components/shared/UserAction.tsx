// external import
import { useEffect, useState } from "react";

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
import { IUser } from "./Users";

interface UserDetailsProps {
  user: IUser;
  onStatusChange: (userId: number, newStatus: IUser["status"]) => void;
}

const UserActions = ({ user, onStatusChange }: UserDetailsProps) => {
  const [userStatus, setUserStatus] = useState<IUser["status"]>(user.status);

  useEffect(() => {
    setUserStatus(user.status);
  }, [user]);

  const handleStatus = (newStatus: IUser["status"]) => {
    setUserStatus(newStatus);
  };

  const handleStatusUpdate = () => {
    onStatusChange(user.id, userStatus);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg capitalize">{user.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* some details */}
          <dl className="space-y-2">
            <div className="flex gap-2">
              <dt className="font-semibold ">Qualification:</dt>
              <dd>{user.qualification}</dd>
            </div>

            <div className="flex gap-2">
              <dt className="font-semibold">Current Status:</dt>
              <dd>
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
              </dd>
            </div>
            <div className="pt-4">
              <dt className="font-semibold mb-2">Change Status:</dt>
              <dd>
                <Select onValueChange={handleStatus} value={userStatus}>
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
              <Button
                onClick={handleStatusUpdate}
                disabled={userStatus === user.status}
              >
                Update Status
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
