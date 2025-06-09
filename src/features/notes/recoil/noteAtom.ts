// external import
import { atom } from "recoil";

// types import
import { INoteWithTeacherAndSubject } from "../types/note";

export const notesBySemAtom = atom<INoteWithTeacherAndSubject[]>({
  key: "notesBySemAtom",
  default: [],
});
