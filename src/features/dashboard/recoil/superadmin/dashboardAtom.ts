// external import
import { atom } from "recoil";
import {
  TGrowthStatsRes,
  TPlacementDeptRes,
  TStudentDeptRes,
  TStuffStatsRes,
  TTeacherDeptRes,
} from "../../types/superadmin";

// atoms

export const studentStatsAtom = atom<TStudentDeptRes[]>({
  key: "studentStatsAtom",
  default: [],
});

export const teacherStatsAtom = atom<TTeacherDeptRes[]>({
  key: "teacherStatsAtom",
  default: [],
});

export const growthStatsAtom = atom<TGrowthStatsRes[]>({
  key: "growthStatsAtom",
  default: [],
});

export const placementStatsAtom = atom<TPlacementDeptRes[]>({
  key: "placementStatsAtom",
  default: [],
});

export const stuffStatsAtom = atom<TStuffStatsRes[]>({
  key: "stuffStatsAtom",
  default: [],
});
