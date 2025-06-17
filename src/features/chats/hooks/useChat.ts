import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { allMessagesByConvName } from "../recoil/chatAtom";
import { Socket } from "socket.io-client";
import { useConversationByName } from "./useConversationByName";
import { useChatsByConvName } from "./useChatsByConvName";
import { getAuthToken } from "@/utils/localStorage";
import { createSocket } from "@/socket";
import { IMessage } from "../types/chat";

interface ChatProps {
  conNameSpace: string;
  conName: string;
  emitEventName: string;
  listenEventName: string;
  conError: string;
}
export const useChat = ({
  conNameSpace,
  conName,
  emitEventName,
  listenEventName,
  conError,
}: ChatProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useRecoilState(allMessagesByConvName);

  useConversationByName(conName);
  const { isLoading, isError } = useChatsByConvName(conName);

  const authToken = getAuthToken();

  useEffect(() => {
    if (!authToken) return;

    const sock = createSocket(`/${conNameSpace}`, authToken);
    setSocket(sock);

    sock.on("connect", () => {
      console.log(`Connected to /${conNameSpace}`);
    });

    sock.on(listenEventName, (msg: IMessage) => {
      setMessages((prev) => [msg, ...prev]);
    });

    sock.on(conError, (err) => {
      console.error("Socket error:", err);
    });

    return () => {
      sock.disconnect();
    };
  }, [authToken]);

  const handleSend = (content: string, conId: string) => {
    if (!socket) return;

    socket.emit(emitEventName, {
      content,
      conId,
    });
  };

  const chatMessages = [...messages].reverse();

  return {
    chatMessages,
    handleSend,
    isError,
    isLoading,
  };
};
