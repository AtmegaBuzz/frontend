import { useNavigate } from 'react-router-dom'
import { FeaturedStreams, HowItWorks, Benefits, TokenStats, Footer } from '../components'

interface HomePageProps {
  isWalletConnected: boolean
  connectWallet: () => Promise<void>
}

const HomePage = ({ isWalletConnected, connectWallet }: HomePageProps) => {
  const navigate = useNavigate()

  const handleListToken = () => {
    if (!isWalletConnected) {
      connectWallet()
    } else {
      navigate('/list-token')
    }
  }

  const handleExplore = () => {
    navigate('/explore')
  }

  return (
    <main>
      {/* Hero Section */}
      <section id="hero" className="relative flex overflow-hidden h-screen flex-col justify-center items-center bg-heroRed text-white text-center">
        <div className="relative flex w-full h-full px-4 flex-col justify-center items-center">
          <div className="flex flex-col lg:flex-row justify-center items-center">
            <h1 className="text-[14vw] lg:text-[12vw] relative z-[1] mt-0 mb-0 text-white font-black cursor-pointer hover:text-[#eedf39]" style={{WebkitTextStroke: '5px #1f2024', textShadow: '-12px 12px 0 #1f2024'}}>SHILL</h1>
            <h1 className="text-[14vw] lg:text-[12vw] relative z-[2] mt-0 mb-0 text-white font-black cursor-pointer hover:text-[#5879ff]" style={{WebkitTextStroke: '5px #1f2024', textShadow: '-12px 12px 0 #1f2024'}}>TU</h1>
            <h1 className="text-[14vw] lg:text-[12vw] relative z-[3] mt-0 mb-0 text-white font-black cursor-pointer hover:text-[#ff55a2]" style={{WebkitTextStroke: '5px #1f2024', textShadow: '-12px 12px 0 #1f2024'}}>BE</h1>
          </div>
          
          <div className="max-w-[800px] mx-auto text-center z-10 relative px-5">
            <h2 className="text-white mb-5 drop-shadow-[2px_2px_0_#000]">
              AI-Powered Memecoin Entertainment Platform
            </h2>
            <p className="text-white text-lg mb-8 drop-shadow-[1px_1px_0_#000]">
              Transform your static memecoin into a dynamic, engaging AI personality that interacts with your community 24/7.
              Stand out in the crowded memecoin market with live entertainment and automated engagement.
            </p>
          </div>
          
          <div className="flex flex-row gap-5 z-10 relative">
            <button onClick={handleListToken} className="primary-button hero">
              LIST YOUR TOKEN
            </button>
            <button onClick={handleExplore} className="primary-button hero bg-secondary">
              EXPLORE STREAMS
            </button>
          </div>
          
          {/* Animated background elements */}
          <img src="/images/hero-image11.svg" loading="lazy" width="132" alt="" className="hero-image cr1" />
          {/*   <img src="/images/hero-image01.svg" loading="lazy" width="132" alt="" className="hero-image cl1" />*/}
          <img src="/images/hero-image10.svg" loading="eager" width="132" alt="" className="hero-image tr" />
          <img src="/images/hero-image04.svg" loading="eager" width="132" alt="" className="hero-image tl" />
        {/*  <img src="/images/hero-image07.svg" loading="lazy" width="132" alt="" className="hero-image cr2" /> */}
          <img src="/images/hero-image05.svg" loading="lazy" width="132" alt="" className="hero-image cl2" />
          <img src="/images/hero-image03.svg" loading="lazy" width="132" alt="" className="hero-image bl1" />
          <img src="/images/hero-image08.svg" loading="lazy" width="132" alt="" className="hero-image br1" />
          <img src="/images/hero-image09.svg" loading="lazy" width="132" alt="" className="hero-image br" />
          <img src="/images/hero-image06.svg" loading="lazy" width="132" alt="" className="hero-image bc" />
          <img src="/images/hero-image02.svg" loading="eager" width="132" alt="" className="hero-image" />
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
      
      {/* Footer Section */}
      <Footer />
    </main>
  )
}

export default HomePage