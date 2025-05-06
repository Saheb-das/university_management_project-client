// external import
import { atom } from "recoil";

// types import
import { TTranRes, TTransRes } from "@/types/transaction";

export const salariesTransAtom = atom<TTransRes[]>({
  key: "salariesTransAtom",
  default: [],
});

export const salaryTransAtom = atom<TTranRes | null>({
  key: "salaryTransAtom",
  default: null,
});
