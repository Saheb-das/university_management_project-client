// external import
import { atom } from "recoil";

// types import
import { TUser } from "../../types/profile";

export const completeProfileAtom = atom<TUser | null>({
  key: "completeProfileAtom",
  default: null,
});
