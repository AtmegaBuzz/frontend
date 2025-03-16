import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface DashboardPageProps {
  isWalletConnected: boolean;
  connectWallet: () => Promise<void>;
  walletAddress: string | null;
  tokenData: {
    name: string;
    symbol: string;
    supply: string;
    imageUrl: string;
    description: string;
    youtube: string;
    website: string;
    twitter: string;
    telegram: string;
    discord: string;
  } | null;
}

interface TokenData {
  id: string;
  name: string;
  symbol: string;

  address: string;
  character: string;
  thumbnail: string;
  viewers: number;
  isLive: boolean;
  engagement: number;
  followers: number;
  messages: number;
}

const DashboardPage = ({
  isWalletConnected,
  connectWallet,
  walletAddress,
}: DashboardPageProps) => {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // We'll load tokens regardless of wallet connection status
    // In a real app, this would depend on the user's session/auth status
    const fetchTokens = async () => {
      setIsLoading(true);

      // Mock data - we'll always show at least one token for demonstration
      const mockTokens = [
        {
          id: "pepe-coin",
          name: "Pepe Coin",
          symbol: "PEPE",
          address: "0x1234...5678",
          character: "Pepe the Frog",
          thumbnail: "/images/single-bot@2x.png",
          viewers: 128,
          isLive: true,
          engagement: 76,
          followers: 1246,
          messages: 543,
        },
      ];

      setTimeout(() => {
        setTokens(mockTokens);
        setIsLoading(false);
      }, 1000);
    };

    fetchTokens();
  }, []);

  return (
    <section className="bg-heroRed-light pt-24 pb-20">
      <div className="container max-w-[1200px] mx-auto px-4">
        <h1 className="text-center mb-10">Project Dashboard</h1>

        {isLoading ? (
          <div className="text-center p-10">
            <p>Loading your data...</p>
          </div>
        ) : tokens.length === 0 ? (
          <div className="border-8 border-black rounded-3xl bg-white shadow-[-3px_3px_0_0_#1f2024] p-10 text-center">
            <h2>No Tokens Found</h2>
            <p>You haven't listed any memecoins on ShillTube yet.</p>
            <Link to="/list-token" className="primary-button mt-5 inline-block">
              List Your First Token
            </Link>
          </div>
        ) : (
          <div>
            {/* Dashboard Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-5 py-2 bg-transparent border-none ${
                  activeTab === "overview"
                    ? "border-b-3 border-primary font-bold"
                    : "font-normal"
                } cursor-pointer`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-5 py-2 bg-transparent border-none ${
                  activeTab === "analytics"
                    ? "border-b-3 border-primary font-bold"
                    : "font-normal"
                } cursor-pointer`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-5 py-2 bg-transparent border-none ${
                  activeTab === "settings"
                    ? "border-b-3 border-primary font-bold"
                    : "font-normal"
                } cursor-pointer`}
              >
                Settings
              </button>
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                {/* Token Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {tokens.map((token) => (
                    <div
                      key={token.id}
                      className="overflow-hidden rounded-xl border-4 border-black shadow-md"
                    >
                      <div className="relative">
                        <img
                          src={token.thumbnail}
                          alt={token.name}
                          className="w-full h-[180px] object-cover"
                        />
                        {token.isLive && (
                          <div className="absolute top-2.5 right-2.5 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                            LIVE
                          </div>
                        )}
                        <div className="absolute bottom-2.5 right-2.5 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {token.viewers} viewers
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="mb-2">
                          {token.name} ({token.symbol})
                        </h3>
                        <p className="mb-4 text-sm text-gray-600">
                          Character: {token.character}
                        </p>

                        <div className="flex justify-between mb-5">
                          <div className="text-center">
                            <div className="font-bold text-lg">
                              {token.followers}
                            </div>
                            <div className="text-xs text-gray-600">
                              Followers
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-lg">
                              {token.engagement}%
                            </div>
                            <div className="text-xs text-gray-600">
                              Engagement
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-lg">
                              {token.messages}
                            </div>
                            <div className="text-xs text-gray-600">
                              Messages
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link
                            to={`/stream/${token.id}`}
                            className="flex-1 text-center py-2 bg-primary text-white rounded-lg no-underline font-bold"
                          >
                            View Stream
                          </Link>
                          <Link
                            to={`/create-character`}
                            className="flex-1 text-center py-2 bg-gray-100 text-gray-800 rounded-lg no-underline font-bold"
                          >
                            Edit Character
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Token Button */}
                <div className="text-center">
                  <Link to="/list-token" className="primary-button">
                    Add Another Token
                  </Link>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="border-8 border-black rounded-3xl bg-white shadow-[-3px_3px_0_0_#1f2024] p-8">
                <h2>Performance Analytics</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                  <div className="p-5 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-bold mb-1">
                      {tokens.reduce((sum, token) => sum + token.viewers, 0)}
                    </div>
                    <div>Current Viewers</div>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-bold mb-1">
                      {tokens.reduce((sum, token) => sum + token.followers, 0)}
                    </div>
                    <div>Total Followers</div>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-bold mb-1">
                      {Math.round(
                        tokens.reduce(
                          (sum, token) => sum + token.engagement,
                          0
                        ) / tokens.length
                      )}
                      %
                    </div>
                    <div>Avg. Engagement</div>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-bold mb-1">
                      {tokens.reduce((sum, token) => sum + token.messages, 0)}
                    </div>
                    <div>Total Messages</div>
                  </div>
                </div>

                <p className="text-center text-gray-600">
                  Detailed analytics coming soon! Check back for more insights
                  about your AI character's performance.
                </p>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="border-8 border-black rounded-3xl bg-white shadow-[-3px_3px_0_0_#1f2024] p-8">
                <h2>Account Settings</h2>

                <div className="mb-5">
                  <label className="block mb-2 font-bold">Wallet Status</label>
                  {isWalletConnected ? (
                    <input
                      type="text"
                      value={walletAddress || ""}
                      readOnly
                      className="w-full p-3 rounded-lg border-2 border-gray-300 text-base bg-gray-50"
                    />
                  ) : (
                    <div className="flex items-center">
                      <span className="text-red-500 mr-3">Not connected</span>
                      <button
                        onClick={connectWallet}
                        className="primary-button py-2"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  )}
                </div>

                <div className="mb-5">
                  <label className="block mb-2 font-bold">
                    Notification Preferences
                  </label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      Email notifications when viewers exceed threshold
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      Daily performance reports
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      Social media integration alerts
                    </label>
                  </div>
                </div>

                <button className="primary-button mt-5">Save Settings</button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardPage;
