import { atom } from "recoil";

export const avatarUrlAtom = atom<string | null>({
  key: "avatarUrlAtom",
  default: null,
});
