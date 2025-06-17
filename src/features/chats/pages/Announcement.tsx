// external import
import { useRecoilValue } from "recoil";

// internal import
import Chat from "./Chat";
import { userBasicAtom } from "@/recoil/atoms/userBasicAtom";
import { useChat } from "../hooks/useChat";

const Announcement = () => {
  const basicUser = useRecoilValue(userBasicAtom);
  const { chatMessages, handleSend, isError, isLoading } = useChat({
    conNameSpace: "announcement",
    conName: "announcement",
    emitEventName: "send_announcement",
    listenEventName: "new_announcement",
    conError: "announcement_error",
  });

  return (
    <Chat
      title="College Announcements"
      messages={chatMessages ?? []}
      canSend={["admin", "superadmin"].includes(basicUser?.role!)}
      onSend={handleSend}
      userId={basicUser?.id!}
      isError={isError}
      isLoading={isLoading}
    />
  );
};

export default Announcement;
