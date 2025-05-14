import { atom } from "recoil";
import { TDeprtWithDeg } from "../types/department";

export const departmentsAtom = atom<TDeprtWithDeg[]>({
  key: "departmentsAtom",
  default: [],
});
