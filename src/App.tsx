import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer, Navbar } from "./components";
import {
  HomePage,
  ExplorePage,
  ListTokenPage,
  CharacterCreationPage,
  DashboardPage,
  LiveStreamPage,
} from "./pages";

// Add type declaration for ethereum provider
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
    };
  }
}

// Define token data interface
interface TokenData {
  name: string;
  symbol: string;
  supply: string;
  imageUrl: string;
  description: string;
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
  youtube: string;
}

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          setIsWalletConnected(true);
          setWalletAddress(accounts[0]);
          console.log("Connected account:", accounts[0]);
        }
      } else {
        alert("Please install MetaMask to connect your wallet");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const updateTokenData = (data: TokenData) => {
    setTokenData(data);
  };

  return (
    <Router>
      <Navbar
        isWalletConnected={isWalletConnected}
        connectWallet={connectWallet}
        walletAddress={walletAddress}
      />
      <Routes>
        <Route path="/" element={<HomePage connectWallet={connectWallet} />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route
          path="/list-token"
          element={
            <ListTokenPage
              isWalletConnected={isWalletConnected}
              connectWallet={connectWallet}
              walletAddress={walletAddress}
              updateTokenData={updateTokenData}
              tokenData={tokenData}
            />
          }
        />
        <Route
          path="/create-character"
          element={
            <CharacterCreationPage
              connectWallet={connectWallet}
              initialTokenData={tokenData}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              isWalletConnected={isWalletConnected}
              connectWallet={connectWallet}
              walletAddress={walletAddress}
              tokenData={tokenData}
            />
          }
        />
        <Route path="/stream/:tokenId" element={<LiveStreamPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
