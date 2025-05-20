import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ToastProvider } from "./hooks/toast";
import Navbar from "./components/Navbar";
import WalletProvider from "./utils/WalletProvider";
import { Provider as JotaiProvider } from "jotai";
import ListTokenPage from "./pages/ListTokenPage";
import { useState } from "react";
import { TokenData } from "./types";
import ExplorePage from "./pages/ExplorePage";
import LiveStreamPage from "./pages/LiveStreamPage";
import CharacterCreationPage from "./pages/CharacterCreationPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "@privy-io/wagmi";
import { wagmiConfig } from "./utils/WagmiConfig";
import Footer from "./components/Footer";
import LitePaper from "./pages/Litepaper";

export {};

interface EthereumProvider {
  request: (args: { method: string }) => Promise<string[]>;
}

declare global {
  interface Window {
    // Use intersection type to extend existing definition
    ethereum?: any & EthereumProvider;
  }
}

const queryClient = new QueryClient();

function App() {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);

  const updateTokenData = (data: TokenData) => {
    setTokenData(data);
  };
  return (
    <main>
      <JotaiProvider>
        <WalletProvider>
          <QueryClientProvider client={queryClient}>
            <WagmiProvider config={wagmiConfig}>
              <ToastProvider>
                <BrowserRouter>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route
                      path="/list-token"
                      element={
                        <ListTokenPage
                          updateTokenData={updateTokenData}
                          tokenData={null}
                        />
                      }
                    />
                    <Route
                      path="/stream/:tokenId"
                      element={<LiveStreamPage />}
                    />
                    <Route
                      path="/litepaper"
                      element={<LitePaper />}
                    />
                    <Route
                      path="/create-character"
                      element={
                        <CharacterCreationPage
                          initialTokenData={
                            tokenData
                              ? {
                                  name: tokenData.tokenName,
                                  symbol: tokenData.symbol,
                                  supply: tokenData.supply.toString(),
                                  imageUrl: tokenData.tokenImageUrl,
                                  description: tokenData.tokenDescription,
                                  website: tokenData.website,
                                  twitter: tokenData.twitter,
                                  telegram: tokenData.telegram,
                                  discord: tokenData.discord,
                                }
                              : null
                          }
                        />
                      }
                    />
                  </Routes>
                  <Footer />
                </BrowserRouter>
              </ToastProvider>
            </WagmiProvider>
          </QueryClientProvider>
        </WalletProvider>
      </JotaiProvider>
    </main>
  );
}

export default App;