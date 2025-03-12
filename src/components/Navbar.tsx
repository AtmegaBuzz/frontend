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
      <div className="w-full px-4 py-2 md:pt-6"> {/* Added md:pt-6 for desktop padding-top */}
        {/* Mobile View */}
        <div className="md:hidden flex items-center justify-between w-full">
          <Link to="/" className="flex items-center bg-black text-white h-14 px-4 rounded-lg">
            <img
              src="/images/icon-256w.png"
              loading="lazy"
              height="32"
              width="32"
              alt="ShillTube Logo"
              className="mr-3"
            />
            <div className="text-white text-base font-medium">ShillTube</div>
          </Link>

          <button 
            onClick={toggleMenu} 
            className="flex items-center justify-center bg-black text-white h-14 w-14 rounded-lg"
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex justify-center w-full">
          <div className="flex items-center justify-center w-full max-w-[940px]">
            <div className="flex items-center bg-black text-white h-14 rounded-lg mx-auto">
              <Link to="/" className="flex items-center px-4">
                <img
                  src="/images/icon-256w.png"
                  loading="lazy"
                  height="32"
                  width="32"
                  alt="ShillTube Logo"
                  className="mr-3"
                />
                <div className="text-white text-base font-medium">ShillTube</div>
              </Link>
              <div className="h-14 w-[1px] bg-white/20"></div>
              <nav className="flex items-center px-3">
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
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/90 z-50">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-full max-w-[280px] px-4">
                <Link 
                  to="/explore" 
                  className="block w-full text-center text-white text-lg font-medium py-3 border-b border-gray-800 hover:text-[#ff3979]"
                  onClick={toggleMenu}
                >
                  Explore
                </Link>
                <Link 
                  to="/list-token" 
                  className="block w-full text-center text-white text-lg font-medium py-3 border-b border-gray-800 hover:text-[#ff3979]"
                  onClick={toggleMenu}
                >
                  List Token
                </Link>
                {isWalletConnected && (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="block w-full text-center text-white text-lg font-medium py-3 border-b border-gray-800 hover:text-[#ff3979]"
                      onClick={toggleMenu}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/create-character" 
                      className="block w-full text-center text-white text-lg font-medium py-3 border-b border-gray-800 hover:text-[#ff3979]"
                      onClick={toggleMenu}
                    >
                      Create Character
                    </Link>
                  </>
                )}
                <button 
                  onClick={() => {
                    connectWallet()
                    toggleMenu()
                  }} 
                  className="w-full rounded-lg bg-[#ff3979] hover:bg-[#5100ff] transition-colors duration-200 py-3 text-white text-lg font-medium border-none cursor-pointer mt-6"
                >
                  {isWalletConnected ? truncateAddress(walletAddress!) : 'Connect Wallet'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar