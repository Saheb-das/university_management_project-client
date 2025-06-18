// external import
import { CreditCard, User } from "lucide-react";
import { useRecoilValue } from "recoil";

// internal import
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { selectUserDetailsAtom } from "@/features/stuff/recoil/usersAtom";
import SalaryPayForm from "./SalaryPayForm";
import { Separator } from "@/components/ui/separator";

const StuffDetails = () => {
  const userDetailsInfo = useRecoilValue(selectUserDetailsAtom);

  if (!userDetailsInfo) return <p>there are no users</p>;
  return (
    <Card className="w-full lg:w-2/3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Salary Payment
        </CardTitle>
        <CardDescription>
          {userDetailsInfo
            ? `Process salary payment for ${userDetailsInfo.firstName} ${userDetailsInfo.lastName}`
            : "Select an employee to process payment"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {userDetailsInfo ? (
          <div className="space-y-6">
            {/* User Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Employee Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={
                        userDetailsInfo?.profile?.avatar || "/placeholder.svg"
                      }
                      alt={userDetailsInfo?.firstName}
                    />
                    <AvatarFallback>
                      {userDetailsInfo.firstName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {userDetailsInfo.firstName} {userDetailsInfo.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {userDetailsInfo.email}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      Highest Qualification:
                    </span>
                    <span className="text-sm">
                      {userDetailsInfo.profile.stuff.highestDegree}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Specialization:</span>
                    <Badge variant="outline">
                      {userDetailsInfo.profile.stuff.specializedIn}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Form */}
            <SalaryPayForm stuff={userDetailsInfo} />
          </div>
        ) : (
          <div className="text-center py-12">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Employee Selected</h3>
            <p className="text-muted-foreground">
              Please select an employee from the list to process their salary
              payment.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StuffDetails;
