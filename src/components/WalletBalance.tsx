import React, { useState, useEffect, useContext } from 'react';
import { ChevronDown, ArrowUpToLine, ArrowDownToLine } from 'lucide-react';
import TransactionModal from './TransactionModal';
import walletContext from '../contexts/WalletContext'

const WalletBalance = ({ connected, userAccount, setIsNewUser, balance, setBalance }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalType, setModalType] = useState<'deposit' | 'withdraw' | null>(null);
  const {
    setWalletBalance, walletData} = useContext(walletContext);
   const {walletBalance} = walletData;
  const getWalletBal = async (address: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_SERVER_API_ORIGIN}/wallet/${address}`);
      const data = await res.json();
      setBalance(data?.balance);
      setWalletBalance(data?.balance)
      setIsNewUser(data?.newUser);
      return data.balance || '0';
    } catch (err) {
      console.error('Error fetching wallet balance:', err);
      setError('Failed to fetch wallet balance');
      return '0';
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connected && userAccount) {
      getWalletBal(userAccount);
    }
  }, [userAccount, connected]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.wallet-dropdown')) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleDeposit = () => {
    setModalType('deposit');
    setShowOptions(false);
  };

  const handleWithdraw = () => {
    setModalType('withdraw');
    setShowOptions(false);
  };

  const renderAccount = (account: string) => {
    if (!account) return null;
    return `${account.slice(0, 6)}...${account.slice(-4)}`;
  };

  const handleTransactionSuccess = () => {
    if (userAccount) {
      getWalletBal(userAccount);
    }
  };

  return (
    <>
      <div className="relative wallet-dropdown">
        {loading ? (
          <div className="px-4 py-2 rounded-lg bg-gray-800 text-gray-400 animate-pulse">
            Loading...
          </div>
        ) : error ? (
          <div className="px-4 py-2 rounded-lg bg-red-900/50 text-red-300">
            {error}
          </div>
        ) : (
          <button
            onClick={handleOptions}
            className="group w-full lg:w-auto px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-2 transition-all duration-200"
          >
            <span className="px-3 py-1.5 rounded-md text-sm bg-green-600/80 group-hover:bg-green-600 transition-colors">
              {renderAccount(userAccount)}
            </span>
            <span className="font-medium">{walletBalance}</span>
            <ChevronDown 
              className={`h-4 w-4 transition-transform duration-200 ${showOptions ? 'rotate-180' : ''}`} 
            />
          </button>
        )}

        {showOptions && (
          <div 
            className={`
              lg:absolute lg:right-0 lg:w-48 mt-2 
              w-full rounded-lg overflow-hidden shadow-lg 
              bg-gray-800 ring-1 ring-black ring-opacity-5 
              z-50 animate-enter
            `}
          >
            <div className="py-1">
              <button
                onClick={handleDeposit}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 w-full transition-colors"
              >
                <ArrowDownToLine className="h-4 w-4 text-green-400" />
                <span>Deposit Tokens</span>
              </button>
              <button
                onClick={handleWithdraw}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 w-full transition-colors"
              >
                <ArrowUpToLine className="h-4 w-4 text-red-400" />
                <span>Withdraw Tokens</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <TransactionModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType || 'deposit'}
        userAccount={userAccount}
        onSuccess={handleTransactionSuccess}
      />
    </>
  );
};

export default WalletBalance;