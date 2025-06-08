// external import
import { atom } from "recoil";

// types import
import { IProject, IStudentWithAcademicDetails } from "../../types/student";
import { IAttendCount } from "@/features/attendance/types/attendance";
import { IGetSchedule } from "@/features/routine/types/routine";
import { ITeachersWithSub } from "@/features/asign-teacher/types/asign-teacher";
import { IEvent } from "@/features/activities/types/activity";

export const studentUserAtom = atom<IStudentWithAcademicDetails>({
  key: "studentUserAtom",
  default: undefined,
});

export const attendanceCountAtom = atom<IAttendCount>({
  key: "attendanceCountAtom",
  default: undefined,
});

export const todayClassScheduleAtom = atom<IGetSchedule>({
  key: "todayClassScheduleAtom",
  default: undefined,
});

export const myTeachersAtom = atom<ITeachersWithSub[]>({
  key: "myTeachersAtom",
  default: [],
});

export const myEventsAtom = atom<IEvent[]>({
  key: "myEventsAtom",
  default: [],
});

export const myProjectsAtom = atom<IProject[]>({
  key: "myProjectsAtom",
  default: undefined,
});
