import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageSquare } from "lucide-react";
import ScrollVelocity from "./ScrollVelocity";
import f1Image from "@/assets/1f.png";
import f2Image from "@/assets/2f.png";
import f3Image from "@/assets/3f.png";
import f4Image from "@/assets/f4.png";
import video from "@/assets/shilltuberlive.mp4";

interface StreamInfo {
  id: string;
  tokenName: string;
  characterName: string;
  thumbnail: string;
  viewerCount: number;
  isLive: boolean;
  time?: string;
}

const FeaturedStreams = () => {
  const [streams, setStreams] = useState<StreamInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, you would fetch actual stream data
    // This is mock data for demonstration
    const mockStreams = [
      {
        id: "featured-stream",
        tokenName: "Featured Stream Special",
        characterName: "MainHost",
        thumbnail: video,
        viewerCount: 3500,
        isLive: true,
        time: "3:15:00",
      },
      {
        id: "doge-coin",
        tokenName: "DogeCoin To The Moon",
        characterName: "MoonWarrior",
        thumbnail: f1Image,
        viewerCount: 856,
        isLive: true,
        time: "1:45:30",
      },
      {
        id: "shiba-inu",
        tokenName: "Weekly Meme Review",
        characterName: "MemeVTuber",
        thumbnail: f2Image,
        viewerCount: 2100,
        isLive: true,
        time: "0:58:20",
      },
      {
        id: "wojak-coin",
        tokenName: "NFT Market Updates",
        characterName: "CryptoArtist",
        thumbnail: f3Image,
        viewerCount: 1500,
        isLive: true,
        time: "1:15:45",
      },
      {
        id: "bonk-coin",
        tokenName: "BONK Trading Strategies",
        characterName: "BonkTrader",
        thumbnail: f4Image,
        viewerCount: 1800,
        isLive: true,
        time: "0:45:10",
      },
    ];

    setStreams(mockStreams);
    setIsLoading(false);
  }, []);

  // Featured stream is the first stream in the list
  const featuredStream = streams.length > 0 ? streams[0] : null;
  // Use remaining streams for the grid (skip the featured one)
  const gridStreams = streams.slice(1);

  return (
    <section className="bg-yellow bg-pattern py-10">
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        {/* Centered Header */}
        <div className="bg-[#FCFCE6] border-4 border-black rounded-xl p-6 mb-8 text-center">
          <h2 className="text-black font-right-grotesk text-3xl font-bold">
            Featured AI Characters
          </h2>
        </div>

        {/* Streams Content */}
        {isLoading ? (
          <div className="text-center">
            <p>Loading streams...</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 md:gap-5">
            {/* Left side - Featured stream */}
            {featuredStream && (
              <div className="w-full lg:w-2/5 relative">
                <Link
                  to={`/stream/${featuredStream.id}`}
                  className="no-underline"
                >
                  <div className="rounded-xl overflow-hidden relative cursor-pointer border-4 border-black hover:shadow-[-7px_7px_0_0_#1f2024] transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                    <video
                      src={featuredStream.thumbnail}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <div className="bg-black/80 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-white font-bold">
                            FEATURED LIVE
                          </span>
                        </div>
                        <h2 className="text-white text-xl font-bold mb-1">
                          {featuredStream.tokenName}
                        </h2>
                        <p className="text-gray-300 text-sm">
                          Join {featuredStream.characterName} for live updates
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Right side - Stream grid */}
            <div className="w-full lg:w-3/5 flex flex-col">
              <div className="grid grid-cols-2 gap-4">
                {gridStreams.map((stream) => (
                  <Link
                    to={`/stream/${stream.id}`}
                    key={stream.id}
                    className="no-underline"
                  >
                    <div className="relative group cursor-pointer">
                      <div className="w-full h-56 bg-[#FCFCE6] rounded-xl border-4 border-black overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[-5px_5px_0_0_#1f2024]">
                        <img
                          src={stream.thumbnail}
                          alt={stream.tokenName}
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0">
                          {/* Stream Info */}
                          {stream.isLive && (
                            <div className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-md text-white text-xs font-bold border border-white/20 shadow-sm flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                              LIVE
                            </div>
                          )}
                          <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-md text-white text-xs font-medium backdrop-blur-sm border border-white/10">
                            {stream.viewerCount.toLocaleString()} watching
                          </div>

                          {/* Interactive Icons */}
                          <div className="flex flex-col items-end p-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-black p-1.5 rounded-lg border-2 border-white/20 hover:bg-primary hover:scale-110 transition-all duration-200 cursor-pointer shadow-md">
                              <Heart className="w-5 h-5 text-white" />
                            </div>
                            <div className="bg-black p-1.5 rounded-lg border-2 border-white/20 hover:bg-primary hover:scale-110 transition-all duration-200 cursor-pointer shadow-md">
                              <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                          </div>

                          {/* Stream Details */}
                          <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-white backdrop-blur-sm border-t border-white/10">
                            <div className="text-sm font-bold truncate mb-1">
                              {stream.tokenName}
                            </div>
                            <div className="text-xs text-gray-300 flex justify-between items-center">
                              <span className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-primary"></div>
                                {stream.characterName}
                              </span>
                              <span className="bg-black px-2 py-0.5 rounded-md border border-white/10">
                                {stream.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Removed View All Streams button */}
            </div>
          </div>
        )}

        {/* Scrolling Text Section */}
        <div className="w-full overflow-hidden mt-16">
          <ScrollVelocity
            texts={[
              "AI-POWERED ENTERTAINMENT • 24/7 COMMUNITY ENGAGEMENT • AUTOMATED SOCIAL PRESENCE • ",
              "TRANSFORM YOUR TOKEN • LIVE INTERACTIVE STREAMS • DYNAMIC AI PERSONALITIES • ",
            ]}
            velocity={40}
            className="text-black font-right-grotesk text-5xl font-bold tracking-wider"
            parallaxClassName="py-2"
            scrollerClassName="gap-x-8"
            numCopies={3}
            velocityMapping={{ input: [0, 1000], output: [0, 2] }}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedStreams;
