// external import
import { userBasicAtom } from "@/recoil/atoms/userBasicAtom";

// internal import
import Chat from "./Chat";
import { useRecoilValue } from "recoil";
import { useChat } from "../hooks/useChat";

const Dropbox = () => {
  const basicUser = useRecoilValue(userBasicAtom);

  const { chatMessages, handleSend, isError, isLoading } = useChat({
    conNameSpace: "dropbox",
    conName: "dropbox",
    emitEventName: "send_dropbox",
    listenEventName: "new_dropbox",
    conError: "dropbox_error",
  });
  return (
    <Chat
      title="College dropbox"
      messages={chatMessages ?? []}
      canSend={[
        "admin",
        "superadmin",
        "teacher",
        "examceller",
        "accountant",
        "counsellor",
        "student",
      ].includes(basicUser?.role!)}
      onSend={handleSend}
      isError={isError}
      isLoading={isLoading}
      userId={basicUser?.id!}
    />
  );
};

export default Dropbox;
