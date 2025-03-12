import { useNavigate } from "react-router-dom";
import {
  FeaturedStreams,
  HowItWorks,
  Benefits,
  TokenStats,
} from "../components";

interface HomePageProps {
  connectWallet: () => Promise<void>;
}

const HomePage = ({}: HomePageProps) => {
  const navigate = useNavigate();

  const handleListToken = () => {
    // Direct navigation to the list token page without wallet check
    navigate("/list-token");
  };

  const handleExplore = () => {
    navigate("/explore");
  };

  return (
    <main>
      {/* Hero Section - Added proper padding for mobile to avoid navbar overlap */}
      <section
        id="hero"
        className="relative flex overflow-hidden h-screen flex-col justify-center items-center bg-heroRed text-white text-center pt-24 md:pt-0"
      >
        <div className="relative flex w-full h-full px-4 py-16 flex-col justify-center items-center">
          {/* Desktop title */}
          <div className="hidden md:flex flex-row justify-center items-center p-3">
            <h1
              className="text-[14vw] lg:text-[12vw] relative z-[1] mt-0 mb-0 text-white font-black cursor-pointer hover:text-[#eedf39]"
              style={{
                WebkitTextStroke: "5px #1f2024",
                textShadow: "-12px 12px 0 #1f2024",
              }}
            >
              SHILL
            </h1>
            <h1
              className="text-[14vw] lg:text-[12vw] relative z-[2] mt-0 mb-0 text-white font-black cursor-pointer hover:text-[#5879ff]"
              style={{
                WebkitTextStroke: "5px #1f2024",
                textShadow: "-12px 12px 0 #1f2024",
              }}
            >
              TU
            </h1>
            <h1
              className="text-[14vw] lg:text-[12vw] relative z-[3] mt-0 mb-0 text-white font-black cursor-pointer hover:text-[#ff55a2] pl-[3px]"
              style={{
                WebkitTextStroke: "5px #1f2024",
                textShadow: "-9px 10px 0 #1f2024",
              }}
            >
              BE
            </h1>
          </div>

          {/* Mobile version */}
          <div className="block md:hidden">
            {/* Mobile background images - single source of truth */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Top row */}
              <img
                src="/images/hero-image04.svg"
                loading="eager"
                alt=""
                className="absolute left-[5%] top-[15%] w-[15vw] max-w-[70px] rotate-[8deg] z-0"
              />
              <img
                src="/images/hero-image02.svg"
                loading="eager"
                alt=""
                className="absolute left-[50%] top-[12%] w-[15vw] max-w-[70px] -translate-x-1/2 rotate-[-5deg] z-0"
              />
              <img
                src="/images/hero-image10.svg"
                loading="eager"
                alt=""
                className="absolute right-[5%] top-[15%] w-[15vw] max-w-[70px] rotate-[-8deg] z-0"
              />

              {/* Middle row */}
              <img
                src="/images/hero-image05.svg"
                loading="lazy"
                alt=""
                className="absolute left-[8%] top-[52%] w-[15vw] max-w-[70px] rotate-[12deg] z-0"
              />
              <img
                src="/images/hero-image08.svg"
                loading="lazy"
                alt=""
                className="absolute right-[8%] top-[50%] w-[15vw] max-w-[70px] rotate-[-12deg] z-0"
              />

              {/* Bottom row */}
             
              
              <img
                src="/images/hero-image09.svg"
                loading="lazy"
                alt=""
                className="absolute right-[12%] bottom-[15%] w-[15vw] max-w-[70px] rotate-[8deg] z-0"
              />

              {/* Feature images with larger size */}
             
              
            </div>

            {/* Mobile main content */}
            <div className="mobile-main-content">
              {/* Mobile subtitle */}
              <div className="max-w-[800px] mx-auto text-center z-10 relative px-2 mt-20">
                <div className="bg-black/20 backdrop-blur-sm py-2 px-3 rounded-lg border border-white/20 inline-block">
                  <h2 className="text-white text-base font-bold uppercase tracking-wider drop-shadow-[1px_1px_0_#000]">
                    AI Memecoin Influencer Platform
                  </h2>
                </div>
              </div>

              {/* Mobile title */}
              <div className="flex flex-col justify-center items-center p-3 mt-4">
                <h1
                  className="text-[22vw] relative z-[1] m-0 text-[#eedf39] font-black cursor-pointer leading-[0.8]"
                  style={{
                    WebkitTextStroke: "3px #1f2024",
                    textShadow: "-6px 6px 0 #1f2024",
                  }}
                >
                  SHILL
                </h1>
                <div className="flex -mt-[0.5vw]">
                  <h1
                    className="text-[22vw] relative z-[2] m-0 text-white font-black cursor-pointer hover:text-[#5879ff] leading-[0.8]"
                    style={{
                      WebkitTextStroke: "3px #1f2024",
                      textShadow: "-6px 6px 0 #1f2024",
                    }}
                  >
                    TU
                  </h1>
                  <h1
                    className="text-[22vw] relative z-[3] m-0 text-white font-black cursor-pointer hover:text-[#ff55a2] pl-[3px] leading-[0.8]"
                    style={{
                      WebkitTextStroke: "3px #1f2024",
                      textShadow: "-6px 6px 0 #1f2024",
                    }}
                  >
                    BE
                  </h1>
                </div>
              </div>

              {/* Mobile secondary content */}
              <div className="max-w-[800px] mx-auto text-center z-10 relative px-2 mt-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="h-[2px] w-[30px] bg-white/50"></div>
                  <p className="text-sm text-white font-medium">
                    24/7 Interactive Entertainment
                  </p>
                  <div className="h-[2px] w-[30px] bg-white/50"></div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-5 max-w-[280px] mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm p-2 rounded border border-white/20 text-white text-xs">
                    <div className="text-lg font-bold">🎭</div>
                    <div>AI Characters</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-2 rounded border border-white/20 text-white text-xs">
                    <div className="text-lg font-bold">🎬</div>
                    <div>Live Streams</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-2 rounded border border-white/20 text-white text-xs">
                    <div className="text-lg font-bold">🚀</div>
                    <div>Community</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop subtitle and description */}
          <div className="max-w-[800px] mx-auto text-center z-10 relative px-5 hidden md:block">
            <h2 className="text-white mb-5 drop-shadow-[2px_2px_0_#000]">
              AI-Powered Memecoin Entertainment Platform
            </h2>
            <p className="text-white text-lg mb-8 drop-shadow-[1px_1px_0_#000]">
              Transform your static memecoin into a dynamic, engaging AI
              personality that interacts with your community 24/7. Stand out in
              the crowded memecoin market with live entertainment and automated
              engagement.
            </p>
          </div>

          {/* Desktop buttons */}
          <div className="hidden md:flex md:flex-row gap-5 z-10 relative">
            <button onClick={handleListToken} className="primary-button hero">
              LIST YOUR TOKEN
            </button>
            <button
              onClick={handleExplore}
              className="primary-button hero bg-secondary"
            >
              EXPLORE STREAMS
            </button>
          </div>

          {/* Improved mobile buttons with consistent sizing and spacing */}
          <div className="flex flex-col md:hidden gap-4 z-10 relative w-full max-w-[280px]">
            <button 
              onClick={handleListToken} 
              className="mobile-hero-button bg-lightBlue text-black hover:bg-[#ff00a1] hover:text-white"
            >
              LIST YOUR TOKEN
            </button>
            <button
              onClick={handleExplore}
              className="mobile-hero-button bg-secondary text-white"
            >
              EXPLORE STREAMS
            </button>
          </div>

          {/* Remove the mobile-only stats counter section from here */}

          {/* Desktop background images */}
          <div className="hidden md:block">
            <img
              src="/images/hero-image11.svg"
              loading="lazy"
              width="132"
              alt=""
              className="hero-image cr1"
            />
            <img
              src="/images/hero-image10.svg"
              loading="eager"
              width="132"
              alt=""
              className="hero-image tr"
            />
            <img
              src="/images/hero-image04.svg"
              loading="eager"
              width="132"
              alt=""
              className="hero-image tl"
            />
            <img
              src="/images/hero-image05.svg"
              loading="lazy"
              width="132"
              alt=""
              className="hero-image cl2"
            />
            <img
              src="/images/hero-image03.svg"
              loading="lazy"
              width="132"
              alt=""
              className="hero-image bl1"
            />
            <img
              src="/images/hero-image08.svg"
              loading="lazy"
              width="132"
              alt=""
              className="hero-image br1"
            />
            <img
              src="/images/hero-image09.svg"
              loading="lazy"
              width="132"
              alt=""
              className="hero-image br"
            />
            <img
              src="/images/hero-image06.svg"
              loading="lazy"
              width="132"
              alt=""
              className="hero-image bc"
            />
            <img
              src="/images/hero-image02.svg"
              loading="eager"
              width="132"
              alt=""
              className="hero-image"
            />
          </div>

          {/* Better positioned mobile background images */}
          <div className="block md:hidden absolute inset-0 overflow-hidden">
            {/* Top row */}
           
            <img
              src="/images/hero-image02.svg"
              loading="eager"
              alt=""
              className="absolute left-[50%] top-[12%] w-[15vw] max-w-[70px] -translate-x-1/2 rotate-[-5deg] z-0"
            />
            <img
              src="/images/hero-image10.svg"
              loading="eager"
              alt=""
              className="absolute right-[5%] top-[15%] w-[15vw] max-w-[70px] rotate-[-8deg] z-0"
            />

            {/* Middle row */}
           
          

            {/* Bottom row */}
            <img
              src="/images/hero-image03.svg"
              loading="lazy"
              alt=""
              className="absolute left-[12%] bottom-[15%] w-[15vw] max-w-[70px] rotate-[-8deg] z-0"
            />
            <img
              src="/images/hero-image06.svg"
              loading="lazy"
              alt=""
              className="absolute left-[50%] bottom-[10%] w-[15vw] max-w-[70px] -translate-x-1/2 rotate-[5deg] z-0"
            />
            <img
              src="/images/hero-image09.svg"
              loading="lazy"
              alt=""
              className="absolute right-[12%] bottom-[15%] w-[15vw] max-w-[70px] rotate-[8deg] z-0"
            />

            {/* Feature images with larger size */}
            <img
              src="/images/hero-image11.svg"
              loading="lazy"
              alt=""
              className="absolute left-[25%] top-[1%] w-[18vw] max-w-[85px] rotate-[15deg] z-[1]"
            />
            <img
              src="/images/hero-image02.svg"
              loading="eager"
              alt=""
              className="absolute right-[25%] top-[1%] w-[18vw] max-w-[85px] rotate-[-15deg] z-[1]"
            />
          </div>
        </div>
      </section>

      {/* Featured Live Streams Section */}
      <FeaturedStreams />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Benefits Section */}
      <Benefits />

      {/* Token Statistics Section */}
      <TokenStats />
    </main>
  );
};

export default HomePage;