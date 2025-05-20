// AgentModal.tsx
import { ExternalLink, Shield } from "lucide-react";
import { AIToken } from "./types";

interface AgentModalProps {
  tokenInfo: AIToken;
  onClose: () => void;
}

const AgentModal: React.FC<AgentModalProps> = ({ tokenInfo, onClose }) => {
  const handleRedirectToIPFS = (): void => {
    if (tokenInfo?.agentDisplay?.agentIpfsUrl) {
      // In a real app, you would redirect to a gateway URL
      window.open(tokenInfo.agentDisplay.agentIpfsUrl, "_blank");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl text-white font-bold">
              {tokenInfo.agentDisplay?.agentName}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              &times;
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <img
              src={
                tokenInfo.agentDisplay?.agentImageUrl ||
                "/api/placeholder/128/128"
              }
              alt={tokenInfo.agentDisplay?.agentName || "AI Agent"}
              className="w-32 h-32 rounded-lg object-cover border-2 border-primary"
            />
            <div>
              <p className="text-gray-300 mb-4">
                An AI-powered agent representing {tokenInfo.tokenName}.
                Trained to assist the community with token information and
                engaging conversations.
              </p>
              <button
                onClick={handleRedirectToIPFS}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                <ExternalLink size={16} />
                View on IPFS
              </button>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-white font-bold mb-3">Agent Traits</h3>
            <div className="grid grid-cols-2 gap-3">
              {tokenInfo.personalityType?.map((trait) => (
                <div key={trait} className="bg-gray-700 p-3 rounded-md">
                  <div className="text-gray-400 text-sm">Personality</div>
                  <div className="text-white font-medium">{trait}</div>
                </div>
              ))}
              {tokenInfo.voiceType && (
                <div className="bg-gray-700 p-3 rounded-md">
                  <div className="text-gray-400 text-sm">Voice Type</div>
                  <div className="text-white font-medium">
                    {tokenInfo.voiceType}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-700 mt-6 pt-4">
            <h3 className="text-white font-bold mb-3">Token Association</h3>
            <p className="text-gray-300">
              Official AI agent for {tokenInfo.tokenName} (
              {tokenInfo.symbol})
            </p>
            <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
              <span>Created by</span>
              <span className="flex items-center gap-1 text-white">
                {tokenInfo.user.username}
                <Shield size={12} className="text-blue-500" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentModal;