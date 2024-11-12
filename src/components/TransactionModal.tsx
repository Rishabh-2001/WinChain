import React, { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'deposit' | 'withdraw';
  userAccount: string;
  onSuccess: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  type,
  userAccount,
  onSuccess,
}) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
  
    setLoading(true);
  
    try {
      const requestBody = {
        walletAddress: userAccount,
        amount: parseFloat(amount),
      };
  
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_ORIGIN}${type}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      const data = response.data;
      console.log('data', data);
  
      if (response.status !== 200) {
        throw new Error(data.message || `Failed to ${type}`);
      }
  
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} successful!`);
  
      onSuccess();
      onClose();
      setAmount('');
    } catch (error: any) {
      toast.error(error.message || `Failed to ${type}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[5vh] px-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md relative animate-enter z-10">
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 p-2 bg-gray-800 text-gray-400 hover:text-white rounded-full transition-all duration-200 hover:bg-gray-700 hover:scale-110"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-xl font-bold text-white mb-6">
          {type.charAt(0).toUpperCase() + type.slice(1)} Tokens
        </h2>

        <form onSubmit={handleTransaction} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
              Amount
            </label>
            <div className="relative">
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.000001"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="0.00"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200
              ${loading 
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-lg transform hover:-translate-y-0.5'
              }
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              `${type.charAt(0).toUpperCase() + type.slice(1)} Tokens`
            )}
          </button>
        </form>

        <p className="mt-2 text-sm text-gray-400 text-center">
          Transaction will be processed on the blockchain
        </p>
      </div>
    </div>
  );
};

export default TransactionModal;