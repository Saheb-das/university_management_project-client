// external import
import { useEffect, useRef } from "react";

// internal import
import Container from "@/components/shared/Container";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MessageInputBox from "../components/ui/MessageInputBox";
import MessageBar from "../components/ui/MessageBar";

// types import
import { IMessage } from "../types/chat";

type ChatProps = {
  title: string;
  messages: IMessage[];
  canSend: boolean;
  onSend: (content: string, conId: string) => void;
  userId: string;
  isLoading: boolean;
  isError: boolean;
};

const Chat = ({
  title,
  messages,
  canSend,
  onSend,
  isLoading,
  isError,
}: ChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <Container>
      <Card className=" mx-auto shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-center capitalize text-2xl">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[60vh] overflow-y-auto p-4">
          <div className="space-y-4">
            {isLoading ? (
              "Loading chats..."
            ) : isError ? (
              "something went wrong"
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                Send a message to start the conversation
              </div>
            ) : (
              messages.map((m) => <MessageBar key={m.id} m={m} />)
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 pb-0">
          <MessageInputBox canSend={canSend} onSend={onSend} />
        </CardFooter>
      </Card>
    </Container>
  );
};

export default Chat;
