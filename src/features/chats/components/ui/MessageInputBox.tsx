// external import
import { Send } from "lucide-react";

// internal import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onSubmit: () => void;
}

const MessageInputBox = ({ onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} className="flex w-full space-x-2">
      <Input
        // value={input}
        // onChange={handleInputChange}
        placeholder="Type your message..."
        className="flex-grow"
        // disabled={isLoading}
      />
      <Button
        type="submit"
        size="icon"
        // disabled={isLoading || !input.trim()}
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
};

export default MessageInputBox;
