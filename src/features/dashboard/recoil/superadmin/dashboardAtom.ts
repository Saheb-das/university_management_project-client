// external import
import { atom } from "recoil";

// internal import
import {
  TGrowthStats,
  TPlacementDept,
  TStudentDept,
  TStuffStats,
  TTeacherDept,
} from "../../types/superadmin";

// atoms

export const studentStatsAtom = atom<TStudentDept[]>({
  key: "studentStatsAtom",
  default: [],
});

export const teacherStatsAtom = atom<TTeacherDept[]>({
  key: "teacherStatsAtom",
  default: [],
});

export const growthStatsAtom = atom<TGrowthStats[]>({
  key: "growthStatsAtom",
  default: [],
});

export const placementStatsAtom = atom<TPlacementDept[]>({
  key: "placementStatsAtom",
  default: [],
});

export const stuffStatsAtom = atom<TStuffStats[]>({
  key: "stuffStatsAtom",
  default: [],
});
