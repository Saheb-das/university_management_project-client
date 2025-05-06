// external import
import { Bar, Line } from "recharts";
import { useRecoilValue } from "recoil";

// internal import
import BarChartStats from "../components/shared/BarChartStats";
import LineChartStats from "../components/shared/LineChartStats";
import TotalStuff from "../components/ui/TotalStuff";
import Container from "@/components/shared/Container";
import { useSuperAdminDashboard } from "../hooks/useSuperAdminDashboard";
import {
  formattedGrowthStatsSelector,
  formattedPlacementStatsSelector,
  formattedStudentStatsSelector,
  formattedStuffStatsSelector,
  formattedTeacherStatsSelector,
} from "../recoil/superadmin/dashboardSelector";

const SuperAdminDashboard = () => {
  const { error, loading } = useSuperAdminDashboard();
  const studentStats = useRecoilValue(formattedStudentStatsSelector);
  const teacherStats = useRecoilValue(formattedTeacherStatsSelector);
  const growthStats = useRecoilValue(formattedGrowthStatsSelector);
  const placementStats = useRecoilValue(formattedPlacementStatsSelector);
  const stuffStats = useRecoilValue(formattedStuffStatsSelector);

  return (
    <>
      <Container>
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* student data */}
          <div>
            {loading.student && <p>Loading ...</p>}
            {error.student && <p>something went wrong</p>}
            <BarChartStats
              title="Student Distribution by Department"
              data={studentStats}
              xKey={"department"}
            >
              <Bar dataKey="count" fill="#0d9488" radius={6} />
            </BarChartStats>
          </div>

          {/* teacher data */}
          <div>
            {loading.teacher && <p>Loading ...</p>}
            {error.teacher && <p>something went wrong</p>}
            <BarChartStats
              title="Teacher Distribution by Department"
              data={teacherStats}
              xKey={"department"}
            >
              <Bar dataKey="count" fill="#f97316" radius={6} />
            </BarChartStats>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* collage growth data */}
          <div>
            {loading.growth && <p>Loading ...</p>}
            {error.growth && <p>something went wrong</p>}
            <LineChartStats
              xKey="year"
              title="College Growth Year by Year"
              data={growthStats}
            >
              <Line type="monotone" dataKey="students" stroke="#5753a3" />
            </LineChartStats>
          </div>

          {/* placement stats */}
          <div>
            {loading.placement && <p>Loading ...</p>}
            {error.placement && <p>something went wrong</p>}
            <BarChartStats
              title="Placement Statistics by Department"
              data={placementStats}
              xKey={"department"}
            >
              <Bar dataKey="total" fill="#15803d" name="Total Students" />
              <Bar dataKey="placed" fill="#84cc16" name="Placed Students" />
            </BarChartStats>
          </div>
        </div>

        {/* stuff stats */}
        {loading.stuff && <p>Loading ...</p>}
        {error.stuff && <p>something went wrong</p>}
        {stuffStats && <TotalStuff stuffData={stuffStats} />}
      </Container>
    </>
  );
};

export default SuperAdminDashboard;
