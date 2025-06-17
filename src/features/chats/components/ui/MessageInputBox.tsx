// external import
import { Send } from "lucide-react";

// internal import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { conversationDetailsAtom } from "../../recoil/chatAtom";

interface Props {
  onSend: (content: string, conId: string) => void;
  canSend: boolean;
}

const MessageInputBox = ({ onSend, canSend }: Props) => {
  const con = useRecoilValue(conversationDetailsAtom);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    onSend(input.trim(), con.id);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full space-x-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow"
        // disabled={!canSend}
      />
      <Button type="submit" size="icon" disabled={!canSend || !input.trim()}>
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
};

export default MessageInputBox;
