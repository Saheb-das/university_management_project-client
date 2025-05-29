// external import
import { Users, GraduationCap, Smile, IndianRupee } from "lucide-react";
import { useRecoilValue } from "recoil";

// internal import
import InfoCard from "../components/shared/InfoCard";
import CollageActivitiesChart from "../components/ui/CollageActivitiesChart";
import Container from "@/components/shared/Container";
import BarChartStats from "../components/shared/BarChartStats";
import { Bar, Line } from "recharts";
import LineChartStats from "../components/shared/LineChartStats";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import {
  collageRevenueByRangeAtom,
  studentsGrowthAtom,
} from "../recoil/admin/dashboardAtom";
import {
  getAdmissionYearByYear,
  getCurYearRevenue,
  getRevenueYearByYear,
  getTotalStudents,
} from "@/utils/calc";

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

function AdminDashboard() {
  const studentGwothInfo = useRecoilValue(studentsGrowthAtom);
  const revenuesInfo = useRecoilValue(collageRevenueByRangeAtom);

  const { loading } = useAdminDashboard();
  return (
    <Container>
      {/* card info */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {/* total students */}
        <InfoCard
          title="total students"
          data={getTotalStudents(studentGwothInfo)}
          icon={<Users size={18} className="text-muted-foreground" />}
          subTitle={"+10% from last year"}
          loading={loading.studentGrowth}
        />

        {/* graduation rate */}
        <InfoCard
          title={"Graduation Rate"}
          data={"92%"}
          icon={<GraduationCap size={18} className="text-muted-foreground" />}
          subTitle={"+2% from last year"}
          // loading={}
        />

        {/* student satisfation */}
        <InfoCard
          title={"Student Satisfaction"}
          data={"75%"}
          icon={<Smile size={18} className="text-muted-foreground" />}
          subTitle={"+5% from last year"}
          // loading={}
        />

        {/* revenue */}
        <InfoCard
          title={"Revenue"}
          data={getCurYearRevenue(revenuesInfo)}
          icon={<IndianRupee size={18} className="text-muted-foreground" />}
          subTitle={"+12% from last year"}
          loading={loading.revenueGrowth}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* student admission */}
        <BarChartStats
          title="students admission"
          desc="Year-by-year student admission trends"
          data={getAdmissionYearByYear(studentGwothInfo)}
          xKey="year"
        >
          <Bar dataKey="admissions" fill="#eeb927" />
        </BarChartStats>

        {/* staff performance */}
        <LineChartStats
          xKey="year"
          title="College Growth Year by Year"
          data={getRevenueYearByYear(revenuesInfo)}
        >
          <Line type="monotone" dataKey="revenue" stroke="#b11738" />
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
          <Bar dataKey="currentYear" fill="#1d4ed8" name="current year" />
          <Bar dataKey="previousYear" fill="#60a5fa" name="previous year" />
        </BarChartStats>

        {/* collage other activities */}
        <CollageActivitiesChart activitiesData={collageActivitiesData} />
      </div>
    </Container>
  );
}

// export
export default AdminDashboard;
