import React from 'react'

interface TokenData {
  name: string
  symbol: string
  contractAddress: string
  chain: string
  description: string
  website: string
  twitter: string
  telegram: string
  discord: string
  email: string
}

interface TokenInfoFormProps {
  tokenData: TokenData
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  nextStep: () => void
}

const TokenInfoForm: React.FC<TokenInfoFormProps> = ({
  tokenData,
  handleInputChange,
  nextStep
}) => {
  return (
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
  )
}

export default TokenInfoForm