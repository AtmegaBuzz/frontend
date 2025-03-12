const HowItWorks = () => {
  const steps = [
    {
      title: "List Your Token",
      description:
        "Submit your memecoin information similar to how you would on Dexscreener, including contract address, token details, and social links.",
      icon: "/images/Body.svg",
    },
    {
      title: "Create Your Character",
      description:
        "Choose from VTuber-style templates or upload your own meme images. Our system will animate them and bring your token to life!",
      icon: "/images/Gradient Shades.svg",
    },
    {
      title: "Customize AI Personality",
      description:
        "Define your character's voice, personality traits, and interaction style based on your meme's origin story and brand.",
      icon: "/images/light.svg",
    },
    {
      title: "Go Live 24/7",
      description:
        "Launch your memecoin's automated live stream that engages with viewers, hosts events, and builds community around the clock.",
      icon: "/images/Helmet.svg",
    },
  ];

  return (
    <section className="bg-blue-dark py-12 md:py-24 relative overflow-hidden">
      {/* Left side images - hidden on mobile */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] hidden lg:block pointer-events-none">
        <img
          src="/images/hero-image04.svg"
          loading="lazy"
          alt=""
          className="absolute left-[15%] top-[-100px] w-[160px] rotate-[10deg] mix-blend-soft-light opacity-70"
        />
      </div>

      {/* Right side images - hidden on mobile */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] hidden lg:block pointer-events-none">
        <img
          src="/images/hero-image02.svg"
          loading="lazy"
          alt=""
          className="absolute right-[15%] top-[-80px] w-[150px] rotate-[-15deg] mix-blend-soft-light opacity-70"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-10 shadow-[-4px_4px_0_0_#1f2024]">
          <h2 className="text-center mb-8 md:mb-10 text-2xl md:text-3xl">How ShillTube Works</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="text-center flex flex-col items-center bg-white/50 rounded-lg p-4 md:p-0 md:bg-transparent"
              >
                <div className="mx-auto mb-4 md:mb-5 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="max-w-full max-h-full transform transition-transform hover:scale-110"
                  />
                </div>
                <h3 className="mb-2 md:mb-4 text-lg md:text-xl font-bold">{step.title}</h3>
                <p className="text-sm md:text-base text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
