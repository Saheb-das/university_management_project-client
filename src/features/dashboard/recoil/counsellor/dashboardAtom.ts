// external import
import { atom } from "recoil";

// types import
import {
  IAdmitsAndCommissions,
  IPrevFiveYearsStats,
  IToppers,
} from "../../types/counsellor";

export const totalAdmitsAndcommissionsAtom = atom<IAdmitsAndCommissions>({
  key: "totalAdmitsAndCommissionsAtom",
  default: undefined,
});

export const lastFiveYearsStatsAtom = atom<IPrevFiveYearsStats[] | []>({
  key: "lastFiveYearsStatsAtom",
  default: [],
});

export const prevTopThreeAtom = atom<IToppers[] | []>({
  key: "prevTopThreeAtom",
  default: [],
});
