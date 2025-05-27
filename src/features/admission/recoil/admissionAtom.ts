// external import
import { atom } from "recoil";

// types import
import { IAdmission } from "../types/admission";

export const admissionListAtom = atom<IAdmission[]>({
  key: "admissionListAtom",
  default: [],
});
