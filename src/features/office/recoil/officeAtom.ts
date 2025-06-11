import { atom } from "recoil";
import { IIdentityForm } from "../types/office";

export const formTitlesAtom = atom<string[]>({
  key: "formTitlesAtom",
  default: [],
});

export const dynamicFormsWithSchemaAtom = atom<IIdentityForm[]>({
  key: "dynamicFormsWithSchemaAtom",
  default: [],
});
