import { getTokens } from "@/apis/token";
import { useToast } from "@/hooks/toast";
import { TokensData } from "@/interfaces";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Define the token data interface
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

function randint(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Note: The DashboardPageProps interface isn't being used, so I've removed it to avoid confusion

const DashboardPage = () => {
  const [tokens, setTokens] = useState<TokensData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const { toast } = useToast();
  const { account } = useWallet();

  // This function should be defined outside useEffect
  const fetchTokens = async () => {
    try {
      setIsLoading(true);


      const { message, statusCode } = await getTokens(account?.address.toString(), "", 1, 100);

      if (statusCode !== 200) {
        toast({
          type: "danger",
          message: message,
          duration: 3000
        });
        setTokens([]);
      }

      else {
        setTokens(message as TokensData[]);
      }

      // Mock data
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

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tokens:", error);
      setIsLoading(false);
    }
  };

  // Run the effect only once on component mount
  useEffect(() => {
    console.log("DashboardPage useEffect running");
    fetchTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-heroRed-light pt-24 pb-20">
      <div className="container max-w-[1200px] mx-auto px-4">
        <h1 className="text-center mb-10">Project Dashboard</h1>

        {isLoading ? (
          <div className="text-center p-10 min-h-[100vh]">
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
                className={`px-5 py-2 bg-transparent border-none ${activeTab === "overview"
                  ? "border-b-3 border-primary font-bold"
                  : "font-normal"
                  } cursor-pointer`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-5 py-2 bg-transparent border-none ${activeTab === "analytics"
                  ? "border-b-3 border-primary font-bold"
                  : "font-normal"
                  } cursor-pointer`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-5 py-2 bg-transparent border-none ${activeTab === "settings"
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
                          src={token.tokenImageUrl}
                          alt={token.tokenName}
                          className="w-full h-[180px] object-cover"
                        />
                        {/* {token.isLive && (
                          <div className="absolute top-2.5 right-2.5 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                            LIVE
                          </div>
                        )} */}
                        <div className="absolute bottom-2.5 right-2.5 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {randint(0, 1000)} viewers
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="mb-2">
                          {token.tokenName} ({token.symbol})
                        </h3>
                        <p className="mb-4 text-sm text-gray-600">
                          Character: { token.personalityType[0] }
                        </p>

                        <div className="flex justify-between mb-5">
                          <div className="text-center">
                            <div className="font-bold text-lg">
                              {randint(3,300)}
                            </div>
                            <div className="text-xs text-gray-600">
                              Followers
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-lg">
                              {randint(0,100)}%
                            </div>
                            <div className="text-xs text-gray-600">
                              Engagement
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-lg">
                              {randint(0,10000)}
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
                      {tokens.reduce((sum, token) => sum + randint(0,100), 0)}
                    </div>
                    <div>Current Viewers</div>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-bold mb-1">
                      {tokens.reduce((sum, token) => sum + randint(0,1000), 0)}
                    </div>
                    <div>Total Followers</div>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-bold mb-1">
                      {Math.round(
                        tokens.reduce(
                          (sum, token) => sum + randint(0,100),
                          0
                        ) / tokens.length
                      )}
                      %
                    </div>
                    <div>Avg. Engagement</div>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-bold mb-1">
                      {tokens.reduce((sum, token) => sum + randint(0,10000), 0)}
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
                  <WalletSelector />
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