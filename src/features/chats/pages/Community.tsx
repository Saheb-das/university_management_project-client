// external import
import { useRecoilValue } from "recoil";

// internal import
import { userBasicAtom } from "@/recoil/atoms/userBasicAtom";
import { useChat } from "../hooks/useChat";
import Chat from "./Chat";

const Community = () => {
  const basicUser = useRecoilValue(userBasicAtom);

  const { chatMessages, handleSend, isError, isLoading } = useChat({
    conNameSpace: "community",
    conName: `community ${basicUser?.role!}`,
    listenEventName: "new_community",
    emitEventName: "send_community",
    conError: "community_error",
  });
  return (
    <Chat
      title={`${basicUser?.role!}'s community`}
      canSend={["teacher"].includes(basicUser?.role!)}
      messages={chatMessages ?? []}
      onSend={handleSend}
      userId={basicUser?.id!}
      isError={isError}
      isLoading={isLoading}
    />
  );
};

export default Community;
