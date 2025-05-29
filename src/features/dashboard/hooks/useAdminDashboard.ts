// external import
import { useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import {
  collageRevenueByRangeAtom,
  studentsGrowthAtom,
} from "../recoil/admin/dashboardAtom";
import { getGrowth, getRevenuesByRange } from "@/api/services/statistic";

export const useAdminDashboard = () => {
  // get all state atom
  const setStudentsGrowth = useSetRecoilState(studentsGrowthAtom);
  const setCollageRevenues = useSetRecoilState(collageRevenueByRangeAtom);

  // fetch all data
  const queries = useQueries({
    queries: [
      {
        queryKey: ["admin-students-growth"],
        queryFn: getGrowth,
      },
      {
        queryKey: ["admin-collage-revenues-by-range"],
        queryFn: getRevenuesByRange,
      },
    ],
  });

  // all promise
  const [studentGrowthQ, revenueGrowthQ] = queries;

  /**
   * here data pass to selector and transform data and store it in atom
   */
  useEffect(() => {
    if (studentGrowthQ.isSuccess && studentGrowthQ.data) {
      const { growth } = studentGrowthQ.data;

      setStudentsGrowth(growth);
    }
  }, [studentGrowthQ.data, studentGrowthQ.isSuccess]);

  useEffect(() => {
    if (revenueGrowthQ.isSuccess && revenueGrowthQ.data) {
      const { revenues } = revenueGrowthQ.data;
      setCollageRevenues(revenues);
    }
  }, [revenueGrowthQ.data, revenueGrowthQ.isSuccess]);

  return {
    loading: {
      studentGrowth: studentGrowthQ.isLoading,
      revenueGrowth: revenueGrowthQ.isLoading,
    },
  };
};
