export interface TokenData {
  tokenName: string;
  symbol: string;
  supply: number;
  tokenImageUrl: string;
  tokenDescription: string;
  contractAddress: string | null;
  youtube: string;
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
}

export interface AgentTemplate {
  id: number;
  agentImageUrl: string;
  agentName: string;
  agentIpfsUrl: string;
  createdAt: string;
  updatedAt: string;
}


export interface TokensData {
  id: number;
  tokenName: string;
  symbol: string;
  tokenDescription: string;
  tokenImageUrl: string;
  contractAddress: string | null;
  personalityType: string[];
}





export interface User {
  id: number
  username: string
  walletAddress: string
  bio?: string
  profile_pic?: string
  createdAt: Date
}

export interface AgentDisplay {
  id: number
  agentName: string
  agentImageUrl: string
  agentIpfsUrl: string
  aiTokenId: number
  createdAt: Date
}

export interface StreamDetails {
  id: number
  youtubeChannelId?: string
  twitchChannelId?: string
  aiTokenId: number
}

export interface AIToken {
  id: number
  tokenName: string
  symbol: string
  tokenDescription: string
  tokenImageUrl: string
  supply: number
  contractAddress?: string
  
  // Social links
  website?: string
  twitter?: string
  telegram?: string
  discord?: string
  youtube?: string
  
  // Personality Info
  voiceType?: string
  personalityType: string[]
  
  // Related data
  userId: number
  user: User
  agentDisplay?: AgentDisplay
  streamDetails?: StreamDetails
  
  // Market data (not in schema, but needed for UI)
  price?: number
  marketCap?: number
  holders?: number
  chain?: string
  launchDate?: string
  allTimeHigh?: number
  allTimeHighDate?: string
}