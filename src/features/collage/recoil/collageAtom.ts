// external import
import { atom } from "recoil";

// types import
import { TCollage } from "../types/collage";

export const collageAtom = atom<TCollage | null>({
  key: "collageAtom",
  default: null,
});
