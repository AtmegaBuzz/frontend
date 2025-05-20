import { useState } from "react";
import { AIToken } from "../types";
import { useWriteContract } from "wagmi";
import { ABI } from "../abi";
import { parseEther } from "viem";

// TypeScript interfaces
interface TokenInfo {
  tokenName: string;
  symbol: string;
  contractAddress: string;
}

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenInfo: AIToken;
  onBuy: (amount: string) => void;
}

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenInfo: TokenInfo;
  currentPrice: string;
  tokenBalance: string;
  estimatedReturn: string;
  onSell: (amount: string) => void;
  isLoading: boolean;
}

// Buy Modal Component
export const BuyModal: React.FC<BuyModalProps> = ({
  isOpen,
  onClose,
  tokenInfo,
  onBuy,
}) => {
  const [amount, setAmount] = useState<string>("");

  if (!isOpen) return null;

  const { writeContract } = useWriteContract();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    writeContract({
      abi: ABI,
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      functionName: 'buyTokens',
      args: [
        tokenInfo.contractAddress,
        0
      ],
      value: parseEther("0.01")
    })

    onClose();

    onBuy(amount);
  };

  //   const estimatedTokens =
  //     parseFloat(amount) > 0 && parseFloat(currentPrice) > 0
  //       ? parseFloat(amount) / parseFloat(currentPrice)
  //       : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">
          Buy {tokenInfo.tokenName} ({tokenInfo.symbol})
        </h3>

        <div className="mb-4 space-y-2">
          <p className="text-gray-300">
            {/* Current Price: {currentPrice} ETH per {tokenInfo.symbol} */}
          </p>
          {/* <p className="text-gray-300">Your ETH Balance: {ethBalance} ETH</p> */}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Amount in CELO:</label>
            <input
              type="number"
              step="0.000001"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAmount(e.target.value)
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              placeholder="Enter ETH amount"
            //   disabled={isLoading}
            />
          </div>

          {/* Estimated tokens */}
          {/* {parseFloat(amount) > 0 && (
            <div className="mb-4 p-2 bg-gray-700 rounded-md">
              <p className="text-gray-300">
                Estimated tokens: ~{estimatedTokens.toFixed(6)}{" "}
                {tokenInfo.symbol}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                (Actual amount may vary due to slippage and gas fees)
              </p>
            </div>
          )} */}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-md"
            //   disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-bold"
              disabled={!amount || parseFloat(amount) <= 0}
            >
              {"Buy"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Sell Modal Component
export const SellModal: React.FC<SellModalProps> = ({
  isOpen,
  onClose,
  tokenInfo,
  currentPrice,
  tokenBalance,
  estimatedReturn,
  onSell,
  isLoading,
}) => {
  const [amount, setAmount] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSell(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">
          Sell {tokenInfo.tokenName} ({tokenInfo.symbol})
        </h3>

        <div className="mb-4 space-y-2">
          <p className="text-gray-300">
            Current Price: {currentPrice} ETH per {tokenInfo.symbol}
          </p>
          <p className="text-gray-300">
            Your {tokenInfo.symbol} Balance: {tokenBalance} {tokenInfo.symbol}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">
              Amount in {tokenInfo.symbol}:
            </label>
            <input
              type="number"
              step="0.000001"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAmount(e.target.value)
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              placeholder={`Enter ${tokenInfo.symbol} amount`}
              disabled={isLoading}
            />
          </div>

          {/* Estimated return */}
          {parseFloat(amount) > 0 && (
            <div className="mb-4 p-2 bg-gray-700 rounded-md">
              <p className="text-gray-300">
                Estimated return: ~{estimatedReturn} ETH
              </p>
              <p className="text-xs text-gray-400 mt-1">
                (Actual return may vary due to slippage and gas fees)
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-md"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-bold"
              disabled={
                isLoading ||
                !amount ||
                parseFloat(amount) <= 0 ||
                parseFloat(amount) > parseFloat(tokenBalance)
              }
            >
              {isLoading ? "Processing..." : "Sell"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Don't forget to add the useState import at the top of your file:
// import React, { useState } from 'react';