import { atom } from "recoil";
import { IAsignTeacherUser } from "../types/asign-teacher";

export const asignTeacherUsersAtom = atom<IAsignTeacherUser[] | []>({
  key: "asignTeacherUsers",
  default: [],
});
