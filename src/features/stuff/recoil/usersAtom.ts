import { atom } from "recoil";
import { IUser, IUserProfile } from "../types/stuff";

export const usersAtom = atom<IUser[] | []>({
  key: "usersAtom",
  default: [],
});

export const selectUserDetailsAtom = atom<IUserProfile | undefined>({
  key: "selectUserDetailsAtom",
  default: undefined,
});
