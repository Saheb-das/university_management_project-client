// internal import
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// types import
import { IMessage } from "../../types/chat";

const MessageAvatar = ({ m }: { m: IMessage }) => {
  return (
    <Avatar className="h-8 w-8 shrink-0 border mt-1">
      <AvatarImage
        src={m?.sender?.profile?.avatar || ""}
        alt={m?.sender?.firstName || ""}
      />
      <AvatarFallback>{m?.sender?.firstName?.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};

export default MessageAvatar;
