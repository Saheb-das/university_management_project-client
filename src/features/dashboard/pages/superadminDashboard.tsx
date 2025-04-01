// external import
import { Bar, Line } from "recharts";

// internal import
import BarChartStats from "../components/shared/BarChartStats";
import LineChartStats from "../components/shared/LineChartStats";
import TotalStuff from "../components/ui/TotalStuff";
import Container from "@/components/shared/Container";

// dummy data
const studentData = [
  { department: "Computer Science", count: 450 },
  { department: "Engineering", count: 380 },
  { department: "Business", count: 300 },
  { department: "Arts", count: 200 },
  { department: "Sciences", count: 250 },
];

const teacherData = [
  { department: "Computer Science", count: 30 },
  { department: "Engineering", count: 25 },
  { department: "Business", count: 20 },
  { department: "Arts", count: 15 },
  { department: "Sciences", count: 18 },
];

const collegeGrowthData = [
  { year: 2018, students: 1000 },
  { year: 2019, students: 1200 },
  { year: 2020, students: 1350 },
  { year: 2021, students: 1500 },
  { year: 2022, students: 1580 },
];
const placementData = [
  { department: "Computer Science", total: 450, placed: 400 },
  { department: "Engineering", total: 380, placed: 320 },
  { department: "Business", total: 300, placed: 250 },
  { department: "Arts", total: 200, placed: 150 },
  { department: "Sciences", total: 250, placed: 200 },
];

const staffData = {
  accountants: 10,
  examCellWorkers: 15,
  counsellors: 8,
};

const SuperAdminDashboard = () => {
  return (
    <>
      <Container>
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* student data */}
          <BarChartStats
            title="Student Distribution by Department"
            data={studentData}
            xKey={"count"}
          >
            <Bar dataKey="count" fill="#0d9488" />
          </BarChartStats>

          {/* teacher data */}
          <BarChartStats
            title="Teacher Distribution by Department"
            data={teacherData}
            xKey={"count"}
          >
            <Bar dataKey="count" fill="#f97316" />
          </BarChartStats>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* collage growth data */}
          <LineChartStats
            xKey="year"
            title="College Growth Year by Year"
            data={collegeGrowthData}
          >
            <Line type="monotone" dataKey="students" stroke="#5753a3" />
          </LineChartStats>

          {/* placement stats */}
          <BarChartStats
            title="Placement Statistics by Department"
            data={placementData}
            xKey={"department"}
          >
            <Bar dataKey="total" fill="#15803d" name="Total Students" />
            <Bar dataKey="placed" fill="#84cc16" name="Placed Students" />
          </BarChartStats>
        </div>

        <TotalStuff staffData={staffData} />
      </Container>
    </>
  );
};

export default SuperAdminDashboard;
