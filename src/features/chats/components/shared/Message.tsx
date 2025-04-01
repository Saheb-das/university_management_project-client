import MessageAvatar from "./MessageAvatar";

interface IMsg {
  id: string;
  role: string;
  content: string;
  createdAt: Date;
  user: {
    name: string;
    avatar: string;
  };
}

const Message = ({ m }: { m: IMsg }) => {
  const isMe = "user";
  return (
    <>
      {isMe !== m.role && <MessageAvatar msg={m} />}
      <div
        key={m.id}
        className={`flex ${
          m.role === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`max-w-[80%] px-4 py-2 rounded-lg ${
            m.role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          }`}
        >
          {m.content}
        </div>
      </div>
      {isMe === m.role && <MessageAvatar msg={m} />}
    </>
  );
};

export default Message;
