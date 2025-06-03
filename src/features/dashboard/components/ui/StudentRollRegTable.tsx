// external import
import { useState } from "react";
import { useRecoilValue } from "recoil";

// internal import
import queryClient from "@/react-query/client";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { studentsListForRollRegAtom } from "../../recoil/examceller/dashboardAtom";
import { useCreateStudentRollRegById } from "../../hooks/useCreateStudentRollRegById";
import { toast } from "sonner";

const StudentRollRegTable = ({ batchId }: { batchId: string }) => {
  const [selStudent, setSelStudent] = useState("");
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [tempData, setTempData] = useState<{
    [key: string]: { rollNumber: string; registrationNumber: string };
  }>({});

  const studentsInfo = useRecoilValue(studentsListForRollRegAtom);
  const { mutate, isPending } = useCreateStudentRollRegById(selStudent);

  const handleEditToggle = (studentId: string, isEnabled: boolean) => {
    if (isEnabled) {
      // Enable edit mode - store current values in temp data
      const student =
        studentsInfo && studentsInfo.find((s) => s.id === studentId);
      if (student) {
        setSelStudent(student.id);
        setTempData((prev) => ({
          ...prev,
          [studentId]: {
            rollNumber: student.rollNo ?? "",
            registrationNumber: student.registretionNo ?? "",
          },
        }));
      }
      setEditMode((prev) => ({ ...prev, [studentId]: true }));
    } else {
      // Submit/Save changes
      const updated = tempData[studentId];
      if (!updated) {
        return;
      }

      mutate(
        { rollNo: updated.rollNumber, regNo: updated.registrationNumber },
        {
          onSuccess: (res) => {
            if (!res) return res;

            if (res.success) {
              toast.success(res.message || "roll and reg updated");

              queryClient.invalidateQueries({
                queryKey: ["students-roll-reg", batchId],
              });
            }
          },
          onError: (err) => {
            toast.error(err.message || "update failed");
          },
          onSettled: () => {
            setEditMode((prev) => ({ ...prev, [studentId]: false }));
            // Clean up temp data
            setTempData((prev) => {
              const newTempData = { ...prev };
              delete newTempData[studentId];
              return newTempData;
            });
          },
        }
      );
    }
  };

  const handleInputChange = (
    studentId: string,
    field: "rollNumber" | "registrationNumber",
    value: string
  ) => {
    setTempData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Student's Roll and Registration Number
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">Degree</TableHead>
                <TableHead className="font-semibold">Course</TableHead>
                <TableHead className="font-semibold">Roll Number</TableHead>
                <TableHead className="font-semibold">
                  Registration Number
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Edit
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentsInfo &&
                studentsInfo.map((student) => (
                  <TableRow key={student.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {student.profile.user.firstName}{" "}
                      {student.profile.user.lastName}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {student.department.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{student.course.degree.type}</TableCell>
                    <TableCell>{student.course.name}</TableCell>
                    <TableCell>
                      {editMode[student.id] ? (
                        <Input
                          value={
                            tempData[student.id]?.rollNumber ??
                            student.rollNo ??
                            ""
                          }
                          onChange={(e) =>
                            handleInputChange(
                              student.id,
                              "rollNumber",
                              e.target.value
                            )
                          }
                          className="w-full min-w-[120px]"
                          placeholder="Enter roll number"
                        />
                      ) : (
                        <span className="font-mono">
                          {student.rollNo || "NA"}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editMode[student.id] ? (
                        <Input
                          value={
                            tempData[student.id]?.registrationNumber ??
                            student.registretionNo ??
                            ""
                          }
                          onChange={(e) =>
                            handleInputChange(
                              student.id,
                              "registrationNumber",
                              e.target.value
                            )
                          }
                          className="w-full min-w-[140px]"
                          placeholder="Enter registration number"
                        />
                      ) : (
                        <span className="font-mono">
                          {student.registretionNo || "NA"}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Switch
                          checked={editMode[student.id] || false}
                          onCheckedChange={(checked) =>
                            handleEditToggle(student.id, checked)
                          }
                          disabled={isPending}
                        />
                        <span className="text-sm text-muted-foreground">
                          {editMode[student.id] ? "Save" : "Edit"}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentRollRegTable;
