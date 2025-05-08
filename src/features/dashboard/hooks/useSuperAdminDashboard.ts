// external import
import { useQueries } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

// internal import
import {
  getGrowth,
  getPlacement,
  getStudentByDept,
  getStuffStats,
  getTeacherByDept,
} from "@/api/services/statistic";
import {
  growthStatsAtom,
  placementStatsAtom,
  studentStatsAtom,
  stuffStatsAtom,
  teacherStatsAtom,
} from "../recoil/superadmin/dashboardAtom";

export const useSuperAdminDashboard = () => {
  // get all state atom
  const setStudent = useSetRecoilState(studentStatsAtom);
  const setTeacher = useSetRecoilState(teacherStatsAtom);
  const setGrowth = useSetRecoilState(growthStatsAtom);
  const setPlacement = useSetRecoilState(placementStatsAtom);
  const setStuff = useSetRecoilState(stuffStatsAtom);

  // fetch all data
  const queries = useQueries({
    queries: [
      { queryKey: ["superadmin-student-stats"], queryFn: getStudentByDept },
      { queryKey: ["superadmin-teacher-stats"], queryFn: getTeacherByDept },
      { queryKey: ["superadmin-collage-growth"], queryFn: getGrowth },
      { queryKey: ["superadmin-collage-placement"], queryFn: getPlacement },
      { queryKey: ["superadmin-stuff-stats"], queryFn: getStuffStats },
    ],
  });

  // all promise
  const [studentQ, teacherQ, growthQ, placementQ, stuffQ] = queries;

  /**
   * here data pass to selector and transform data and store it in atom
   */
  useEffect(() => {
    if (studentQ.isSuccess && studentQ.data) {
      const { studentStats } = studentQ.data;

      setStudent(studentStats);
    }
  }, [studentQ.data, studentQ.isSuccess]);

  useEffect(() => {
    if (teacherQ.isSuccess && teacherQ.data) {
      const { teacherStats } = teacherQ.data;
      setTeacher(teacherStats);
    }
  }, [teacherQ.data, teacherQ.isSuccess]);

  useEffect(() => {
    if (growthQ.isSuccess && growthQ.data) {
      const { growth } = growthQ.data;
      setGrowth(growth);
    }
  }, [growthQ.data, growthQ.isSuccess]);

  useEffect(() => {
    if (placementQ.isSuccess && placementQ.data) {
      const { collagePlacements } = placementQ.data;
      setPlacement(collagePlacements);
    }
  }, [placementQ.isSuccess, placementQ.data]);

  useEffect(() => {
    if (studentQ.isSuccess && stuffQ.data) {
      const { stuffStats } = stuffQ.data;
      setStuff(stuffStats);
    }
  }, [stuffQ.data, stuffQ.isSuccess]);

  return {
    loading: {
      student: studentQ.isLoading,
      teacher: teacherQ.isLoading,
      growth: growthQ.isLoading,
      placement: placementQ.isLoading,
      stuff: stuffQ.isLoading,
    },
    error: {
      student: studentQ.isError,
      teacher: teacherQ.isError,
      growth: growthQ.isError,
      placement: placementQ.isError,
      stuff: stuffQ.isError,
    },
  };
};
