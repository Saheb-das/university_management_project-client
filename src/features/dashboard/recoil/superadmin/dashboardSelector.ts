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

    if (raw.length <= 0) {
      return [
        {
          department: "no department",
          count: 0,
        },
      ];
    }

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

    if (raw.length <= 0) {
      return [
        {
          department: "no department",
          count: 0,
        },
      ];
    }

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

    if (raw.length <= 0) {
      return [
        {
          year: 0,
          students: 0,
        },
      ];
    }

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

    if (raw.length <= 0) {
      return [
        {
          department: "no department",
          total: 0,
          placed: 0,
        },
      ];
    }

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

    if (!raw || raw.length <= 0) {
      return [{ stuff: 0 }];
    }

    return raw.map((item) => ({
      [item.role]: item.count,
    }));
  },
});
