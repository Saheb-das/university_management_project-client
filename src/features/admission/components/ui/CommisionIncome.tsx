import { useState, useMemo } from "react";
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

// Mock data for commission income
const commissionData = [
  {
    id: 1,
    name: "John Doe",
    department: "Computer Science",
    course: "Software Engineering",
    admissionYear: 2023,
    commission: 1000,
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "Business",
    course: "Marketing",
    admissionYear: 2023,
    commission: 1200,
  },
  {
    id: 3,
    name: "Alice Johnson",
    department: "Engineering",
    course: "Mechanical Engineering",
    admissionYear: 2022,
    commission: 900,
  },
  {
    id: 4,
    name: "Bob Brown",
    department: "Arts",
    course: "Fine Arts",
    admissionYear: 2022,
    commission: 800,
  },
  {
    id: 5,
    name: "Charlie Davis",
    department: "Science",
    course: "Physics",
    admissionYear: 2023,
    commission: 1100,
  },
];

const CommisionIncome = () => {
  const [selectedYear, setSelectedYear] = useState<string>("");

  const filteredData = useMemo(
    () =>
      selectedYear === "all" || !selectedYear
        ? commissionData
        : commissionData.filter(
            (data) => data.admissionYear.toString() === selectedYear
          ),
    [selectedYear]
  );

  const totalCommission = useMemo(
    () => filteredData.reduce((sum, data) => sum + data.commission, 0),
    [filteredData]
  );

  const uniqueYears = [
    ...new Set(commissionData.map((data) => data.admissionYear)),
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
            Total Commission: ${totalCommission}
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
            {filteredData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.department}</TableCell>
                <TableCell>{data.course}</TableCell>
                <TableCell>{data.admissionYear}</TableCell>
                <TableCell>${data.commission}</TableCell>
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
