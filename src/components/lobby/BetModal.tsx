import React, { useContext, useEffect, useState } from 'react';
import { X, Wallet, Plus, Minus } from 'lucide-react';
import walletContext from '../../contexts/WalletContext'
import { useSDK } from '@metamask/sdk-react';
import { ethers } from 'ethers';
interface BetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (betAmount: number) => void;
}

const BetModal: React.FC<BetModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [betAmount, setBetAmount] = useState<number>(50);
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [error, setError] = useState<string>('');
  // const [connected, setConnected] = useState(false);

  const [userAccount, setUserAccount] = useState('');
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
 

  const { walletData,setWalletAddress, setWalletBalance } = useContext(walletContext);
  const { sdk, connected, connecting, account, chainId, provider } = useSDK();


  const {WalletBalance, walletAddress} = walletData;

  const MIN_BET = 50;
  const MAX_BET = 10000;

  const validateBetAmount = (amount: number) => {
    if (amount < MIN_BET) {
      return `Minimum bet amount is $${MIN_BET}`;
    }
    if (amount > MAX_BET) {
      return `Maximum bet amount is $${MAX_BET}`;
    }
    if(amount>WalletBalance)
    {
      return `Insufficient Wallet balance`
    }
    return '';
  };

  const handleIncrease = () => {
    const newAmount = Math.min(betAmount + 50, MAX_BET);
    setBetAmount(newAmount);
    setError(validateBetAmount(newAmount));
  };

  const handleDecrease = () => {
    const newAmount = Math.max(betAmount - 50, MIN_BET);
    setBetAmount(newAmount);
    setError(validateBetAmount(newAmount));
  };

  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numValue = value === '' ? 0 : parseInt(value, 10);
    setBetAmount(numValue);
    setError(validateBetAmount(numValue));
  };

  const handleConfirm = () => {
    const validationError = validateBetAmount(betAmount);
    if (!validationError) {
      onConfirm(betAmount);
    }
  };

  const isPlayDisabled = !connected || !!validateBetAmount(betAmount);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Place Your Bet</h2>

        {/* Bet Amount Selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-4">
            Bet Amount (${MIN_BET} - ${MAX_BET})
          </label>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleDecrease}
              className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <div className="w-40 h-16 bg-gray-700 rounded-xl flex items-center justify-center px-4">
              <div className="flex items-center justify-between w-full gap-2">
                <span className="text-2xl font-bold">$</span>
                <input
                  type="text"
                  value={betAmount}
                  className="text-2xl font-bold w-28 bg-gray-700 rounded-xl outline-none text-right"
                  onChange={handleBetChange}
                  maxLength={5}
                />
              </div>
            </div>
            <button
              onClick={handleIncrease}
              className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          {error && (
            <p className="text-red-400 text-sm mt-2 text-center">
              {error}
            </p>
          )}
        </div>

        {/* Wallet Connection */}
{/* {!walletAddress &&        <div className="mb-8">
          <button
            onClick={handleConnectWallet}
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
              isWalletConnected
                ? 'bg-green-500/20 text-green-400 cursor-default'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Wallet className="w-5 h-5" />
            {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
          </button>
          {!isWalletConnected && (
            <p className="text-yellow-400 text-sm mt-2 text-center">
              Connect wallet to continue
            </p>
          )}
        </div>} */}

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={isPlayDisabled}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isPlayDisabled
              ? 'bg-gray-600 cursor-not-allowed opacity-50'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          Confirm Bet & Play
        </button>
      </div>
    </div>
  );
};

export default BetModal;