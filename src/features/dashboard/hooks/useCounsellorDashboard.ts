// external import
import { useQueries } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

// internal import
import {
  lastFiveYearsStatsAtom,
  prevTopThreeAtom,
  totalAdmitsAndcommissionsAtom,
} from "../recoil/counsellor/dashboardAtom";
import {
  getPrevFiveYearsStats,
  getThreeTopppers,
  getTotalAdmitsAndComs,
} from "@/api/services/admission";

export const useCounsellorDashboard = (userId: string) => {
  // get all state atom
  const setTotalAdmitsAndComs = useSetRecoilState(
    totalAdmitsAndcommissionsAtom
  );
  const setFiveYearsStats = useSetRecoilState(lastFiveYearsStatsAtom);
  const setToppers = useSetRecoilState(prevTopThreeAtom);

  // fetch all data
  const queries = useQueries({
    queries: [
      {
        queryKey: ["counsellor-total-admits-coms"],
        queryFn: () => getTotalAdmitsAndComs(userId),
      },
      {
        queryKey: ["counsellor-five-years-stats"],
        queryFn: () => getPrevFiveYearsStats(userId),
      },
      { queryKey: ["counsellor-top-three"], queryFn: getThreeTopppers },
    ],
  });

  // all promise
  const [totalAdmitsAndComQ, fiveYearsStatsQ, threeToppersQ] = queries;

  /**
   * here data pass to selector and transform data and store it in atom
   */
  useEffect(() => {
    if (totalAdmitsAndComQ.isSuccess && totalAdmitsAndComQ.data) {
      const { totalAdmitsAndComs } = totalAdmitsAndComQ.data;

      setTotalAdmitsAndComs(totalAdmitsAndComs);
    }
  }, [totalAdmitsAndComQ.data, totalAdmitsAndComQ.isSuccess]);

  useEffect(() => {
    if (fiveYearsStatsQ.isSuccess && fiveYearsStatsQ.data) {
      const { fiveYearsStats } = fiveYearsStatsQ.data;
      setFiveYearsStats(fiveYearsStats);
    }
  }, [fiveYearsStatsQ.data, fiveYearsStatsQ.isSuccess]);

  useEffect(() => {
    if (threeToppersQ.isSuccess && threeToppersQ.data) {
      const { topThree } = threeToppersQ.data;
      setToppers(topThree);
    }
  }, [threeToppersQ.data, threeToppersQ.isSuccess]);

  return {
    loading: {
      totalAdmitsAndCom: totalAdmitsAndComQ.isLoading,
      fiveYearsStats: fiveYearsStatsQ.isLoading,
      threeToppers: threeToppersQ.isLoading,
    },
  };
};
