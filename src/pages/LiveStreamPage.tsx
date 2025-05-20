// LiveStreamPage.tsx
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "../hooks/toast";
import { getToken } from "../apis/token";
import { AIToken, Message } from "../components/stream/types";
import StreamPlayer from "../components/stream/StreamPlayer";
import TokenInfoCard from "../components/stream/TokenInfoCard";
import ChatSidebar from "@/components/stream/ChartSidebar";
import AgentModal from "../components/stream/AgentModal";
import {
  initializeSocketConnection,
  subscribeToStream,
  sendMessage as socketSendMessage,
  likeStream as socketLikeStream,
  disconnectSocket,
} from "../components/stream/socketConnection";
import { Socket } from "socket.io-client";
import { usePrivy } from "@privy-io/react-auth";
import TokenPriceChart from "../components/PriceChart";
import { BuyModal } from "../components/TransactionModal";

const LiveStreamPage: React.FC = () => {
  const { tokenId } = useParams<{ tokenId: string }>();
  const [tokenInfo, setTokenInfo] = useState<AIToken | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAgentModal, setShowAgentModal] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [viewerCount, setViewerCount] = useState<number>(0);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [showEvent,] = useState<boolean>(false);
  const [isLive, setIsLive] = useState<boolean>(true);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const socketRef = useRef<Socket | null>(null);
  const { toast } = useToast();
  const [buyModalVisible, setBuyModalVisible] = useState<boolean>();

  const handleBuy = {};
  const { user } = usePrivy();

  // Initialize socket connection once (not dependent on tokenInfo)
  useEffect(() => {
    try {
      socketRef.current = initializeSocketConnection();
      const socket = socketRef.current;

      // Set up event handlers for socket connection status
      socket.on("connect", () => {
        console.log("Socket connected successfully");
        setSocketConnected(true);

        // Subscribe to stream if tokenId is available
        if (tokenId) {
          subscribeToStream(tokenId, (response) => {
            if (!response.success) {
              console.warn(
                `Failed to subscribe to stream: ${response.message}`
              );
            }
          });
        }
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
        setSocketConnected(false);
      });

      // Clean up on component unmount
      return () => {
        disconnectSocket();
      };
    } catch (error) {
      console.error("Error setting up socket connection:", error);
      setSocketConnected(false);
    }
  }, []);

  // Set up message and viewer count handlers once tokenInfo is available
  useEffect(() => {
    if (!tokenInfo) return;

    // Handle incoming messages
    const handleNewMessage = (data: { streamId: string; message: Message }) => {
      console.log(data, "====");
      const newMessage: Message = {
        id: `socket-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        user: data.message.user,
        text: data.message.text,
        timestamp: new Date(data.message.timestamp),
        isAI: data.message.user === tokenInfo?.agentDisplay?.agentName,
        isCurrentUser: false,
      };
      setMessages((prev) => [...prev, newMessage]);
    };

    // Handle stream history
    // const handleStreamHistory = (data: {
    //   streamId: string;
    //   messages: Array<{
    //     id?: string;
    //     username: string;
    //     message: string;
    //     timestamp: string;
    //   }>;
    // }) => {
    //   const historyMessages: Message[] = data.messages.map((msg) => ({
    //     id: `history-${msg.id || Date.now() + Math.random()}`,
    //     user: msg.username,
    //     text: msg.message,
    //     timestamp: new Date(msg.timestamp),
    //     isAI: msg.username === tokenInfo?.agentDisplay?.agentName,
    //     isCurrentUser: false,
    //   }));

    //   if (historyMessages.length > 0) {
    //     setMessages((prev) => {
    //       // Only add history messages if they don't already exist
    //       const existingIds = new Set(prev.map((msg) => msg.id));
    //       const newHistoryMessages = historyMessages.filter(
    //         (msg) => !existingIds.has(msg.id)
    //       );
    //       return [...prev, ...newHistoryMessages];
    //     });
    //   }
    // };

    // // Handle viewer count updates
    // const handleViewerCount = (count: number) => {
    //   setViewerCount(count);
    // };

    // Register event handlers using our custom function
    // onEvent("newMessage", handleNewMessage);
    // onEvent("streamHistory", handleStreamHistory);
    // onEvent("viewerCount", handleViewerCount);

    // Standard socket.io event registration (as backup)
    if (socketRef.current) {
      socketRef.current.on("newMessage", handleNewMessage);
      // socketRef.current.on("streamHistory", handleStreamHistory);
      // socketRef.current.on("viewerCount", handleViewerCount);

      // Cleanup on unmount
      return () => {
        if (socketRef.current) {
          socketRef.current.off("newMessage", handleNewMessage);
          // socketRef.current.off("streamHistory", handleStreamHistory);
          // socketRef.current.off("viewerCount", handleViewerCount);
        }
      };
    }
  }, [tokenInfo]);

  // Simulate random viewer count fluctuations (can remove once socket provides real data)
  useEffect(() => {
    const initialCount = Math.floor(Math.random() * 200) + 50;
    setViewerCount(initialCount);

    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
      setViewerCount((prevCount) =>
        Math.max(initialCount - 20, prevCount + change)
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Initialize like count
  useEffect(() => {
    setLikeCount(Math.floor(Math.random() * 500) + 100);
  }, []);

  // Fetch token information
  useEffect(() => {
    const fetchTokenInfo = async (): Promise<void> => {
      if (!tokenId) return;

      setIsLoading(true);

      try {
        const { message, statusCode } = await getToken(parseInt(tokenId));

        if (statusCode !== 200) {
          toast({
            type: "danger",
            message: "Couldn't load token data",
            duration: 3000,
          });
          setIsLoading(false);
          return;
        }

        // Enhanced token data with market info
        const enhancedTokenInfo: AIToken = {
          ...(message as AIToken),
          price: 0.0000123,
          marketCap: 123456789,
          holders: 54321,
          chain: "Ethereum",
          launchDate: "2023-04-15",
          allTimeHigh: 0.0000189,
          allTimeHighDate: "2023-07-12",
          
        };

        setTimeout(() => {
          setTokenInfo(enhancedTokenInfo);
          setIsLoading(false);

          // Add initial system message
          const systemMessage: Message = {
            id: "system-welcome",
            user: "System",
            text: `Welcome to the ${
              enhancedTokenInfo.tokenName
            } live stream! Chat with other viewers and interact with ${
              enhancedTokenInfo.agentDisplay?.agentName || "the AI agent"
            }.`,
            timestamp: new Date(),
            isAI: false,
          };

          // Add initial AI greeting
          const initialMessage: Message = {
            id: "initial",
            user: enhancedTokenInfo.agentDisplay?.agentName || "AI Agent",
            text: `Hey everyone! It's ${
              enhancedTokenInfo.agentDisplay?.agentName || "your AI agent"
            } here, the face of ${
              enhancedTokenInfo.tokenName
            }! Ask me anything about the token or just chat with me. I'm feeling ribbit-ing today! 🐸`,
            timestamp: new Date(),
            isAI: true,
          };

          // Add connection status message
          const connectionMessage: Message = {
            id: "connection-status",
            user: "System",
            text: socketConnected
              ? "Connected to chat server successfully."
              : "Unable to connect to chat server. Using offline mode.",
            timestamp: new Date(),
            isAI: false,
          };

          setMessages([systemMessage, connectionMessage, initialMessage]);
        }, 1500);
      } catch (error) {
        console.error("Error fetching token:", error);
        toast({
          type: "danger",
          message: "Error loading token data",
          duration: 3000,
        });
        setIsLoading(false);
      }
    };

    fetchTokenInfo();
  }, [tokenId, toast, socketConnected]);

  // Handle chat message submission
  const handleSendMessage = (newMessage: string): void => {
    if (!newMessage.trim() || !tokenInfo) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      user: user?.wallet?.address!,
      text: newMessage,
      timestamp: new Date(),
      isAI: false,
      profile_pic: "",
      isCurrentUser: true,
    };

    // Send message via socket if connected
    if (socketConnected && tokenId) {
      socketSendMessage(tokenId, userMessage);
    } else {
      console.log(
        "Socket not connected, message will only be displayed locally"
      );
    }

    // Always simulate AI response in case server doesn't respond
    // simulateAIResponse(newMessage);
  };

  // AI response simulation (for offline mode or server issues)
  // const simulateAIResponse = (userMessage: string): void => {
  //   if (!tokenInfo) return;

  //   const lowerCaseMessage = userMessage.toLowerCase();
  //   const aiShouldRespond =
  //     lowerCaseMessage.includes(tokenInfo.tokenName.toLowerCase()) ||
  //     lowerCaseMessage.includes(tokenInfo.symbol.toLowerCase()) ||
  //     (tokenInfo.agentDisplay?.agentName &&
  //       lowerCaseMessage.includes(
  //         tokenInfo.agentDisplay.agentName.toLowerCase()
  //       )) ||
  //     lowerCaseMessage.includes("?");

  //   if (aiShouldRespond) {
  //     setTimeout(() => {
  //       let aiResponse = "";
  //       const agentName = tokenInfo.agentDisplay?.agentName || "AI Agent";

  //       // Generate contextual responses based on user input
  //       if (
  //         lowerCaseMessage.includes("price") ||
  //         lowerCaseMessage.includes("worth")
  //       ) {
  //         aiResponse = `${
  //           tokenInfo.tokenName
  //         } is currently trading at ${tokenInfo.price?.toFixed(
  //           8
  //         )}. We've seen some nice growth lately! 📈`;
  //       } else if (
  //         lowerCaseMessage.includes("buy") ||
  //         lowerCaseMessage.includes("purchase")
  //       ) {
  //         aiResponse = `Want to buy some ${
  //           tokenInfo.symbol
  //         }? You can get it on major DEXes like Uniswap or PancakeSwap. Make sure you're using the correct contract address: ${tokenInfo.contractAddress?.slice(
  //           0,
  //           6
  //         )}...${tokenInfo.contractAddress?.slice(-4)}`;
  //       } else if (
  //         lowerCaseMessage.includes("roadmap") ||
  //         lowerCaseMessage.includes("future")
  //       ) {
  //         aiResponse = `Our roadmap includes exchange listings, partnerships, and new utilities. The team is working hard behind the scenes! Stay tuned for big announcements soon! 🚀`;
  //       } else if (
  //         lowerCaseMessage.includes("team") ||
  //         lowerCaseMessage.includes("developer")
  //       ) {
  //         aiResponse = `Our team is a dedicated group of blockchain enthusiasts and meme lovers. While they prefer to remain anonymous, they're constantly working to improve the project!`;
  //       } else if (
  //         lowerCaseMessage.includes("hello") ||
  //         lowerCaseMessage.includes("hi") ||
  //         lowerCaseMessage.includes("hey")
  //       ) {
  //         aiResponse = `Hey there! Great to see you in the stream. How's your day going? Enjoying the ${tokenInfo.symbol} journey?`;
  //       } else if (
  //         lowerCaseMessage.includes("creator") ||
  //         lowerCaseMessage.includes("who made")
  //       ) {
  //         aiResponse = `${tokenInfo.tokenName} was created by ${
  //           tokenInfo.user.username
  //         }, who's been in the crypto space since ${tokenInfo.user.createdAt.getFullYear()}. They've built a great community around this project!`;
  //       } else if (
  //         lowerCaseMessage.includes("agent") ||
  //         lowerCaseMessage.includes("ai")
  //       ) {
  //         aiResponse = `I'm ${agentName}, the official AI representative for ${tokenInfo.tokenName}. I was trained to help the community and spread the word about our amazing project!`;
  //       } else if (
  //         lowerCaseMessage.includes("socket") ||
  //         lowerCaseMessage.includes("connect") ||
  //         lowerCaseMessage.includes("offline")
  //       ) {
  //         aiResponse = socketConnected
  //           ? `We're currently connected to the chat server! Everything is working properly.`
  //           : `We seem to be having connection issues with the chat server. The team is working to resolve this. In the meantime, I'm still here to chat with you!`;
  //       } else {
  //         // Default random responses array
  //         const aiResponses = [
  //           "Feeling bullish today! Our community is growing stronger every day! 🚀",
  //           "Have you checked our latest updates? Big things coming soon!",
  //           "To the moon! 🌕 That's where we're headed!",
  //           "HODL tight, friends! Diamond hands win in the long run! 💎🙌",
  //           "Our roadmap is packed with exciting developments. Stay tuned!",
  //           "Thanks for being part of this amazing journey!",
  //           "Remember when we were just starting? Look how far we've come!",
  //           "Community is everything. You're what makes this project special!",
  //           "Thinking about hosting a special giveaway soon... what do you think?",
  //           "Just saw some whale movement. Interesting times ahead! 🐋",
  //         ];

  //         // Default random response
  //         aiResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
  //       }

  //       const aiMessage: Message = {
  //         id: `ai-${Date.now()}`,
  //         user: tokenInfo.agentDisplay?.agentName || "AI Agent",
  //         text: aiResponse,
  //         timestamp: new Date(),
  //         isAI: true,
  //       };

  //       setMessages((prev) => [...prev, aiMessage]);
  //     }, 1500);
  //   }
  // };

  // Handle stream likes
  const handleLike = (): void => {
    if (!tokenId) return;

    if (!hasLiked) {
      setLikeCount((prev) => prev + 1);
      setHasLiked(true);

      // Emit like event via socket if connected
      if (socketConnected) {
        socketLikeStream(tokenId);
      }
    } else {
      setLikeCount((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  // Simulate periodic special events
  // useEffect(() => {
  //   if (!tokenInfo) return;

  //   // Other users' messages simulation (only if not connected to real server)
  //   const userNames = [
  //     "CryptoWhale", "MoonHodler", "DiamondHands", "TokenFarmer",
  //     "ChainMaster", "DeFiKing", "CoinCollector", "BlockchainBro"
  //   ];

  //   const otherUserMessages = [
  //     "Just bought another bag! LFG! 🚀",
  //     "What's the tokenomics like?",
  //     "Holding since day one! 💎🙌",
  //     "When CEX listing?",
  //     "This community is awesome!",
  //     "Chart looking bullish today",
  //     "What's today's trading volume?",
  //     "Anyone know when the next AMA is?"
  //   ];

  //   // Only add simulated messages if not connected to socket
  //   let usersInterval: NodeJS.Timeout | null = null;

  //   if (!socketConnected) {
  //     // Add random user messages in "offline" mode
  //     usersInterval = setInterval(() => {
  //       const shouldPost = Math.random() > 0.6; // 40% chance

  //       if (shouldPost) {
  //         const randomUser = userNames[Math.floor(Math.random() * userNames.length)];
  //         const randomMessage = otherUserMessages[Math.floor(Math.random() * otherUserMessages.length)];

  //         const userMessage: Message = {
  //           id: `other-${Date.now()}`,
  //           user: randomUser,
  //           text: randomMessage,
  //           timestamp: new Date(),
  //           isAI: false,
  //         };

  //         setMessages((prev) => [...prev, userMessage]);
  //       }
  //     }, 12000); // Every 12 seconds
  //   }

  //   // Simulate periodic special events (both online and offline)
  //   const eventInterval = setInterval(() => {
  //     const shouldShowEvent = Math.random() > 0.7; // 30% chance

  //     if (shouldShowEvent) {
  //       setShowEvent(true);

  //       // Hide event after 2 minutes
  //       setTimeout(() => {
  //         setShowEvent(false);
  //       }, 120000);
  //     }
  //   }, 300000); // Every 5 minutes

  //   return () => {
  //     if (usersInterval) clearInterval(usersInterval);
  //     clearInterval(eventInterval);
  //   };
  // }, [tokenInfo, socketConnected]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center pt-20 bg-gray-900">
        <p className="text-white">Loading stream...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] min-h-screen pt-20 bg-gray-900">
      {/* Main stream area */}
      <div className="p-5 relative">
        {tokenInfo && (
          <>
            <StreamPlayer
              tokenInfo={tokenInfo}
              viewerCount={viewerCount}
              likeCount={likeCount}
              hasLiked={hasLiked}
              isLive={isLive}
              showEvent={showEvent}
              onLike={handleLike}
              setIsLive={setIsLive}
            />
            <div className="flex flex-row text-white mb-4 gap-4">
              <button
                className="px-8 py-4 bg-red-500 rounded-lg"
                onClick={() => setBuyModalVisible(true)}
              >
                BUY
              </button>
              <button className="px-8 py-4 bg-green-400 rounded-lg">
                SELL
              </button>
            </div>

            <TokenPriceChart
              tokenId={parseInt(tokenId!)}
              tokenSymbol={tokenInfo.symbol}
            />
            <TokenInfoCard
              tokenInfo={tokenInfo}
              onAgentClick={() => setShowAgentModal(true)}
            />
          </>
        )}
      </div>

      {/* Chat sidebar */}
      <ChatSidebar
        messages={messages}
        viewerCount={viewerCount}
        onSendMessage={handleSendMessage}
      />

      {/* Agent Modal */}
      {showAgentModal && tokenInfo && (
        <AgentModal
          tokenInfo={tokenInfo}
          onClose={() => setShowAgentModal(false)}
        />
      )}
      {buyModalVisible && tokenInfo && (
        <BuyModal
          isOpen={buyModalVisible}
          onBuy={handleBuy as any}
          onClose={() => setBuyModalVisible(false)}
          tokenInfo={tokenInfo as any}
        />
      )}
    </div>
  );
};

export default LiveStreamPage;