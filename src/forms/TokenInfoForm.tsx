import React from "react";

interface TokenData {
  name: string;
  symbol: string;
  supply: string;
  imageUrl: string;
  description: string;
  youtube: string;
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
}

interface TokenInfoFormProps {
  tokenData: TokenData;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  nextStep: () => void;
}

const TokenInfoForm: React.FC<TokenInfoFormProps> = ({
  tokenData,
  handleInputChange,
  nextStep,
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
        <label htmlFor="supply" className="block mb-2 font-bold">
          Token Supply*
        </label>
        <input
          type="text"
          id="supply"
          name="supply"
          value={tokenData.imageUrl}
          onChange={handleInputChange}
          required
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="e.g. The dankest coin in the market"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="imageUrl" className="block mb-2 font-bold">
          Token Image URL*
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={tokenData.imageUrl}
          onChange={handleInputChange}
          required
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="e.g. The dankest coin in the market"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="description" className="block mb-2 font-bold">
          Token Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={tokenData.description}
          onChange={handleInputChange}
          required
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="e.g. The dankest coin in the market"
        />
      </div>

      <div className="flex justify-end mt-8">
        <button type="button" onClick={nextStep} className="primary-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default TokenInfoForm;
