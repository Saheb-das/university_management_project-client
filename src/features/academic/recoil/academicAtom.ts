// external import
import { atom } from "recoil";

// types import
import { IResultWithDetails } from "@/features/result/types/result";

export const resultWithDetailsAtom = atom<IResultWithDetails[]>({
  key: "resultWithDetailsAtom",
  default: [],
});
