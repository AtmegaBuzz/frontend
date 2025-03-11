import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components'
import { 
  HomePage, 
  ExplorePage,
  ListTokenPage,
  CharacterCreationPage,
  DashboardPage,
  LiveStreamPage
} from './pages'

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        if (accounts.length > 0) {
          setIsWalletConnected(true)
          setWalletAddress(accounts[0])
          console.log('Connected account:', accounts[0])
        }
      } else {
        alert('Please install MetaMask to connect your wallet')
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

  return (
    <Router>
      <Navbar isWalletConnected={isWalletConnected} connectWallet={connectWallet} walletAddress={walletAddress} />
      <Routes>
        <Route path="/" element={<HomePage isWalletConnected={isWalletConnected} connectWallet={connectWallet} />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route 
          path="/list-token" 
          element={
            <ListTokenPage 
              isWalletConnected={isWalletConnected} 
              connectWallet={connectWallet}
              walletAddress={walletAddress}
            />
          } 
        />
        <Route 
          path="/create-character" 
          element={
            <CharacterCreationPage 
              isWalletConnected={isWalletConnected} 
              connectWallet={connectWallet}
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
            />
          } 
        />
        <Route path="/stream/:tokenId" element={<LiveStreamPage />} />
      </Routes>
    </Router>
  )
}

export default App