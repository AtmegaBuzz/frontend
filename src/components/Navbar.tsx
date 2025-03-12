import { div } from "framer-motion/client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  isWalletConnected: boolean;
  connectWallet: () => Promise<void>;
  walletAddress: string | null;
}

const Navbar = ({
  isWalletConnected,
  connectWallet,
  walletAddress,
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Check if we're on mobile and update on resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIsMobile();

    // Add event listener
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest("nav") &&
        !target.closest('button[aria-label="Menu"]')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleListTokenClick = () => {
    navigate("/list-token");
    setIsMenuOpen(false);
  };

  const handleNavLinkClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="fixed left-0 top-0 right-0 z-50">
      <div className="flex justify-between md:justify-center lg:justify-center p-4 max-w-[940px] mx-auto">
        {/* Logo section - always visible */}
        <Link
          to="/"
          className="flex items-center pl-4 border-r border-[#494949] rounded-l-lg bg-black text-white h-14 pr-0 md:pr-7  lg:pr-7 "
        >
          <img
            src="/images/icon-256w.png"
            loading="lazy"
            height="32"
            width="32"
            alt="ShillTube Logo"
            className="mr-3"
          />
          <div className="text-white text-base hidden sm:block">ShillTube</div>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          aria-label="Menu"
          className="md:hidden flex items-center justify-center p-2 text-white bg-black rounded-lg h-14"
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
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Desktop navigation */}
        <nav
          className={`hidden md:flex items-center pr-3 rounded-r-lg bg-black text-white h-14`}
        >
          <Link
            to="/explore"
            className="px-4 py-2 text-white text-base hover:text-yellow-400"
          >
            Explore
          </Link>
          <button
            onClick={handleListTokenClick}
            className="px-4 py-2 text-white text-base hover:text-yellow-400 bg-transparent border-none cursor-pointer"
          >
            List Token
          </button>
          {isWalletConnected && (
            <Link
              to="/dashboard"
              className="px-4 py-2 text-white text-base hover:text-yellow-400"
            >
              Dashboard
            </Link>
          )}
          <button
            onClick={connectWallet}
            className="rounded-lg bg-[#ff3979] hover:bg-[#5100ff] transition-colors duration-200 py-2 px-4 text-white border-none cursor-pointer ml-3 text-base whitespace-nowrap"
          >
            {isWalletConnected
              ? truncateAddress(walletAddress!)
              : "Connect Wallet"}
          </button>
        </nav>
      </div>

      {/* Mobile navigation - conditionally rendered */}
      {isMobile && isMenuOpen && (
        <div>
          <div className="absolute top-[4.5rem] left-0 right-0 bg-black bg-opacity-95 shadow-lg rounded-b-lg overflow-hidden transition-all duration-300 z-40 m-[1rem]">
            <div className="flex flex-col p-4 space-y-4">
              <Link
                to="/explore"
                className="px-4 py-3 text-white text-base hover:text-yellow-400 hover:bg-gray-800 rounded-lg items-center"
                onClick={handleNavLinkClick}
              >
                Explore
              </Link>
              <button
                onClick={handleListTokenClick}
                className="px-4 py-3 text-white text-base hover:text-yellow-400 hover:bg-gray-800 rounded-lg text-left bg-transparent border-none cursor-pointer"
              >
                List Token
              </button>
              {isWalletConnected && (
                <Link
                  to="/dashboard"
                  className="px-4 py-3 text-white text-base hover:text-yellow-400 hover:bg-gray-800 rounded-lg"
                  onClick={handleNavLinkClick}
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={connectWallet}
                className="rounded-lg bg-[#ff3979] hover:bg-[#5100ff] transition-colors duration-200 py-3 px-4 text-white border-none cursor-pointer text-base"
              >
                {isWalletConnected
                  ? truncateAddress(walletAddress!)
                  : "Connect Wallet"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
