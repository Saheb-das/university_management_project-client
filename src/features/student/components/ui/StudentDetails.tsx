// external import
import { useEffect, useState } from "react";

// internal import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { IStudent, TStatus } from "../../types/student";
import { useUpdateStatus } from "../../hooks/useUpdateStatus";
import { toast } from "sonner";
import { useSetRecoilState } from "recoil";
import { studentsListAtom } from "../../recoil/studentAtom";

interface StudentDetailProps {
  student: IStudent;
}

function StudentDetails({ student }: StudentDetailProps) {
  const [status, setStatus] = useState(
    student.profile.user.activeStatus as TStatus
  );
  const setStudents = useSetRecoilState(studentsListAtom);
  const { mutate, isPending } = useUpdateStatus(student.id);

  const handleStatusUpdate = () => {
    mutate(status, {
      onSuccess: (res) => {
        if (!res) return res;
        const updatedstudent = res.student;

        setStudents((prev) => {
          const updated = prev.map((item) => {
            if (item.id === updatedstudent.id) {
              return {
                ...item,
                profile: {
                  ...item.profile,
                  user: {
                    ...item.profile.user,
                    activeStatus: updatedstudent.profile.user.activeStatus,
                  },
                },
              };
            } else {
              return item;
            }
          });
          return updated;
        });

        toast.success(res?.message || "status updated successfully");
      },
      onError: (err) => {
        toast.error(err.message || "status not updated");
      },
    });
  };

  useEffect(() => {
    setStatus(student.profile.user.activeStatus as TStatus);
  }, [student]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg  ">
          {student.profile.user.firstName} {student.profile.user.lastName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2">
          <div className="flex gap-2">
            <dt className="font-semibold ">Roll No:</dt>
            <dd>{student.rollNo}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold ">Registration No:</dt>
            <dd>{student.registretionNo}</dd>
          </div>

          <div className="flex gap-2">
            <dt className="font-semibold">Current Status:</dt>
            <dd>
              <Badge
                variant={
                  student.profile.user.activeStatus === "regular"
                    ? "default"
                    : student.profile.user.activeStatus === "suspend"
                    ? "outline"
                    : "destructive"
                }
              >
                {student.profile.user.activeStatus}
              </Badge>
            </dd>
          </div>
          <div className="pt-4">
            <dt className="font-semibold mb-2">Change Status:</dt>
            <dd>
              <Select
                onValueChange={(val: TStatus) => setStatus(val)}
                value={status}
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
            <Button
              onClick={handleStatusUpdate}
              disabled={
                status === student.profile.user.activeStatus || isPending
              }
            >
              {isPending ? "Updating..." : "Update Status"}
            </Button>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

// export
export default StudentDetails;
