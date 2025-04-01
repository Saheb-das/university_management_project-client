// internal import
import InfoRow from "@/components/shared/InfoRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const studentInfo: { label: string; name: string }[] = [
  { label: "Student Name", name: "John Doe" },
  { label: "Student ID", name: "ST12345" },
  { label: "Program", name: "Bachelor of Science in Computer Science" },
  { label: "Current Semester", name: "Fall 2023" },
  { label: "Academic Advisor", name: "Dr. Jane Smith" },
  { label: "GPA", name: "3.75" },
];

const AcademicInfo = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Academic Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {studentInfo &&
            studentInfo.map((student) => (
              <InfoRow
                label={student.label}
                name={student.name}
                key={student.name}
              />
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicInfo;
