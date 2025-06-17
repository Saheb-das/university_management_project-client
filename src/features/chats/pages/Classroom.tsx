import { useRecoilValue } from "recoil";
import { useChat } from "../hooks/useChat";
import Chat from "./Chat";
import { studentUserAtom } from "@/features/dashboard/recoil/student/dashboardAtom";

const Classroom = () => {
  const studentInfo = useRecoilValue(studentUserAtom);
  const { chatMessages, handleSend, isError, isLoading } = useChat({
    conNameSpace: "classroom",
    conName: `classroom ${studentInfo?.batch?.name}`,
    emitEventName: "send_classroom",
    listenEventName: "new_classroom",
    conError: "classroom_error",
  });
  return (
    <Chat
      title={`classroom - ${studentInfo?.batch?.name}`}
      messages={chatMessages ?? []}
      canSend={["student"].includes(studentInfo?.profile?.user?.role)}
      onSend={handleSend}
      userId={studentInfo?.profile?.user?.id}
      isError={isError}
      isLoading={isLoading}
    />
  );
};

export default Classroom;
