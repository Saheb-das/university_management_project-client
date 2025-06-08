// external import
import { useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";

// internal import
import {
  myProjectsAtom,
  myTeachersAtom,
  studentUserAtom,
  attendanceCountAtom,
  todayClassScheduleAtom,
  myEventsAtom,
} from "../recoil/student/dashboardAtom";
import { getAttendanceCountByStudentId } from "@/api/services/attendance";
import { getScheduleByBatchIdAndDaySemId } from "@/api/services/routine";
import { getAsignedTeachersByBatchAndSemIds } from "@/api/services/asign-teacher";
import { getUpcomingEvents } from "@/api/services/event";
import { getProjectsByUserId } from "@/api/services/project";

export const useStudentDashboard = () => {
  const studentInfo = useRecoilValue(studentUserAtom);

  useEffect(() => {}, [studentInfo]);

  // get all state atom
  const setAttendanceCountAtom = useSetRecoilState(attendanceCountAtom);
  const setMyClassSchedule = useSetRecoilState(todayClassScheduleAtom);
  const setMyTeachers = useSetRecoilState(myTeachersAtom);
  const setEvents = useSetRecoilState(myEventsAtom);
  const setMyProjects = useSetRecoilState(myProjectsAtom);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const day = days[today.getDay()];

  const userId = studentInfo?.profile?.user?.id || "";
  const studentId = studentInfo?.id || "";
  const batchId = studentInfo?.batchId || "";
  const curSemId =
    studentInfo?.currentSemester[0]?.semesterId || "cmb7ryzg00016ugxk2q2ctxyy";

  // fetch all data
  const queries = useQueries({
    queries: [
      {
        queryKey: ["atendance-students", studentId],
        queryFn: () =>
          getAttendanceCountByStudentId(studentId, {
            batchId: batchId,
            semId: curSemId,
          }),
        enabled: !!studentId && !!batchId && !!curSemId,
      },
      {
        queryKey: ["routine-shcedule-lectures"],
        queryFn: () =>
          getScheduleByBatchIdAndDaySemId(batchId, {
            day: "monday", //day.toLowerCase(),
            semId: curSemId,
          }),
        enabled: !!batchId && !!curSemId,
      },
      {
        queryKey: ["asigned-teachers", batchId, curSemId],
        queryFn: () => getAsignedTeachersByBatchAndSemIds(batchId, curSemId),
        enabled: !!batchId && !!curSemId,
      },
      {
        queryKey: ["upcoming-events"],
        queryFn: getUpcomingEvents,
      },
      {
        queryKey: ["my-projects"],
        queryFn: () => getProjectsByUserId({ user: userId }),
        enabled: !!userId,
      },
    ],
  });

  // all promise
  const [attendancesQ, lecturesQ, asignedTeahcersQ, eventsQ, projectsQ] =
    queries;

  /**
   * here data pass to selector and transform data and store it in atom
   */

  // attendance count
  useEffect(() => {
    if ((attendancesQ.isSuccess, attendancesQ.data)) {
      const { attendanceCount } = attendancesQ.data;
      setAttendanceCountAtom(attendanceCount);
    }
  }, [attendancesQ.isSuccess, attendancesQ.data]);

  // lectures of a schedule
  useEffect(() => {
    if ((lecturesQ.isSuccess, lecturesQ.data)) {
      const { schedule } = lecturesQ.data;
      setMyClassSchedule(schedule);
    }
  }, [lecturesQ.isSuccess, lecturesQ.data]);

  // asigned teachers
  useEffect(() => {
    if ((asignedTeahcersQ.isSuccess, asignedTeahcersQ.data)) {
      const { asignedTeachers } = asignedTeahcersQ.data;
      setMyTeachers(asignedTeachers);
    }
  }, [asignedTeahcersQ.isSuccess, asignedTeahcersQ.data]);

  // events
  useEffect(() => {
    if ((eventsQ.isSuccess, eventsQ.data)) {
      const { events } = eventsQ.data;
      setEvents(events);
    }
  }, [eventsQ.isSuccess, eventsQ.data]);

  useEffect(() => {
    if ((projectsQ.isSuccess, projectsQ.data)) {
      const { projects } = projectsQ.data;
      setMyProjects(projects);
    }
  }, [projectsQ.isSuccess, projectsQ.data]);

  // return loading
  return {
    loading: {
      attendance: attendancesQ.isLoading,
      scheduleLectures: lecturesQ.isLoading,
      myTeachers: asignedTeahcersQ.isLoading,
      event: eventsQ.isLoading,
      project: projectsQ.isLoading,
    },
    error: {
      attendance: attendancesQ.isError,
      scheduleLectures: lecturesQ.isError,
      myTeachers: asignedTeahcersQ.isError,
      event: eventsQ.isError,
      project: projectsQ.isError,
    },
  };
};
