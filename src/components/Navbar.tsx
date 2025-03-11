import { useState } from 'react'
import { Link } from 'react-router-dom'

interface NavbarProps {
  isWalletConnected: boolean
  connectWallet: () => Promise<void>
  walletAddress: string | null
}

const Navbar = ({ isWalletConnected, connectWallet, walletAddress }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="fixed left-0 top-0 right-0 bottom-auto bg-transparent z-[9999]">
      <div className="flex justify-center p-2 max-w-[940px] mx-auto">
        <Link to="/" className="flex items-center pl-4 border-r border-[#494949] rounded-l-lg bg-black text-white h-14">
          <img
            src="/images/icon-256w.png"
            loading="lazy"
            height="32"
            width="32"
            alt="ShillTube Logo"
            className="mr-3"
          />
          <div className="text-white text-base">ShillTube</div>
        </Link>
        <nav className={`flex items-center pr-3 rounded-r-lg bg-black text-white h-14 ${isMenuOpen ? 'flex-col absolute top-16 right-2 left-2 z-50 p-4 rounded-lg' : ''}`}>
          <Link to="/explore" className="px-4 py-2 text-white text-base hover:text-yellow">Explore</Link>
          <Link to="/list-token" className="px-4 py-2 text-white text-base hover:text-yellow">List Token</Link>
          {isWalletConnected && (
            <>
              <Link to="/dashboard" className="px-4 py-2 text-white text-base hover:text-yellow">Dashboard</Link>
              <Link to="/create-character" className="px-4 py-2 text-white text-base hover:text-yellow">Create Character</Link>
            </>
          )}
          <button 
            onClick={connectWallet} 
            className="rounded-lg bg-[#ff3979] hover:bg-[#5100ff] transition-colors duration-200 py-2 px-4 text-white border-none cursor-pointer ml-3 text-base"
          >
            {isWalletConnected ? truncateAddress(walletAddress!) : 'Connect Wallet'}
          </button>
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="ml-2 p-2 text-white bg-black rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar