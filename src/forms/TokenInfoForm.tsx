import { useToast } from "@/hooks/toast";
import { TokenData } from "@/interfaces";
import React, { useRef, useState } from "react";


interface TokenInfoFormProps {
  tokenData: TokenData;
  customImage: File | null;
  customImagePreview: string | null;
  setCustomImage: React.Dispatch<React.SetStateAction<File | null>>;
  setCustomImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  nextStep: () => void;
}

const TokenInfoForm: React.FC<TokenInfoFormProps> = ({
  tokenData,
  customImage,
  customImagePreview,
  setCustomImage,
  handleFileChange,
  setCustomImagePreview,
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
        <div className="border-4 border-dashed border-gray-200 rounded-xl p-6 text-center mb-5 hover:border-primary/40 transition-colors">
          {customImagePreview ? (
            <div>
              <img
                src={customImagePreview}
                alt="Preview"
                className="max-w-[200px] max-h-[200px] mb-2 mx-auto rounded-lg border-2 border-gray-100"
              />
              <p className="text-gray-700">{customImage?.name}</p>
              <button
                type="button"
                onClick={() => {
                  setCustomImage(null);
                  setCustomImagePreview(null);
                }}
                className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Remove Image
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="image-upload"
                name="image-upload"
              />
            </div>
          ) : (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-300 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-500 mb-4">
                Drag & drop your image here, or click to browse
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="hidden"
                id="image-upload"
                name="image-upload"
              />
              <label htmlFor="image-upload">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                  className="bg-primary text-white px-5 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
                >
                  Upload Image
                </button>
              </label>
            </div>
          )}
        </div>
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
