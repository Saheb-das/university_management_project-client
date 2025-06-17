// external import
import { useRecoilValue } from "recoil";
import { userBasicAtom } from "@/recoil/atoms/userBasicAtom";

// internal import
import Message from "../shared/Message";

// types import
import { IMessage } from "../../types/chat";

const MessageBar = ({ m }: { m: IMessage }) => {
  const basicUser = useRecoilValue(userBasicAtom);
  return (
    <div
      key={m.id}
      className={`flex ${
        m.senderId === basicUser?.id ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex flex-row max-w-[80%] gap-2 ${
          m.senderId === basicUser?.id ? "items-end" : "items-start"
        }`}
      >
        <Message userId={basicUser?.id!} m={m} />
      </div>
    </div>
  );
};

export default MessageBar;
