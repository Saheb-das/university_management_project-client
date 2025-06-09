// external import
import { useRecoilValue } from "recoil";

// internal import
import InfoRow from "@/components/shared/InfoRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { transStudentAcademicSelector } from "../../recoil/academicSelector";

const AcademicInfo = () => {
  const studentInfo = useRecoilValue(transStudentAcademicSelector);
  if (!studentInfo) return <p>No Data</p>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Academic Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <InfoRow label={"FullName"} name={studentInfo.fullName} />
          <InfoRow label={"Department"} name={studentInfo.dept} />
          <InfoRow label={"Degree"} name={studentInfo.deg} />
          <InfoRow label={"Course"} name={studentInfo.course} />
          <InfoRow label={"Batch"} name={studentInfo.batch} />
          <InfoRow
            label={"Registration No"}
            name={studentInfo.regNo || "not provided yet"}
          />
          <InfoRow
            label={"Roll No"}
            name={studentInfo.rollNo || "not provided yet"}
          />
          <InfoRow
            label={"Current Semester"}
            name={String(studentInfo.curSem)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicInfo;
