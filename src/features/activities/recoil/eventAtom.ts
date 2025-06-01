// external import
import { atom } from "recoil";

// types import
import { IEvent } from "../types/activity";

export const eventsAtom = atom<IEvent[]>({
  key: "eventsAtom",
  default: [],
});
