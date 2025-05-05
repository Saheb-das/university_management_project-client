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
    if (studentQ.data) setStudent(studentQ.data);
  }, [studentQ.data]);

  useEffect(() => {
    if (teacherQ.data) setTeacher(teacherQ.data);
  }, [teacherQ.data]);

  useEffect(() => {
    if (growthQ.data) setGrowth(growthQ.data);
  }, [growthQ.data]);

  useEffect(() => {
    if (placementQ.data) setPlacement(placementQ.data);
  }, [placementQ.data]);

  useEffect(() => {
    if (stuffQ.data) setStuff(stuffQ.data);
  }, [stuffQ.data]);

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
