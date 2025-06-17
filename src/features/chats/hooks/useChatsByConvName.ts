// external import
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { allMessagesByConvName } from "../recoil/chatAtom";
import { getChatsByConvName } from "@/api/services/chat";

export const useChatsByConvName = (
  convName: string,
  lastMsgId?: string,
  limit?: string
) => {
  const setMessages = useSetRecoilState(allMessagesByConvName);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["chats", convName, lastMsgId, limit],
    queryFn: () => getChatsByConvName({ conName: convName, lastMsgId, limit }),
    enabled: !!convName,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setMessages(data.chats);
    }
  }, [isSuccess, data]);

  return {
    isLoading,
    isError,
  };
};
