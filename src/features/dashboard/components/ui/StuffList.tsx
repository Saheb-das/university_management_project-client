// external import
import { User } from "lucide-react";
import { useRecoilValue } from "recoil";

// internal import
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usersAtom } from "@/features/stuff/recoil/usersAtom";

interface Props {
  selUser: string;
  onUserSelect: (userId: string) => void;
}

const StuffList = ({ selUser, onUserSelect }: Props) => {
  const stuffList = useRecoilValue(usersAtom);
  return (
    <Card className="w-full lg:w-1/3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Employee List
        </CardTitle>
        <CardDescription>
          Select an employee to process salary payment
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {stuffList &&
            stuffList.length > 0 &&
            stuffList.map((item) => (
              <Button
                key={item.id}
                variant={selUser === item.id ? "secondary" : "ghost"}
                className="w-full justify-start p-4 h-auto"
                onClick={() => onUserSelect(item.id)}
              >
                <div className="flex items-center gap-3 w-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={"/placeholder.svg"}
                      alt={item.firstName}
                    />
                    <AvatarFallback>
                      {item.firstName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="font-medium">
                      {item.firstName} {item.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">{""}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.role}
                  </Badge>
                </div>
              </Button>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StuffList;
