// internal import
import MessageAvatar from "./MessageAvatar";

// types import
import { IMessage } from "../../types/chat";

const Message = ({ m, userId }: { m: IMessage; userId: string }) => {
  const isMe = userId;
  return (
    <>
      {isMe !== m.senderId && <MessageAvatar m={m} />}
      <div
        key={m.id}
        className={`flex ${
          m.senderId === userId ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={` px-4 py-2 rounded-lg ${
            m.senderId === userId
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          }`}
        >
          {m.content}
        </div>
      </div>
      {isMe === m.senderId && <MessageAvatar m={m} />}
    </>
  );
};

export default Message;
