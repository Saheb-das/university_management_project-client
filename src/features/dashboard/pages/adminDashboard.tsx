// external import
import { Users, GraduationCap, Smile, IndianRupee } from "lucide-react";

// internal import
import InfoCard from "../components/shared/InfoCard";
import CollageActivitiesChart from "../components/ui/CollageActivitiesChart";
import Container from "@/components/shared/Container";
import BarChartStats from "../components/shared/BarChartStats";
import { Bar, Line } from "recharts";
import LineChartStats from "../components/shared/LineChartStats";

const admissionData = [
  { year: 2018, admissions: 1200 },
  { year: 2019, admissions: 1350 },
  { year: 2020, admissions: 1100 },
  { year: 2021, admissions: 1500 },
  { year: 2022, admissions: 1650 },
];

const performanceData = [
  { year: 2018, counsellor: 85, examcell: 78, accountant: 90 },
  { year: 2019, counsellor: 88, examcell: 82, accountant: 92 },
  { year: 2020, counsellor: 90, examcell: 85, accountant: 89 },
  { year: 2021, counsellor: 92, examcell: 88, accountant: 94 },
  { year: 2022, counsellor: 95, examcell: 90, accountant: 96 },
];

const satisfactionData = [
  { name: "Very Satisfied", currentYear: 45, previousYear: 40 },
  { name: "Satisfied", currentYear: 30, previousYear: 35 },
  { name: "Neutral", currentYear: 15, previousYear: 15 },
  { name: "Dissatisfied", currentYear: 7, previousYear: 8 },
  { name: "Very Dissatisfied", currentYear: 3, previousYear: 2 },
];

// Sample data for college activities
const collageActivitiesData = [
  { name: "Sports", value: 30 },
  { name: "Cultural Events", value: 20 },
  { name: "Workshops", value: 15 },
  { name: "Seminars", value: 10 },
  { name: "Community Service", value: 25 },
];

const collageInfo = [
  {
    title: "total students",
    data: "1,650",
    icon: <Users size={18} className="text-muted-foreground" />,
    subtitle: "+10% from last year",
  },
  {
    title: "Graduation Rate",
    data: "92%",
    icon: <GraduationCap size={18} className="text-muted-foreground" />,
    subtitle: "+2% from last year",
  },
  {
    title: "Student Satisfaction",
    data: "75%",
    icon: <Smile size={18} className="text-muted-foreground" />,
    subtitle: "+5% from last year",
  },
  {
    title: "Revenue",
    data: "$5.2M",
    icon: <IndianRupee size={18} className="text-muted-foreground" />,
    subtitle: "+12% from last year",
  },
];

function AdminDashboard() {
  return (
    <Container>
      {/* card info */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {collageInfo &&
          collageInfo.map((item) => (
            <InfoCard
              key={item.title}
              title={item.title}
              data={item.data}
              icon={item.icon}
              subTitle={item.subtitle}
            />
          ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* student admission */}
        <BarChartStats
          title="students admission"
          desc="Year-by-year student admission trends"
          data={admissionData}
          xKey="year"
        >
          <Bar dataKey="admissions" fill="#eeb927" />
        </BarChartStats>

        {/* staff performance */}
        <LineChartStats
          xKey="year"
          title="College Growth Year by Year"
          data={performanceData}
        >
          <Line type="monotone" dataKey="counsellor" stroke="#5f3cb1" />
          <Line type="monotone" dataKey="examcell" stroke="#539ea3" />
          <Line type="monotone" dataKey="accountant" stroke="#80a353" />
        </LineChartStats>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* student satisfation */}
        <BarChartStats
          title="Student Satisfaction"
          desc="current vs previous year"
          data={satisfactionData}
          xKey={"name"}
        >
          <Bar dataKey="currentYear" fill="#1d4ed8" name="Total Students" />
          <Bar dataKey="previousYear" fill="#60a5fa" name="Placed Students" />
        </BarChartStats>

        {/* collage other activities */}
        <CollageActivitiesChart activitiesData={collageActivitiesData} />
      </div>
    </Container>
  );
}

// export
export default AdminDashboard;
