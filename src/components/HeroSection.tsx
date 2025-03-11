interface HeroSectionProps {
  handleMint: () => Promise<void>
  availableRobotos: number
  totalRobotos: number
  ethPrice: number
}

const HeroSection = ({ handleMint, availableRobotos, totalRobotos, ethPrice }: HeroSectionProps) => {
  return (
    <section id="hero" className="relative flex overflow-hidden h-[600px] flex-col justify-center items-center bg-heroRed text-white text-center">
      <div className="relative flex w-full h-full px-4 flex-col justify-center items-center">
        <div className="relative flex flex-row justify-center items-center">
          <h1 data-w-id="00c96275-55a4-2839-457b-174c20d342ba" className="hero-heading">RO</h1>
          <h1 data-w-id="05403c22-9edc-3396-a166-65e341238f5f" className="hero-heading _2">BOT</h1>
          <h1 data-w-id="9ba4421c-680f-a582-cabf-bc277cad9bba" className="hero-heading _3">OS</h1>
        </div>
        
        {/* Robot Images - in a real implementation, these would be proper image files */}
        <img src="/images/hero-image11.svg" loading="lazy" width="132" alt="" className="hero-image cr1" />
        <img src="/images/hero-image01.svg" loading="lazy" width="132" alt="" className="hero-image cl1" />
        <img src="/images/hero-image10.svg" loading="eager" width="132" alt="" className="hero-image tr" />
        <img src="/images/hero-image04.svg" loading="eager" width="132" alt="" className="hero-image tl" />
        <img src="/images/hero-image07.svg" loading="lazy" width="132" alt="" className="hero-image cr2" />
        <img src="/images/hero-image05.svg" loading="lazy" width="132" alt="" className="hero-image cl2" />
        <img src="/images/hero-image03.svg" loading="lazy" width="132" alt="" className="hero-image bl1" />
        <img src="/images/hero-image08.svg" loading="lazy" width="132" alt="" className="hero-image br1" />
        <img src="/images/hero-image09.svg" loading="lazy" width="132" alt="" className="hero-image br" />
        <img src="/images/hero-image06.svg" loading="lazy" width="132" alt="" className="hero-image bc" />
        <img src="/images/hero-image02.svg" loading="eager" width="132" alt="" className="hero-image" />
        
        <button id="mint-button" className="primary-button hero" onClick={handleMint}>
          MINT ROBOTOS
        </button>
        
        <div className="mt-6 py-3 px-4 rounded-md bg-[#f3f2ed] text-black/80 text-sm leading-normal tracking-wider">
          <strong>{availableRobotos} of {totalRobotos} available<br /></strong>
          {ethPrice} ETH per roboto
        </div>
      </div>
    </section>
  )
}

export default HeroSection