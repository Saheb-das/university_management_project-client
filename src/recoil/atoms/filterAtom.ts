import { atom } from "recoil";
import { IFilterDeptWithDeg } from "../types/filter";

export const departmentsWithDegreesAtom = atom<IFilterDeptWithDeg[]>({
  key: "departmentsWithDegreesAtom",
  default: [],
});
