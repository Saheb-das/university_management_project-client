// external import
import { useState } from "react";

// internal import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface IFilters {
  semester: string;
  department: string;
  degree: string;
}

interface AttendanceFormProps {
  onGetStudents: (filters: IFilters) => void;
}

function AttendanceFilter({ onGetStudents }: AttendanceFormProps) {
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");
  const [degree, setDegree] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGetStudents({ semester, department, degree });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Attendance Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger id="semester">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st">1st Semester</SelectItem>
                  <SelectItem value="2nd">2nd Semester</SelectItem>
                  <SelectItem value="3rd">3rd Semester</SelectItem>
                  <SelectItem value="4th">4th Semester</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="ee">Electrical Engineering</SelectItem>
                  <SelectItem value="me">Mechanical Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Select value={degree} onValueChange={setDegree}>
                <SelectTrigger id="degree">
                  <SelectValue placeholder="Select degree" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btech">B.Tech</SelectItem>
                  <SelectItem value="mtech">M.Tech</SelectItem>
                  <SelectItem value="phd">Ph.D</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit">Get Students</Button>
        </form>
      </CardContent>
    </Card>
  );
}

// export
export default AttendanceFilter;
