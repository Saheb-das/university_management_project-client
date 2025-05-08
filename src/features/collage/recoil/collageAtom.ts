// external import
import { atom } from "recoil";

// types import
import { TCollageRes } from "../types/collage";

export const collageAtom = atom<TCollageRes | null>({
  key: "collageAtom",
  default: null,
});
