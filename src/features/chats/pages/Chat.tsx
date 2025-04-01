import Container from "@/components/shared/Container";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import MessageInputBox from "../components/ui/MessageInputBox";
import TypingAnimation from "../components/ui/TypingAnimation";
import MessageBar from "../components/ui/MessageBar";

const dummyMessages = [
  {
    id: "1",
    role: "user",
    content: "Hello! How are you today?",
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "2",
    role: "assistant",
    content: "I'm doing well, thank you for asking! How can I help you today?",
    createdAt: new Date(Date.now() - 3590000), // 59 minutes 50 seconds ago
    user: {
      name: "AI Assistant",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "3",
    role: "user",
    content: "I'm working on a project and need some advice about React hooks.",
    createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "4",
    role: "assistant",
    content:
      "React hooks are a great way to add state and lifecycle features to functional components. What specific aspect of hooks are you curious about? useState, useEffect, useContext, or something else?",
    createdAt: new Date(Date.now() - 1790000), // 29 minutes 50 seconds ago
    user: {
      name: "AI Assistant",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "5",
    role: "user",
    content: "I'm having trouble with useEffect and cleanup functions.",
    createdAt: new Date(Date.now() - 900000), // 15 minutes ago
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "6",
    role: "assistant",
    content:
      "Cleanup functions in useEffect are important for preventing memory leaks and unexpected behavior. They run before the component unmounts or before the effect runs again.\n\nHere's an example:\n\n```jsx\nuseEffect(() => {\n  // Setup code (runs after render)\n  const subscription = someAPI.subscribe();\n  \n  // Cleanup function (runs before unmount)\n  return () => {\n    subscription.unsubscribe();\n  };\n}, [dependency]);\n```\n\nCommon use cases include:\n- Clearing timers (clearTimeout, clearInterval)\n- Removing event listeners\n- Cancelling network requests\n- Unsubscribing from external subscriptions",
    createdAt: new Date(Date.now() - 890000), // 14 minutes 50 seconds ago
    user: {
      name: "AI Assistant",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "7",
    role: "user",
    content: "That makes sense! What about optimizing re-renders?",
    createdAt: new Date(Date.now() - 300000), // 5 minutes ago
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "8",
    role: "assistant",
    content:
      "For optimizing re-renders in React, you have several options:\n\n1. **useMemo** - Memoize expensive calculations\n2. **useCallback** - Memoize function references\n3. **React.memo** - Skip re-rendering when props haven't changed\n4. **Proper dependency arrays** - Only re-run effects when necessary\n\nWhich would you like me to explain in more detail?",
    createdAt: new Date(Date.now() - 290000), // 4 minutes 50 seconds ago
    user: {
      name: "AI Assistant",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
];

type ChatType = "announcement" | "community" | "dropbox" | "classgroup";

const Chat = ({ chatType }: { chatType: ChatType }) => {
  // Initialize with dummy data
  //   const {
  //     messages,
  //     input,
  //     handleInputChange,
  //     handleSubmit,
  //     isLoading,
  //     setMessages,
  //   } = useChat();

  const [messages, setMessages] = useState(dummyMessages);
  const [isLoading, setIsLoading] = useState();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add dummy data on component mount

  function handleSubmit(): void {
    throw new Error("Function not implemented.");
  }

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
          <CardTitle className="text-center text-2xl">
            {chatType && "Chat Interface"}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[60vh] overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                Send a message to start the conversation
              </div>
            ) : (
              messages.map((m) => <MessageBar m={m} />)
            )}
            {isLoading && <TypingAnimation />}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 pb-0">
          <MessageInputBox onSubmit={handleSubmit} />
        </CardFooter>
      </Card>
    </Container>
  );
};

export default Chat;
