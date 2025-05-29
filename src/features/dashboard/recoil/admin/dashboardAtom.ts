// external import
import { atom } from "recoil";

// types import
import { TGrowthStats } from "../../types/superadmin";
import { IRevenue } from "../../types/admin";

export const studentsGrowthAtom = atom<TGrowthStats[]>({
  key: "studentsGrowthAtom",
  default: [],
});

export const collageRevenueByRangeAtom = atom<IRevenue[]>({
  key: "collageRevenueByRangeAtom",
  default: [],
});
