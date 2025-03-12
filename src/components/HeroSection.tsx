import React from "react";

interface HeroSectionProps {
  handleMint: () => Promise<void>;
  availableRobotos: number;
  totalRobotos: number;
  ethPrice: number;
}

const HeroSection = ({
  handleMint,
  availableRobotos,
  totalRobotos,
  ethPrice,
}: HeroSectionProps) => {
  return (
    <section
      id="hero"
      className="relative flex overflow-hidden min-h-screen flex-col justify-center items-center bg-red-600 text-white text-center"
    >
      <div className="relative flex w-full h-full px-4 py-16 flex-col justify-center items-center">
        {/* Hero Title */}
        <div className="relative flex flex-row justify-center items-center z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-right-grotesk tracking-tight mx-1">
            RO
          </h1>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-right-grotesk tracking-tight mx-1">
            BOT
          </h1>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-right-grotesk tracking-tight mx-1">
            OS
          </h1>
        </div>

        {/* Robot Images - positioned absolutely around the container */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Left Side Robots */}
          <img
            src="/api/placeholder/132/132"
            alt="Robot"
            className="absolute left-0 md:left-[2%] top-[20%] w-[12vw] md:w-[10vw] min-w-[80px] max-w-[132px] transform rotate-[20deg] z-0"
          />
          <img
            src="/api/placeholder/132/132"
            alt="Robot"
            className="absolute left-[14%] top-[33%] w-[14vw] md:w-[12vw] min-w-[80px] max-w-[132px] transform -rotate-[18deg] z-10"
          />
          <img
            src="/api/placeholder/132/132"
            alt="Robot"
            className="absolute left-[2%] top-[5%] w-[12vw] md:w-[10vw] min-w-[80px] max-w-[132px] transform rotate-[8deg] z-0"
          />
          <img
            src="/api/placeholder/132/132"
            alt="Robot"
            className="absolute left-[1vw] bottom-[25%] w-[14vw] md:w-[12vw] min-w-[80px] max-w-[132px] transform rotate-[20deg] z-10"
          />

          {/* Right Side Robots */}
          <img
            src="/api/placeholder/132/132"
            alt="Robot"
            className="absolute right-[12%] top-[5%] w-[12vw] md:w-[10vw] min-w-[80px] max-w-[132px] transform rotate-[8deg] z-0"
          />
          <img
            src="/api/placeholder/132/132"
            alt="Robot"
            className="absolute right-0 md:right-[2%] top-[28%] w-[14vw] md:w-[12vw] min-w-[80px] max-w-[132px] transform rotate-[20deg] z-10"
          />
          <img
            src="/api/placeholder/132/132"
            alt="Robot"
            className="absolute right-[24%] top-[23%] w-[14vw] md:w-[12vw] min-w-[80px] max-w-[132px] transform rotate-[10deg] z-10"
          />
          <img
            src="/api/placeholder/132/132"
            alt="Robot"
            className="absolute right-[12vw] bottom-[25%] w-[14vw] md:w-[12vw] min-w-[80px] max-w-[132px] transform -rotate-[14deg] scale-[0.8] z-10"
          />
          <img
            src="/api/placeholder/132/132"
            alt="Robot"
            className="absolute right-0 bottom-[20%] w-[14vw] md:w-[12vw] min-w-[80px] max-w-[132px] transform rotate-[14deg] z-10"
          />

          {/* Center Robots */}
          <img
            src="/api/placeholder/132/132"
            alt="Robot"
            className="absolute left-[45%] bottom-[10%] w-[10vw] md:w-[8vw] min-w-[80px] max-w-[132px] transform -rotate-[1deg] z-0"
          />
          <img
            src="/api/placeholder/132/132"
            alt="Robot"
            className="absolute left-[40%] bottom-[5%] w-[14vw] md:w-[12vw] min-w-[80px] max-w-[132px] transform -rotate-[23deg] z-10"
          />
        </div>

        {/* Call to Action */}
        <div className="relative z-20 mt-12 flex flex-col items-center">
          <button
            id="mint-button"
            className="px-8 py-4 md:px-10 md:py-5 border-4 md:border-8 border-black rounded-lg md:rounded-xl 
                       bg-blue-400 hover:bg-pink-500 shadow-[-4px_4px_0_0_#1f2024] hover:shadow-[-8px_8px_0_0_#1f2024] 
                       transition-all duration-200 transform hover:-translate-y-1 hover:translate-x-1
                       text-black hover:text-white text-xl md:text-2xl font-bold tracking-wider cursor-pointer"
            onClick={handleMint}
          >
            MINT ROBOTOS
          </button>

          <div className="mt-6 py-3 px-4 rounded-md bg-gray-100 text-gray-800 text-sm md:text-base leading-normal tracking-wider">
            <strong>
              {availableRobotos} of {totalRobotos} available
              <br />
            </strong>
            {ethPrice} ETH per roboto
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
