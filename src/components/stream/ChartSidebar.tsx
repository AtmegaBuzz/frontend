// ChatSidebar.tsx
import { useState, useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  isAI: boolean;
  isCurrentUser?: boolean;
}

interface ChatSidebarProps {
  messages: Message[];
  viewerCount: number;
  onSendMessage: (message: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ messages, viewerCount, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [shouldAutoScroll, setShouldAutoScroll] = useState<boolean>(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Check if user is near bottom of chat
  const isNearBottom = (): boolean => {
    if (!chatContainerRef.current) return false;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    // Consider "near bottom" if within 100px of the bottom
    const scrollThreshold = 100;
    return scrollHeight - scrollTop - clientHeight < scrollThreshold;
  };

  // Handle scroll events to determine if auto-scroll should happen
  const handleScroll = (): void => {
    if (chatContainerRef.current) {
      setShouldAutoScroll(isNearBottom());
    }
  };

  // Auto-scroll to bottom of chat only when appropriate
  useEffect(() => {
    if (shouldAutoScroll && chatContainerRef.current) {
      // Only scroll the chat container itself, not the entire page
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, shouldAutoScroll]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="bg-gray-800 border-l border-gray-700 flex flex-col h-[calc(100vh-5rem)] sticky top-20">
      <div className="p-4 border-b border-gray-700 text-white font-bold flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} />
          <span>Live Chat</span>
        </div>
        <div className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
          {viewerCount} active
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-auto p-4 flex flex-col gap-3 bg-gray-900"
        onScroll={handleScroll}
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>

      {/* Message input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-700 bg-gray-800"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Join the conversation..."
            className="flex-1 p-2 rounded-lg border-none bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-[#e42c7f] text-white px-4 rounded-lg font-bold transition-colors duration-200"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

interface ChatMessageProps {
  message: Message;
}

// ChatMessage component for cleaner code
const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { user, timestamp, text, isAI, isCurrentUser } = message;
  console.log(user,isAI)
  const getMessageStyle = (): string => {
    if (user === "System") {
      return "bg-gray-800/50 border-l-4 border-gray-500 text-gray-400";
    } else if (isAI) {
      return "bg-primary/20 border-l-4 border-primary";
    } else if (isCurrentUser) {
      return "bg-blue-900/30 border-l-4 border-blue-500";
    } else {
      return "bg-gray-800/80 border-l-4 border-gray-600";
    }
  };

  const getUsernameStyle = (): string => {
    if (user === "System") {
      return "text-gray-400";
    } else if (isAI) {
      return "text-primary";
    } else if (isCurrentUser) {
      return "text-blue-400";
    } else {
      return "text-gray-300";
    }
  };

  return (
    <div className={`flex flex-col p-3 rounded-lg ${getMessageStyle()}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={`font-bold ${getUsernameStyle()}`}>
          {user.slice(0, 7)}
          ...
          {user.slice(-4)}
        </span>
        <span className="text-xs text-gray-500">
          {timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <div className="text-white">{text}</div>
    </div>
  );
};

export default ChatSidebar;