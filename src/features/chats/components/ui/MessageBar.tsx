import Message from "../shared/Message";

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

const MessageBar = ({ m }: { m: IMsg }) => {
  return (
    <div
      key={m.id}
      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex flex-row max-w-[80%] gap-2 ${
          m.role === "user" ? "items-end" : "items-start"
        }`}
      >
        <Message m={m} />
      </div>
    </div>
  );
};

export default MessageBar;
