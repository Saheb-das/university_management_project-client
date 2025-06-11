// external import
import { atom, AtomEffect } from "recoil";

// types import
import { TBasicUser } from "../types/user";
import { TRole } from "@/zod/auth";
import { getStorage } from "@/utils/localStorage";

const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = getStorage(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const userBasicAtom = atom<TBasicUser | null>({
  key: "userBasicAtom",
  default: {
    id: "",
    role: "" as TRole,
    name: "",
    email: "",
    collageId: "",
  },
  effects: [localStorageEffect("basicUser")],
});
