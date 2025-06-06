// external import
import { atom } from "recoil";

// types import
import { IAsignWithBatch } from "@/features/asign-teacher/types/asign-teacher";

export const asignsWithBatchAtom = atom<IAsignWithBatch[]>({
  key: "asignsWithBatchAtom",
  default: [],
});
