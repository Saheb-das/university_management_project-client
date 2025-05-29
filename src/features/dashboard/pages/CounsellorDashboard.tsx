// external import
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { GraduationCap, IndianRupee, Target, Users } from "lucide-react";

// internal import
import InfoCard from "../components/shared/InfoCard";
import AdmissionsChart from "../components/ui/AdmissionChart";
import CommissionChart from "../components/ui/CommissionChart";
import TargetRewardList from "../components/ui/TargetRewardList";
import PrevWinnerList from "../components/ui/PrevWinnerList";
import Container from "@/components/shared/Container";
import CardContainer from "../components/shared/CardContainer";
import {
  lastFiveYearsStatsAtom,
  prevTopThreeAtom,
  totalAdmitsAndcommissionsAtom,
} from "../recoil/counsellor/dashboardAtom";
import { useCounsellorDashboard } from "../hooks/useCounsellorDashboard";
import {
  calculateGrowth,
  getAdmissionGrowthPercentage,
  getCommissionGrowthPercentage,
} from "@/utils/growthInPercentage";

const CounsellorDashboard = () => {
  const { userId } = useParams();
  const totalAdmitsAndComs = useRecoilValue(totalAdmitsAndcommissionsAtom);
  const fiveYearsStats = useRecoilValue(lastFiveYearsStatsAtom);
  const topthree = useRecoilValue(prevTopThreeAtom);

  if (!userId) return;

  const { loading } = useCounsellorDashboard(userId);

  return (
    <>
      <Container>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <InfoCard
            title="total admissions"
            data={
              totalAdmitsAndComs?.count ? String(totalAdmitsAndComs.count) : "0"
            }
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            subTitle={`${getAdmissionGrowthPercentage(fiveYearsStats) || 0}`}
            loading={loading.totalAdmitsAndCom}
          />

          <InfoCard
            title="total Commission"
            data={
              totalAdmitsAndComs?.sum?.commission
                ? String(totalAdmitsAndComs.sum.commission)
                : "0"
            }
            icon={<IndianRupee className="h-4 w-4 text-muted-foreground" />}
            subTitle={`${getCommissionGrowthPercentage(fiveYearsStats) || 0}`}
            loading={loading.totalAdmitsAndCom}
          />

          <InfoCard
            title="Target Progress"
            data="78%"
            icon={<Target className="h-4 w-4 text-muted-foreground" />}
            subTitle="22% remaining to reach goal"
          />

          <InfoCard
            title="Growth by Year"
            data={calculateGrowth(fiveYearsStats)}
            icon={<GraduationCap className="h-4 w-4 text-muted-foreground" />}
            subTitle="from last year"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-6">
          <CardContainer
            loading={loading.fiveYearsStats}
            title={"admission overview"}
            span="col-span-4"
          >
            <AdmissionsChart data={fiveYearsStats} />
          </CardContainer>

          <CardContainer
            loading={loading.fiveYearsStats}
            title={"commission income"}
            span="col-span-3"
          >
            <CommissionChart data={fiveYearsStats} />
          </CardContainer>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-6">
          <CardContainer title={"target reward list"} span="col-span-3">
            <TargetRewardList />
          </CardContainer>

          <CardContainer
            loading={loading.threeToppers}
            title={"top performers - last year"}
            span="col-span-4"
          >
            <PrevWinnerList data={topthree} />
          </CardContainer>
        </div>
      </Container>
    </>
  );
};

// export
export default CounsellorDashboard;
