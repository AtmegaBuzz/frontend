import ImageUpload from "@/components/ImageUpload";
import { useToast } from "@/hooks/toast";
import { TokenData } from "@/interfaces";
import React, { useRef, useState } from "react";


interface TokenInfoFormProps {
  tokenData: TokenData;
  onFileChange: React.Dispatch<React.SetStateAction<File | null>>;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  nextStep: () => void;
}

const TokenInfoForm: React.FC<TokenInfoFormProps> = ({
  tokenData,
  onFileChange,
  handleInputChange,
  nextStep,
}) => {

  const formRef = useRef<HTMLFormElement>(null);

  const { toast } = useToast();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); // Prevent default form submission

    if (!formRef.current?.checkValidity()) {
      toast({
        type: "warning",
        message: "Please fill all the required details!",
        duration: 3000
      })
      return;
    }

    nextStep();
  };


  return (
    <form ref={formRef}>
      <h3>Token Information</h3>
      <p>Enter your memecoin's basic information.</p>

      <div className="my-5">
        <label htmlFor="tokenName" className="block mb-2 font-bold">
          Token Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="tokenName"
          name="tokenName"
          value={tokenData.tokenName}
          onChange={handleInputChange}
          required
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="e.g. Pepe Coin"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="symbol" className="block mb-2 font-bold">
          Token Symbol <span className="text-red-500">*</span>
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
          Token Supply <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="supply"
          name="supply"
          value={tokenData.supply}
          onChange={handleInputChange}
          min={1}
          required
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="1d"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="image-upload" className="block mb-2 font-bold">
          Token Image URL <span className="text-red-500">*</span>
        </label>
        <ImageUpload onImageSelect={onFileChange} />

      </div>

      <div className="mb-5">
        <label htmlFor="tokenDescription" className="block mb-2 font-bold">
          Token Description <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="tokenDescription"
          name="tokenDescription"
          value={tokenData.tokenDescription}
          onChange={handleInputChange}
          required
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="e.g. The dankest coin in the market"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="contractAddress" className="block mb-2 font-bold">
          Token Contract Address
        </label>
        <input
          type="text"
          id="contractAddress"
          name="contractAddress"
          value={tokenData.contractAddress!}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="0x..."
        />
      </div>

      <div className="flex justify-end mt-8">
        <button type="button" onClick={(e) => handleSubmit(e)} className="primary-button">
          Next
        </button>
      </div>
    </form>
  );
};

export default TokenInfoForm;
