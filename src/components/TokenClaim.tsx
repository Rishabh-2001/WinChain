import React, { useState } from 'react';
import { Coins } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface TokenClaimProps {
  connected: boolean;
  userAccount: string;
  isNewUser: boolean;
}
const SERVER_URL = import.meta.env.VITE_SERVER_API_ORIGIN;


const TokenClaim: React.FC<TokenClaimProps> = ({ connected, userAccount, isNewUser, setBalance }) => {
  const [claiming, setClaiming] = useState(false);
console.log("isNewUser", isNewUser);

  const claimTokens = async () => {
    if (!connected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setClaiming(true);
  
  try {
    // Use Axios to send the POST request
    const response = await axios.post(`${SERVER_URL}claim`, {
      walletAddress: userAccount
    });

    // Extract the response data
    const data = response.data;

    if (response.status === 200) {
        // console.log(">>>RESSSS", response?.data?.balance);
        const newBalance=  response?.data?.balance;
        setBalance(newBalance);
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
          max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
          <div className="flex-1 w-0 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 pt-0.5">
                <Coins className="h-10 w-10 text-green-500 animate-bounce" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Tokens Claimed Successfully!
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {data.amount} tokens have been added to your wallet
                </p>
              </div>
            </div>
          </div>
        </div>
      ), { duration: 4000 });
    } else {

      throw new Error(data.message || 'Failed to claim tokens');
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message || 'Failed to claim tokens');
  } finally {
    setClaiming(false);
  }
  };

  return (
    <button
      onClick={claimTokens}
      disabled={claiming || !connected}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform
        ${connected 
          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 hover:shadow-lg'
          : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
        ${claiming ? 'animate-pulse' : ''}
      `}
    >
      <Coins className={`h-5 w-5 ${claiming ? 'animate-spin' : ''}`} />
      {claiming ? 'Claiming...' : 'Claim Tokens'}
    </button>
  );
};

export default TokenClaim;