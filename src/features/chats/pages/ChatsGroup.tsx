// external import
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

// internal import
import Chat from "./Chat";
import { useChat } from "../hooks/useChat";
import { userBasicAtom } from "@/recoil/atoms/userBasicAtom";
import { useBatchesByTeacherUserId } from "@/hooks/useBatchesByTeacherUserId";

// types import
import { IAsignWithBatch } from "@/features/asign-teacher/types/asign-teacher";
import Container from "@/components/shared/Container";

const ChatsGroup = () => {
  const [asignedBatches, setAsignedBatches] = useState<IAsignWithBatch[]>([]);
  const [selBatch, setSelBatch] = useState("");

  const basicUser = useRecoilValue(userBasicAtom);
  const { data: batchData, isSuccess: isBatchSuccess } =
    useBatchesByTeacherUserId(basicUser?.id!);

  const uniqueBatches = [
    ...new Set(asignedBatches?.map((item) => item.batch.name)),
  ];

  const { chatMessages, handleSend, isError, isLoading } = useChat({
    conNameSpace: "classroom",
    conName: `classroom ${selBatch}`,
    listenEventName: "new_classroom",
    emitEventName: "send_classroom",
    conError: "classroom_error",
  });

  useEffect(() => {
    if (isBatchSuccess && batchData) {
      setAsignedBatches(batchData.batches);
    }
  }, [batchData, isBatchSuccess]);
  return (
    <Container>
      <div className="grid grid-cols-12 gap-2">
        {asignedBatches && asignedBatches.length > 0 ? (
          <>
            <div className="col-span-2">
              <div className="mt-10">
                {uniqueBatches.map((item) => (
                  <div
                    key={item}
                    className={`font-semibold cursor-pointer mb-5 ${
                      item === selBatch ? "text-blue-600" : "text-primary"
                    } `}
                    onClick={() => setSelBatch(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="  col-span-10">
              {selBatch ? (
                <Chat
                  title={selBatch}
                  canSend={["teacher"].includes(basicUser?.role!)}
                  messages={chatMessages}
                  onSend={handleSend}
                  userId={basicUser?.id!}
                  isError={isError}
                  isLoading={isLoading}
                />
              ) : (
                <p className="">click to open chat</p>
              )}
            </div>
          </>
        ) : (
          <p>there are no batches</p>
        )}
      </div>
    </Container>
  );
};

export default ChatsGroup;
