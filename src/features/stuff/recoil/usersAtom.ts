import { atom } from "recoil";
import { IUser, IUserProfile } from "../types/stuff";

export const usersAtom = atom<IUser[] | []>({
  key: "usersAtom",
  default: [],
});

export const selectUserDetailsAtom = atom<IUserProfile>({
  key: "selectUserDetailsAtom",
  default: undefined,
});
