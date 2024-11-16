import { useState, useContext } from 'react';
import { walletContext } from '../context/walletContext'; // adjust this import based on your file structure

// Custom hook to get wallet balance
const useWalletBalance = () => {
  const { setWalletBalance, } = useContext(walletContext);
  const [walletBalance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const getWalletBal = async (address: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_SERVER_API_ORIGIN}/wallet/${address}`);
      const data = await res.json();
      
      setBalance(data?.balance || '0');
      setWalletBalance(data?.balance || '0');
      setIsNewUser(data?.newUser || false);
      
      return data?.balance || '0';
    } catch (err) {
      console.error('Error fetching wallet balance:', err);
      setError('Failed to fetch wallet balance');
      return '0';
    } finally {
      setLoading(false);
    }
  };

  return {
    walletBalance,
    loading,
    error,
    isNewUser,
    getWalletBal,
  };
};

export default useWalletBalance;
