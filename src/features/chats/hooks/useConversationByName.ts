// external import
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { conversationDetailsAtom } from "../recoil/chatAtom";
import { getConversationByConName } from "@/api/services/chat";

export const useConversationByName = (conName: string) => {
  const setCon = useSetRecoilState(conversationDetailsAtom);

  const { data, isSuccess } = useQuery({
    queryKey: ["chats-con", conName],
    queryFn: () => getConversationByConName({ conName }),
    enabled: !!conName,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setCon(data.conversation);
    }
  }, [data, isSuccess]);
};
