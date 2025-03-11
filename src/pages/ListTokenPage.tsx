import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ListTokenPageProps {
  isWalletConnected: boolean
  connectWallet: () => Promise<void>
  walletAddress: string | null
}

const ListTokenPage = ({ isWalletConnected, connectWallet, walletAddress }: ListTokenPageProps) => {
  const navigate = useNavigate()
  const [tokenData, setTokenData] = useState({
    name: '',
    symbol: '',
    contractAddress: '',
    chain: 'ethereum',
    description: '',
    website: '',
    twitter: '',
    telegram: '',
    discord: '',
    email: ''
  })
  const [formStep, setFormStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTokenData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isWalletConnected) {
      await connectWallet()
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      navigate('/create-character')
    }, 1500)
  }

  const nextStep = () => {
    setFormStep(prev => prev + 1)
  }

  const prevStep = () => {
    setFormStep(prev => prev - 1)
  }

  return (
    <section className="bg-yellow bg-pattern pt-24 pb-20">
      <div className="container max-w-[800px] mx-auto px-4">
        <div className="border-8 border-black rounded-3xl bg-white shadow-[-3px_3px_0_0_#1f2024] p-10 text-left">
          <h1 className="text-center mb-10">List Your Memecoin</h1>
          
          {!isWalletConnected ? (
            <div className="text-center">
              <p>Please connect your wallet to list your memecoin.</p>
              <button onClick={connectWallet} className="primary-button mt-5">
                Connect Wallet
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {formStep === 1 && (
                <div>
                  <h3>Token Information</h3>
                  <p>Enter your memecoin's basic information.</p>
                  
                  <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 font-bold">
                      Token Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={tokenData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
                      placeholder="e.g. Pepe Coin"
                    />
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="symbol" className="block mb-2 font-bold">
                      Token Symbol*
                    </label>
                    <input
                      type="text"
                      id="symbol"
                      name="symbol"
                      value={tokenData.symbol}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
                      placeholder="e.g. PEPE"
                    />
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="contractAddress" className="block mb-2 font-bold">
                      Contract Address*
                    </label>
                    <input
                      type="text"
                      id="contractAddress"
                      name="contractAddress"
                      value={tokenData.contractAddress}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
                      placeholder="0x..."
                    />
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="chain" className="block mb-2 font-bold">
                      Blockchain*
                    </label>
                    <select
                      id="chain"
                      name="chain"
                      value={tokenData.chain}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
                    >
                      <option value="ethereum">Ethereum</option>
                      <option value="bsc">Binance Smart Chain</option>
                      <option value="polygon">Polygon</option>
                      <option value="arbitrum">Arbitrum</option>
                      <option value="optimism">Optimism</option>
                      <option value="base">Base</option>
                      <option value="solana">Solana</option>
                    </select>
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 font-bold">
                      Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={tokenData.description}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 rounded-lg border-2 border-gray-300 text-base min-h-[100px] resize-y"
                      placeholder="Tell us about your memecoin"
                    />
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <button 
                      type="button" 
                      onClick={nextStep}
                      className="primary-button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              
              {formStep === 2 && (
                <div>
                  <h3>Social Links</h3>
                  <p>Add your social media and community links.</p>
                  
                  <div className="mb-5">
                    <label htmlFor="website" className="block mb-2 font-bold">
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={tokenData.website}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
                      placeholder="https://your-website.com"
                    />
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="twitter" className="block mb-2 font-bold">
                      Twitter/X
                    </label>
                    <input
                      type="text"
                      id="twitter"
                      name="twitter"
                      value={tokenData.twitter}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
                      placeholder="@username"
                    />
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="telegram" className="block mb-2 font-bold">
                      Telegram
                    </label>
                    <input
                      type="text"
                      id="telegram"
                      name="telegram"
                      value={tokenData.telegram}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
                      placeholder="t.me/your-group"
                    />
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="discord" className="block mb-2 font-bold">
                      Discord
                    </label>
                    <input
                      type="text"
                      id="discord"
                      name="discord"
                      value={tokenData.discord}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
                      placeholder="discord.gg/your-invite"
                    />
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 font-bold">
                      Contact Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={tokenData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <button 
                      type="button" 
                      onClick={prevStep}
                      className="primary-button bg-gray-300"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      className="primary-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Continue to Character Creation'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default ListTokenPage