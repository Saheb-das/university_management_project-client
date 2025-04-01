import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface ISubject {
  name: string;
  teacher: string;
}

interface IResult {
  subject: string;
  firstInternal: number;
  secondInternal: number;
  final: number;
  lab: number;
}

interface ISemesterDetails {
  subjects: ISubject[];
  results: IResult[];
}

interface ISemester {
  Fall: ISemesterDetails;
  Spring: ISemesterDetails;
}

// Dummy data for demonstration
const semesterData: ISemester = {
  Fall: {
    subjects: [
      { name: "Advanced Algorithms", teacher: "Dr. Alan Turing" },
      { name: "Machine Learning", teacher: "Dr. Andrew Ng" },
      { name: "Database Systems", teacher: "Dr. Michael Stonebraker" },
    ],
    results: [
      {
        subject: "Advanced Algorithms",
        firstInternal: 85,
        secondInternal: 88,
        final: 92,
        lab: 95,
      },
      {
        subject: "Machine Learning",
        firstInternal: 82,
        secondInternal: 86,
        final: 90,
        lab: 93,
      },
      {
        subject: "Database Systems",
        firstInternal: 80,
        secondInternal: 84,
        final: 88,
        lab: 91,
      },
    ],
  },
  Spring: {
    subjects: [
      { name: "Data Structures", teacher: "Dr. Donald Knuth" },
      { name: "Web Development", teacher: "Dr. Tim Berners-Lee" },
      { name: "Computer Networks", teacher: "Dr. Vint Cerf" },
    ],
    results: [
      {
        subject: "Data Structures",
        firstInternal: 78,
        secondInternal: 82,
        final: 85,
        lab: 88,
      },
      {
        subject: "Web Development",
        firstInternal: 85,
        secondInternal: 88,
        final: 92,
        lab: 95,
      },
      {
        subject: "Computer Networks",
        firstInternal: 80,
        secondInternal: 83,
        final: 87,
        lab: 90,
      },
    ],
  },
};

const SemesterInfo = () => {
  const [selectedSemester, setSelectedSemester] =
    useState<keyof ISemester>("Fall");

  // TODO: in-complete functionaly
  // const handleChange = (event:ChangeEvent) => {
  //   setSelectedSemester(event.target.)
  // }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-primary">
            Subject Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {semesterData[selectedSemester].subjects.map((subject, index) => (
              <li key={index}>
                <span className="font-semibold">{subject.name}</span> -{" "}
                {subject.teacher}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-primary">
            Semester Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select
              // onValueChange={handleChange}
              defaultValue={selectedSemester}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(semesterData).map((semester) => (
                  <SelectItem key={semester} value={semester}>
                    {semester}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Table className="text-base">
            <TableHeader>
              <TableRow>
                <TableHead>Subject Name</TableHead>
                <TableHead>1st Internal</TableHead>
                <TableHead>2nd Internal</TableHead>
                <TableHead>Final</TableHead>
                <TableHead>Lab/Assignment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {semesterData[selectedSemester].results.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>{result.subject}</TableCell>
                  <TableCell>{result.firstInternal}</TableCell>
                  <TableCell>{result.secondInternal}</TableCell>
                  <TableCell>{result.final}</TableCell>
                  <TableCell>{result.lab}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// export
export default SemesterInfo;
