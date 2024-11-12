import React from 'react';
import { Wallet } from 'lucide-react';
import { useSDK } from '@metamask/sdk-react';
import { ethers } from 'ethers';

interface WalletButtonProps {
  setConnected?: (connected: boolean) => void;
  setUserAccount?: (account: string) => void;
}

const WalletButton: React.FC<WalletButtonProps> = ({ setConnected, setUserAccount }) => {
  const { sdk, connected, connecting, account, chainId, provider } = useSDK();
  // const [currentUser,setCurrentUser] = useState('')

  const connectWallet = async () => {
    try {
      if (!sdk) {
        throw new Error("MetaMask SDK not initialized");
      }

      // Connect and get accounts
      const accounts = await sdk.connect();
      
      // If we have the setter functions, call them
      if (setConnected) setConnected(true);
      if (setUserAccount && accounts?.[0]) setUserAccount(accounts[0]);
      console.log("accounts",accounts);
      

      // Get the provider and signer if needed
      if (provider) {
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        console.log("signer",signer);
        
        // You can use the signer here for transactions if needed
      }
    } catch (err) {
      console.error('Failed to connect wallet:', err);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (!sdk) return;
      await sdk.terminate();
      if (setConnected) setConnected(false);
      if (setUserAccount) setUserAccount('');
    } catch (err) {
      console.error('Failed to disconnect:', err);
    }
  };

  // Display the account in shortened format
  const renderAccount = (address: string) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  return (
    <div className="w-full">
      <button 
        onClick={connected ? disconnectWallet : connectWallet}
        disabled={connecting}
        className={`
          w-full px-6 py-3 rounded-xl transition-all duration-200 
          flex items-center justify-center gap-3
          ${connected 
            ? 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-400' 
            : connecting 
              ? 'bg-gray-600/20 cursor-not-allowed text-gray-400' 
              : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:shadow-blue-600/25'
          }
          font-medium text-lg
        `}
      >
        <Wallet className="h-5 w-5" />
        
        <span className="hidden sm:inline">
          {connecting ? 'Connecting...' : connected ? renderAccount(account!) : 'Connect Wallet'}
        </span>
        
        <span className="sm:hidden">
          {connecting ? '...' : connected ? `${account?.slice(0, 4)}...` : 'Connect'}
        </span>
      </button>

      {/* {connected && chainId && (
        <div className="mt-2 text-center text-sm text-gray-400">
          Connected to network ID: {chainId}
        </div>
      )} */}
    </div>
  );
};

export default WalletButton;