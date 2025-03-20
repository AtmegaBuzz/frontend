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