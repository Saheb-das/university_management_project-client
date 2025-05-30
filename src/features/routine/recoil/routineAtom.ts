// external import
import { atom } from "recoil";

// types import
import { IGetSchedule, ISubject } from "../types/routine";

export const subjectsAtom = atom<ISubject[]>({
  key: "subjectsAtom",
  default: [],
});

export const routineScheduleAtom = atom<IGetSchedule[]>({
  key: "routineScheduleAtom",
  default: [],
});
