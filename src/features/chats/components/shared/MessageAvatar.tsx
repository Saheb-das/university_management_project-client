import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

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

const MessageAvatar = ({ msg }: { msg: IMsg }) => {
  return (
    <Avatar className="h-8 w-8 shrink-0 border mt-1">
      <AvatarImage src={msg.user.avatar} alt={msg.user.name} />
      <AvatarFallback>{msg.user.name.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};

export default MessageAvatar;
