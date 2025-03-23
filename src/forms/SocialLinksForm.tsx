import React from "react";
import SocialAgentCard from "../components/SocialAgentCard";
import { TokenData } from "@/interfaces";
import { Youtube, Twitch } from "lucide-react"; // Import icons

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
  streamingPlatform: "youtube" | "twitch" | "tiktok";
  handleStreamingPlatformChange: (platform: "youtube" | "twitch" | "tiktok") => void;
}

const SocialLinksForm: React.FC<SocialLinksFormProps> = ({
  tokenData,
  handleInputChange,
  prevStep,
  isSubmitting,
  socialAgents,
  onToggleAgent,
  onConfigureAgent,
  streamingPlatform,
  handleStreamingPlatformChange,
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
          Website Url
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
          Twitter/X Username
        </label>
        <input
          type="text"
          id="twitter"
          name="twitter"
          value={tokenData.twitter}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="username"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="telegram" className="block mb-2 font-bold">
          Telegram Username
        </label>
        <input
          type="text"
          id="telegram"
          name="telegram"
          value={tokenData.telegram}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="ZenithFrostyy"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="discord" className="block mb-2 font-bold">
          Discord Channel Invite
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
        <label htmlFor="youtube" className="block mb-2 font-bold">
          Youtube Username
        </label>
        <input
          type="text"
          id="youtube"
          name="youtube"
          value={tokenData.youtube}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="your-channel"
        />
      </div>

      {/* Beautiful streaming platform selection */}
      <div className="mb-5">
        <label className="block mb-2 font-bold">
          Live Streaming Channel
        </label>
        <p className="mb-3 text-sm text-gray-600">
          Select a streaming platform and enter your channel ID (choose only one platform)
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {/* YouTube Option */}
          <label
            htmlFor="youtubeRadio"
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all cursor-pointer ${streamingPlatform === "youtube"
                ? "border-red-500 bg-red-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
          >
            <input
              type="radio"
              id="youtubeRadio"
              name="streamingPlatform"
              value="youtube"
              checked={streamingPlatform === "youtube"}
              onChange={() => handleStreamingPlatformChange("youtube")}
              className="sr-only" // Hide the actual radio input
            />
            <div className={`w-12 h-12 mb-2 rounded-full flex items-center justify-center ${streamingPlatform === "youtube" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600"
              }`}>
              <Youtube size={24} />
            </div>
            <span className={`font-medium ${streamingPlatform === "youtube" ? "text-red-500" : "text-gray-700"}`}>
              YouTube
            </span>
            {streamingPlatform === "youtube" && (
              <div className="w-4 h-4 absolute top-2 right-2 bg-red-500 rounded-full border-2 border-white"></div>
            )}
          </label>

          {/* Twitch Option */}
          <label
            htmlFor="twitchRadio"
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all cursor-pointer ${streamingPlatform === "twitch"
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
          >
            <input
              type="radio"
              id="twitchRadio"
              name="streamingPlatform"
              value="twitch"
              checked={streamingPlatform === "twitch"}
              onChange={() => handleStreamingPlatformChange("twitch")}
              className="sr-only"
            />
            <div className={`w-12 h-12 mb-2 rounded-full flex items-center justify-center ${streamingPlatform === "twitch" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-600"
              }`}>
              <Twitch size={24} />
            </div>
            <span className={`font-medium ${streamingPlatform === "twitch" ? "text-purple-500" : "text-gray-700"}`}>
              Twitch
            </span>
            {streamingPlatform === "twitch" && (
              <div className="w-4 h-4 absolute top-2 right-2 bg-purple-500 rounded-full border-2 border-white"></div>
            )}
          </label>

          {/* TikTok Option */}
          <label
            htmlFor="tiktokRadio"
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all cursor-pointer ${streamingPlatform === "tiktok"
                ? "border-black bg-gray-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
          >
            <input
              type="radio"
              id="tiktokRadio"
              name="streamingPlatform"
              value="tiktok"
              checked={streamingPlatform === "tiktok"}
              onChange={() => handleStreamingPlatformChange("tiktok")}
              className="sr-only"
            />
            <div className={`w-12 h-12 mb-2 rounded-full flex items-center justify-center ${streamingPlatform === "tiktok" ? "bg-black text-white" : "bg-gray-100 text-gray-600"
              }`}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C13.196 3.379 14.625 4 16 4V7.5C14.938 7.5 13.412 6.855 12 5.5V14.75C12 17.235 10.118 19 8 19C5.882 19 4 17.235 4 14.75C4 12.265 5.882 10.5 8 10.5C8.379 10.5 8.75 10.546 9.105 10.632V13.311C8.799 13.221 8.486 13.184 8.167 13.184C7.158 13.184 6.369 13.988 6.369 15C6.369 16.012 7.158 16.816 8.167 16.816C9.176 16.816 9.967 16.012 9.967 15V2H12Z"
                  fill="black"
                />
              </svg>

            </div>
            <span className={`font-medium ${streamingPlatform === "tiktok" ? "text-black" : "text-gray-700"}`}>
              TikTok
            </span>
            {streamingPlatform === "tiktok" && (
              <div className="w-4 h-4 absolute top-2 right-2 bg-black rounded-full border-2 border-white"></div>
            )}
          </label>
        </div>

        {/* Channel ID input for selected platform */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          {streamingPlatform === "youtube" && (
            <div>
              <label htmlFor="youtubeChannelId" className="block mb-2 text-sm font-medium">
                YouTube Channel ID
              </label>
              <input
                type="text"
                id="youtubeChannelId"
                name="youtubeChannelId"
                value={tokenData.youtubeChannelId || ""}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
                placeholder="Enter your YouTube channel ID"
              />
              <p className="mt-1 text-xs text-gray-500">
                Example: UCetf834RebcJNy7nLmtQpnw (found in your channel URL)
              </p>
            </div>
          )}

          {streamingPlatform === "twitch" && (
            <div>
              <label htmlFor="twitchChannelId" className="block mb-2 text-sm font-medium">
                Twitch Username
              </label>
              <input
                type="text"
                id="twitchChannelId"
                name="twitchChannelId"
                value={tokenData.twitchChannelId || ""}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
                placeholder="Enter your Twitch username"
              />
              <p className="mt-1 text-xs text-gray-500">
                Example: cryptomemeworld (your username without the @ symbol)
              </p>
            </div>
          )}

          {streamingPlatform === "tiktok" && (
            <div>
              <label htmlFor="tiktokChannelId" className="block mb-2 text-sm font-medium">
                TikTok Username
              </label>
              <input
                type="text"
                id="tiktokChannelId"
                name="tiktokChannelId"
                value={""}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
                placeholder="Enter your TikTok username"
              />
              <p className="mt-1 text-xs text-gray-500">
                Example: @cryptomeme123 (including the @ symbol)
              </p>
            </div>
          )}
        </div>
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