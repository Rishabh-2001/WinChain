import React, { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';  // Assuming this is for your wallet icon
import { ethers } from 'ethers';

const WalletButton = ({setConnected, setUserAccount}) => {
  const [account, setAccount] = useState('');   // Stores user wallet address
  const [connecting, setConnecting] = useState(false);     // To show loading state
  const [error, setError] = useState(null); 

  // Function to connect wallet using MetaMask
  const connectWallet = async () => {
    // Check if MetaMask is available in the browser
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install MetaMask to use this.");
      return;
    }

    setConnecting(true); // Start the loading state
    setError(null);      // Clear any previous errors

    try {
      // Requesting user's MetaMask account
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Requesting the user to connect their MetaMask account
      await provider.send("eth_requestAccounts", []);

      // Getting the address of the connected wallet
      const userAddress = await signer.getAddress();
      setUserAccount(userAddress); // Update the state with the connected account
      setAccount(userAddress)
      setConnected(true);
    } catch (err) {
      console.error("Error connecting wallet", err);
      setError("Failed to connect wallet. Please try again.");
    } finally {
      setConnecting(false); // End loading state
    }
  };

   
 
  // Display the account in shortened format
  const renderAccount = () => {
    if (!account) return null;
    return `${account.slice(0, 6)}...${account.slice(-4)}`;
  };

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}  {/* Display error if any */}
      
      <button 
        onClick={connectWallet}
        disabled={connecting}
        className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
          account 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : connecting 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        <Wallet className="h-5 w-5" />
        
        <span className="hidden sm:inline">
          {connecting ? 'Connecting...' : account ? renderAccount() : 'Connect Wallet'}
        </span>
        
        <span className="sm:hidden">
          {connecting ? '...' : account ? `${account.slice(0, 4)}...` : 'Connect'}
        </span>
      </button>
    </div>
  );
};

export default WalletButton;
