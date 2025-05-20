// types.ts

export interface User {
  id: number;
  username: string;
  profile_pic?: string;
  email?: string;
  createdAt: Date;
}

export interface AgentDisplay {
  agentName: string;
  agentImageUrl: string;
  agentIpfsUrl?: string;
  agentPrompt?: string;
}

export interface AIToken {
  id: number;
  tokenName: string;
  symbol: string;
  tokenDescription: string;
  contractAddress: string;
  supply: number;
  userId: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;

  // Platform links
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  youtube?: string;
  youtubeChannelId?: string;

  // Agent-related properties
  voiceType?: string;
  personalityType?: string[];
  agentDisplay?: AgentDisplay;

  // Market data (not in schema but needed for UI)
  price?: number;
  marketCap?: number;
  holders?: number;
  chain?: string;
  launchDate?: string;
  allTimeHigh?: number;
  allTimeHighDate?: string;
}

export interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  profile_pic?: string;
  isAI: boolean;
  isCurrentUser?: boolean;
}

export interface StreamEvent {
  id: string;
  streamId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  active: boolean;
}