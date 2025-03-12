import React from "react";
import SocialAgentCard from "../components/SocialAgentCard";

interface TokenData {
  name: string;
  symbol: string;
  contractAddress: string;
  chain: string;
  description: string;
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
  email: string;
}

interface SocialAgentConfig {
  enabled: boolean;
  name: string;
  bio: string;
  model: string;
  aiKey: string;
  voice: string;
}

interface SocialLinksFormProps {
  tokenData: TokenData;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  prevStep: () => void;
  isSubmitting: boolean;
  socialAgents: {
    twitter: SocialAgentConfig;
    discord: SocialAgentConfig;
    instagram: SocialAgentConfig;
  };
  onToggleAgent: (
    agentType: "twitter" | "discord" | "instagram",
    enabled: boolean
  ) => void;
  onConfigureAgent: (agentType: "twitter" | "discord" | "instagram") => void;
}

const SocialLinksForm: React.FC<SocialLinksFormProps> = ({
  tokenData,
  handleInputChange,
  prevStep,
  isSubmitting,
  socialAgents,
  onToggleAgent,
  onConfigureAgent,
}) => {
  return (
    <div>
      <h3>Social Links & AI Agents</h3>
      <p>
        Add your social media, community links, and set up AI agents for your
        token.
      </p>

      <div className="mb-5">
        <label htmlFor="website" className="block mb-2 font-bold">
          Website
        </label>
        <input
          type="url"
          id="website"
          name="website"
          value={tokenData.website}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="https://your-website.com"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="twitter" className="block mb-2 font-bold">
          Twitter/X
        </label>
        <input
          type="text"
          id="twitter"
          name="twitter"
          value={tokenData.twitter}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="@username"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="telegram" className="block mb-2 font-bold">
          Telegram
        </label>
        <input
          type="text"
          id="telegram"
          name="telegram"
          value={tokenData.telegram}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="t.me/your-group"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="discord" className="block mb-2 font-bold">
          Discord
        </label>
        <input
          type="text"
          id="discord"
          name="discord"
          value={tokenData.discord}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="discord.gg/your-invite"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 font-bold">
          Contact Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={tokenData.email}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="your@email.com"
        />
      </div>

      <div className="mb-8">
        <label className="block mb-4 font-bold">
          AI Social Agents (Optional)
        </label>
        <p className="mb-4 text-gray-600">
          Create AI-powered social media agents for your memecoin that can post,
          respond, and interact with your community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SocialAgentCard
            agentType="twitter"
            config={socialAgents.twitter}
            onToggle={onToggleAgent}
            onConfigureClick={onConfigureAgent}
          />

          <SocialAgentCard
            agentType="discord"
            config={socialAgents.discord}
            onToggle={onToggleAgent}
            onConfigureClick={onConfigureAgent}
          />

          <SocialAgentCard
            agentType="instagram"
            config={socialAgents.instagram}
            onToggle={onToggleAgent}
            onConfigureClick={onConfigureAgent}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row md:flex-row justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          className="primary-button bg-gray-300"
        >
          Back
        </button>
        <button
          type="submit"
          className="primary-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Continue to Character Creation"}
        </button>
      </div>
    </div>
  );
};

export default SocialLinksForm;
