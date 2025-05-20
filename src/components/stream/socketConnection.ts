// socketConnection.ts
import { io, Socket } from "socket.io-client";
import { Message } from "./types";

let socket: Socket | null = null;
let socketError: string | null = null;

/**
 * Initializes a Socket.IO connection to the server
 * @returns Socket instance
 */
export const initializeSocketConnection = (): Socket => {
  if (socket && socket.connected) {
    console.log("Using existing socket connection");
    return socket;
  }

  // Close any existing socket to prevent multiple connections
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
  
  console.log(`Attempting to connect to: ${SERVER_URL}`);
  
  try {
    // Create new socket with more robust configuration
    socket = io(SERVER_URL, {
      transports: ["polling", "websocket"], // Start with polling, then upgrade to websocket if available
      reconnection: true,
      reconnectionAttempts: 3,
      reconnectionDelay: 1000,
      timeout: 10000,
      // IMPORTANT: Don't use withCredentials when server has Access-Control-Allow-Origin: *
      withCredentials: false 
    });
    
    // Event handlers
    socket.on("connect", () => {
      console.log(`Connected to server with ID: ${socket?.id}`);
      socketError = null;
    });
    
    socket.on("connect_error", (error) => {
      console.error(`Connection error: ${error.message}`);
      socketError = error.message;
    });
    
    socket.on("disconnect", (reason) => {
      console.log(`Disconnected from server: ${reason}`);
    });

    socket.on("error", (error) => {
      console.error(`Socket error: ${error}`);
      socketError = typeof error === 'string' ? error : 'Unknown socket error';
    });
    
    return socket;
  } catch (err) {
    console.error('Failed to initialize socket:', err);
    socketError = err instanceof Error ? err.message : 'Unknown initialization error';
    // Return a dummy socket that won't cause errors when methods are called on it
    return createDummySocket();
  }
};

/**
 * Create a dummy socket object that won't cause errors when methods are called on it
 * Each method returns the socket instance for chaining
 */
function createDummySocket(): Socket {
  const dummySocket: any = {
    connected: false,
    id: 'dummy-id',
  };

  // Make methods return the dummy socket itself for chaining
  dummySocket.on = () => dummySocket;
  dummySocket.once = () => dummySocket;
  dummySocket.off = () => dummySocket;
  dummySocket.emit = () => dummySocket;
  dummySocket.connect = () => dummySocket;
  dummySocket.disconnect = () => dummySocket;
  dummySocket.removeAllListeners = () => dummySocket;
  dummySocket.hasListeners = () => false;
  dummySocket.listeners = () => [];
  dummySocket.eventNames = () => [];

  return dummySocket as Socket;
}

/**
 * Get the current socket error if any
 */
export const getSocketError = (): string | null => {
  return socketError;
};

/**
 * Disconnects the Socket.IO connection
 */
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Socket disconnected");
  }
};

/**
 * Checks if socket is connected
 * @returns boolean indicating if socket is connected
 */
export const isSocketConnected = (): boolean => {
  return socket !== null && socket.connected;
};

/**
 * Subscribes to a specific stream channel
 * @param streamId The ID of the stream to subscribe to
 * @param callback Optional callback to handle subscription result
 */
export const subscribeToStream = (
  streamId: string, 
  callback?: (response: { success: boolean; message?: string }) => void
): void => {
  if (!socket) {
    console.error("Socket connection not initialized");
    if (callback) {
      callback({ success: false, message: "Socket connection not initialized" });
    }
    return;
  }

  // Use socket even if not connected yet (will be queued)
  socket.emit("subscribeToStream", streamId, (response: any) => {
    console.log(`Subscribe response for stream ${streamId}:`, response);
    if (callback) {
      callback(response || { success: false, message: "No response from server" });
    }
  });
};

/**
 * Sends a message to a specific stream
 * @param streamId The ID of the stream
 * @param message The message data to send
 */
export const sendMessage = (
  streamId: string, 
  message: Message
): void => {
  if (!socket) {
    console.error("Socket connection not initialized");
    return;
  }

  const messageData = {
    streamId,
    message
  };

  console.log("Sending message:", messageData);
  socket.emit("sendMessage", messageData);
};

/**
 * Sends a like event for a specific stream
 * @param streamId The ID of the stream to like
 */
export const likeStream = (streamId: string): void => {
  if (!socket) {
    console.error("Socket connection not initialized");
    return;
  }

  socket.emit("likeStream", { streamId });
};

// Event listeners and handlers
type MessageHandler = (data: any) => void;
const messageHandlers: { [key: string]: MessageHandler[] } = {};

/**
 * Register an event handler for a specific event
 * @param event The event name to listen for
 * @param handler The handler function to call when the event occurs
 */
export const onEvent = (event: string, handler: MessageHandler): void => {
  if (!messageHandlers[event]) {
    messageHandlers[event] = [];
  }
  messageHandlers[event].push(handler);
  
  // If socket exists, register the handler
  if (socket) {
    socket.on(event, handler);
  }
};


export default {
  initializeSocketConnection,
  disconnectSocket,
  isSocketConnected,
  subscribeToStream,
  sendMessage,
  likeStream,
  onEvent,
  getSocketError
};