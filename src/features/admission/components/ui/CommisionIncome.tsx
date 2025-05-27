// external import
import { useState, useMemo } from "react";
import { useRecoilValue } from "recoil";

// internal import
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { admissionListAtom } from "../../recoil/admissionAtom";

const CommisionIncome = () => {
  const [selectedYear, setSelectedYear] = useState<string>("");

  const admissionListsInfo = useRecoilValue(admissionListAtom);

  const filteredData = useMemo(
    () =>
      selectedYear === "all" || !selectedYear
        ? admissionListsInfo
        : admissionListsInfo.filter(
            (data) => data.inYear.toString() === selectedYear
          ),
    [selectedYear]
  );

  const totalCommission = useMemo(
    () => filteredData.reduce((sum, data) => sum + Number(data.commission), 0),
    [filteredData]
  );

  const uniqueYears = [
    ...new Set(admissionListsInfo.map((data) => data.inYear.toString())),
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission Income</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Select onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {uniqueYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-xl font-bold">
            Total Commission: ₹ {totalCommission}
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Admission Year</TableHead>
              <TableHead>Commission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow className="capitalize" key={item.id}>
                <TableCell>
                  {item.student.profile.user.firstName}{" "}
                  {item.student.profile.user.lastName}
                </TableCell>
                <TableCell>{item.department.type}</TableCell>
                <TableCell>{item.course.name}</TableCell>
                <TableCell>{item.inYear}</TableCell>
                <TableCell>₹ {item.commission}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// export
export default CommisionIncome;
