// external import
import { atom } from "recoil";

// types import
import { IUser } from "@/features/stuff/types/stuff";

export const usersByRoleAtom = atom<IUser[]>({
  key: "usersByRoleAtom",
  default: [],
});
