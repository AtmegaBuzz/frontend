// TokenInfoCard.tsx
import { Star } from "lucide-react";
import { AIToken } from "./types";

interface TokenInfoCardProps {
  tokenInfo: AIToken;
  onAgentClick: () => void;
}

const TokenInfoCard: React.FC<TokenInfoCardProps> = ({ tokenInfo, onAgentClick }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-5 text-white shadow-md">
      <div className="flex flex-col gap-4">
        {/* Token Header */}
        <div className="mb-2">
          <h2 className="text-2xl font-bold flex items-center flex-wrap gap-2">
            {tokenInfo?.tokenName}
            <span className="text-lg text-gray-300">
              ({tokenInfo?.symbol})
            </span>
            <span className="text-xs font-normal text-gray-400 ml-1 bg-gray-700 px-2 py-1 rounded-full">
              Launched{" "}
              {new Date(tokenInfo?.launchDate || "").toLocaleDateString()}
            </span>
          </h2>
          <p className="mt-2 text-gray-300">
            {tokenInfo?.tokenDescription}
          </p>
        </div>

        {/* Token Metrics and Agent Card in a grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* First row of metrics - Takes 3/4 of the width */}
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">Price</div>
            <div className="font-bold text-lg">
              ${tokenInfo?.price?.toFixed(8)}
            </div>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">Market Cap</div>
            <div className="font-bold text-lg">
              ${tokenInfo?.marketCap?.toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">Holders</div>
            <div className="font-bold text-lg">
              {tokenInfo?.holders?.toLocaleString()}
            </div>
          </div>

          {/* Agent card - Takes 1/4 of the width but spans 2 rows */}
          <div
            className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-600 hover:border-primary lg:row-span-2 flex flex-col justify-center"
            onClick={onAgentClick}
          >
            <div className="text-center">
              <img
                src={tokenInfo?.agentDisplay?.agentImageUrl}
                alt={tokenInfo?.agentDisplay?.agentName}
                className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-primary shadow-md"
              />
              <h3 className="mt-3 font-bold text-lg flex items-center justify-center gap-1">
                {tokenInfo?.agentDisplay?.agentName}
                <Star size={16} className="text-yellow-400" />
              </h3>
              <p className="text-gray-300 text-sm mt-1">
                AI Representative
              </p>
              <div className="mt-3 text-xs text-gray-400 flex items-center justify-center bg-gray-800/50 p-2 rounded-md">
                Click to view details
              </div>
            </div>
          </div>

          {/* Second row of metrics - Aligns under the first row */}
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">Token Supply</div>
            <div className="font-bold text-lg">
              {tokenInfo?.supply.toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">ATH Date</div>
            <div className="font-bold text-lg">
              {tokenInfo?.allTimeHighDate
                ? new Date(tokenInfo.allTimeHighDate).toLocaleDateString()
                : "N/A"}
            </div>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">Creator</div>
            <div className="font-bold text-lg">
              {tokenInfo?.user.username}
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap gap-3 mt-4">
          <a
            href={tokenInfo?.website}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-4 py-2 rounded-md no-underline text-sm font-medium hover:bg-[#e42c7f] transition-colors duration-200"
          >
            Website
          </a>
          <a
            href={`https://x.com/${tokenInfo?.twitter?.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1da1f2] text-white px-4 py-2 rounded-md no-underline text-sm font-medium hover:opacity-90 transition-opacity duration-200"
          >
            Twitter
          </a>
          <a
            href={`https://t.me/${tokenInfo?.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0088cc] text-white px-4 py-2 rounded-md no-underline text-sm font-medium hover:opacity-90 transition-opacity duration-200"
          >
            Telegram
          </a>
          {tokenInfo?.discord && (
            <a
              href={`https://discord.gg/${tokenInfo.discord}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#7289da] text-white px-4 py-2 rounded-md no-underline text-sm font-medium hover:opacity-90 transition-opacity duration-200"
            >
              Discord
            </a>
          )}
          {tokenInfo?.youtube && (
            <a
              href={`https://youtube.com/@${tokenInfo.youtube}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ff0000] text-white px-4 py-2 rounded-md no-underline text-sm font-medium hover:opacity-90 transition-opacity duration-200"
            >
              YouTube
            </a>
          )}
          <a
            href={`https://explorer.cello.com/account/${tokenInfo?.contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#3498db] text-white px-4 py-2 rounded-md no-underline text-sm font-medium hover:opacity-90 transition-opacity duration-200"
          >
            Contract
          </a>
        </div>
      </div>
    </div>
  );
};

export default TokenInfoCard;