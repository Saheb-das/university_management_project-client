// external import
import { atom } from "recoil";

// types import
import { IConversation, IMessage } from "../types/chat";

export const allMessagesByConvName = atom<IMessage[]>({
  key: "allMessagesByConvName",
  default: [],
});

export const conversationDetailsAtom = atom<IConversation>({
  key: "conversationDetailsAtom",
  default: {} as IConversation,
});
