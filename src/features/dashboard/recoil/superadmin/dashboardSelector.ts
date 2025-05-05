// external import
import { selector } from "recoil";

// internal import
import {
  growthStatsAtom,
  placementStatsAtom,
  studentStatsAtom,
  stuffStatsAtom,
  teacherStatsAtom,
} from "./dashboardAtom";

export const formattedStudentStatsSelector = selector({
  key: "formattedStudentStatsSelector",
  get: ({ get }) => {
    const raw = get(studentStatsAtom);
    return raw.map((item) => ({
      department: item.departmentType,
      count: item.students,
    }));
  },
});

export const formattedTeacherStatsSelector = selector({
  key: "formattedTeacherStatsSelector",
  get: ({ get }) => {
    const raw = get(teacherStatsAtom);
    return raw.map((item) => ({
      department: item.departmentType,
      count: item.teachers,
    }));
  },
});

export const formattedGrowthStatsSelector = selector({
  key: "formattedGrowthStatsSelector",
  get: ({ get }) => {
    const raw = get(growthStatsAtom);
    return raw.map((item) => ({
      year: item.year,
      students: item._sum.students,
    }));
  },
});

export const formattedPlacementStatsSelector = selector({
  key: "formattedPlacementStatsSelector",
  get: ({ get }) => {
    const raw = get(placementStatsAtom);
    return raw.map((item) => ({
      department: item.departmentName,
      total: item.eligible,
      placed: item.placed,
    }));
  },
});

export const formattedStuffStatsSelector = selector({
  key: "formattedStuffStatsSelector",
  get: ({ get }) => {
    const raw = get(stuffStatsAtom);
    return raw.map((item) => ({
      [item.role]: item.count,
    }));
  },
});
