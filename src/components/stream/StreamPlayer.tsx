import { Heart, Share2, Users } from "lucide-react";
import { AIToken } from "./types";
import { useEffect } from "react";

interface StreamPlayerProps {
  tokenInfo: AIToken;
  viewerCount: number;
  likeCount: number;
  hasLiked: boolean;
  isLive: boolean;
  showEvent: boolean;
  onLike: () => void;
  setIsLive: (isLive: boolean) => void;
}

const StreamPlayer: React.FC<StreamPlayerProps> = ({
  tokenInfo,
  viewerCount,
  likeCount,
  hasLiked,
  isLive,
  showEvent,
  onLike,
  setIsLive,
}) => {
  // Add effect to check if stream loads properly
  useEffect(() => {
    if (isLive && tokenInfo?.youtubeChannelId) {
      // Add a timeout to check if the stream loaded properly
      const timeout = setTimeout(() => {
        const iframe = document.getElementById(
          "youtube-live"
        ) as HTMLIFrameElement;
        if (iframe) {
          // If there's an error loading the stream, we can detect it here
          // This is a simple check - you might need more complex detection
          if (!iframe.contentWindow) {
            setIsLive(false);
          }
        }
      }, 5000); // 5 second timeout

      return () => clearTimeout(timeout);
    }
  }, [isLive, tokenInfo, setIsLive]);

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden relative mb-5">
      {/* "Video" placeholder */}
      <div className="w-full h-full flex flex-col items-center justify-center bg-[linear-gradient(45deg,#2b2b2b_25%,#222_25%,#222_50%,#2b2b2b_50%,#2b2b2b_75%,#222_75%,#222_100%)] bg-[length:10px_10px]">
        <div className="relative w-full h-full group">
          {/* YouTube Embed */}
          {isLive && tokenInfo?.youtubeChannelId ? (
            <iframe
              id="youtube-live"
              className="w-full h-full" // Removed pointer-events-none
              src={`https://www.youtube.com/embed/live_stream?channel=${tokenInfo.youtubeChannelId}&autoplay=1&controls=1`} // Added controls=1
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen // Added allowFullScreen
              referrerPolicy="origin"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-white">
              <h1 className="text-xl bg-black/50 p-4 rounded-lg">
                {tokenInfo?.youtubeChannelId
                  ? "Stream could not be loaded"
                  : "No YouTube channel configured"}
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Stream info bar */}
      <div className="absolute top-4 left-4 right-4 flex justify-between">
        {/* Creator info */}
        <div className="bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm flex items-center gap-2 border border-white/10">
          <img
            src={tokenInfo?.user.profile_pic || "/api/placeholder/24/24"}
            alt={tokenInfo?.user.username}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span>{tokenInfo?.user.username}</span>
        </div>

        {/* Viewer count */}
        <div className="bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm flex items-center gap-2 border border-white/10">
          <Users size={16} className="text-red-500" />
          <span>{viewerCount} viewers</span>
        </div>
      </div>

      {/* Stream actions */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        <button
          className={`p-2 rounded-full border border-white/10 transition-colors duration-200 flex items-center gap-2 ${
            hasLiked
              ? "bg-red-500 text-white"
              : "bg-black/40 hover:bg-primary backdrop-blur-sm text-white"
          }`}
          onClick={onLike}
        >
          <Heart size={22} className={hasLiked ? "animate-pulse" : ""} />
          <span>{likeCount}</span>
        </button>
        <button className="bg-black/40 hover:bg-primary backdrop-blur-sm p-2 rounded-full border border-white/10 transition-colors duration-200">
          <Share2 size={22} className="text-white" />
        </button>
      </div>

      {/* Special event overlay */}
      {showEvent && (
        <div className="absolute left-4 right-4 bottom-16 bg-primary text-white p-4 rounded-xl border-2 border-white shadow-lg animate-pulse">
          <h3 className="font-bold text-lg mb-1">🎁 SPECIAL EVENT! 🎁</h3>
          <p>
            Buy exactly 0.0069 ETH of {tokenInfo?.symbol} in the next 10 minutes
            and post your transaction hash to enter our exclusive giveaway!
          </p>
        </div>
      )}
    </div>
  );
};

export default StreamPlayer;