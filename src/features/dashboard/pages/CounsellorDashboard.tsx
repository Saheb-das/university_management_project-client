// external import
import { GraduationCap, IndianRupee, Target, Users } from "lucide-react";

// internal import
import InfoCard from "../components/shared/InfoCard";
import AdmissionsChart from "../components/ui/AdmissionChart";
import CommissionChart from "../components/ui/CommissionChart";
import TargetRewardList from "../components/ui/TargetRewardList";
import PrevWinnerList from "../components/ui/PrevWinnerList";
import Container from "@/components/shared/Container";
import CardContainer from "../components/shared/CardContainer";

const CounsellorDashboard = () => {
  return (
    <>
      <Container>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <InfoCard
            title="total admissions"
            data="1234"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            subTitle="+20.1% from last year"
          />

          <InfoCard
            title="total Commission"
            data="54,321"
            icon={<IndianRupee className="h-4 w-4 text-muted-foreground" />}
            subTitle="+15.2% from last year"
          />

          <InfoCard
            title="Target Progress"
            data="78%"
            icon={<Target className="h-4 w-4 text-muted-foreground" />}
            subTitle="22% remaining to reach goal"
          />

          <InfoCard
            title="Avg. GPA"
            data="3.7"
            icon={<GraduationCap className="h-4 w-4 text-muted-foreground" />}
            subTitle="+0.2 from last year"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-6">
          <CardContainer title={"admission overview"} span="col-span-4">
            <AdmissionsChart />
          </CardContainer>

          <CardContainer title={"commission income"} span="col-span-3">
            <CommissionChart />
          </CardContainer>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-6">
          <CardContainer title={"target reward list"} span="col-span-3">
            <TargetRewardList />
          </CardContainer>

          <CardContainer title={"top performers - last year"} span="col-span-4">
            <PrevWinnerList />
          </CardContainer>
        </div>
      </Container>
    </>
  );
};

// export
export default CounsellorDashboard;
