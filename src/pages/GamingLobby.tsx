import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bot, Users, Lock, MessageCircle, X } from 'lucide-react';
import CreateRoomModal from '../components/lobby/CreateRoomModal';
import BetModal from '../components/lobby/BetModal';
import walletContext from '../contexts/WalletContext'
import toast from 'react-hot-toast';
import axios from 'axios';

const GamingLobby = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isBetModalOpen, setBetModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const [isChatOpen, setIsChatOpen] = useState(true);
  const { walletData, setWalletBalance } = useContext(walletContext);
  const {balance, walletAddress} = walletData;



  const getWalletBal = async (address: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_SERVER_API_ORIGIN}/wallet/${address}`);
      const data = await res.json();
      // setBalance(data?.balance);
      setWalletBalance(data?.balance)
      // setIsNewUser(data?.newUser);
      return data.balance || '0';
    } catch (err) {
      console.error('Error fetching wallet balance:', err);
      setError('Failed to fetch wallet balance');
      return '0';
    } finally {
      setLoading(false);
    }
  };


  const gameNames: Record<string, string> = {
    'tic-tac-toe': 'Tic Tac Toe',
    'rock-paper-scissors': 'Rock Paper Scissors',
    'dice-roll': 'Dice Roll'
  };

  const mockChatMessages = [
    { id: 1, user: 'System', message: 'Welcome to the game lobby!' },
    { id: 2, user: 'System', message: 'You can play against the computer or create a private room.' }
  ];

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };


  const handlePlayWithComputer = () => {
    setBetModalOpen(true);
  };

  const handleTransactions = async (amount) =>{
    const type = 'withdraw';
    try {
      const requestBody = {
        walletAddress: walletAddress,
        amount: parseFloat(amount),
      };
  
      // Step 2: Make the API request after deposit is successful
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_ORIGIN}${type}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Handle the response from the API
      const data = response.data;
      console.log('game money cut', data);
  
      if (response.status !== 200) {
        throw new Error(data.message || `Failed to ${type}`);
      }
  
      // On success, notify the user and perform further actions
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} successful!`);
      // onSuccess();
      if(walletAddress)
      {
        getWalletBal(walletAddress);
      }
      setBetModalOpen(false);
    } catch (error) {
       console.log("Error found", error);
    }
  }

  const handleBetConfirm = (betAmount: number) => {
    setBetModalOpen(false);
    handleTransactions(betAmount);
    navigate(`/games/${gameId}/room/computer`, { state: { betAmount } });
  };

  console.log("balance, walletAddress, walletConnected",walletData, balance, walletAddress);
  
  return (
    <div className="relative flex h-[calc(100vh-6rem)] bg-gray-900 mt-12">
      {/* Chat Toggle Button (Mobile) */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-4 right-4 z-50 rounded-full p-3 bg-blue-600 text-white shadow-lg ${
          isChatOpen ? 'hidden' : 'flex'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Sidebar */}
      <aside
      className={`${
        isChatOpen
          ? 'translate-x-0 opacity-100'
          : '-translate-x-full opacity-0'
      } fixed lg:relative z-40 w-80 h-full bg-gray-800 border-r border-gray-700 flex flex-col transition-all duration-300 ease-in-out overflow-hidden h-webkit-fill-available`}
    >
       <div className="p-4 border-b border-gray-700 flex justify-between items-center">
    <h2 className="text-xl font-semibold flex items-center gap-2">
      <MessageCircle className="w-5 h-5" />
      Lobby Chat
    </h2>
    <button
      onClick={toggleChat}
      className="lg:hidden text-gray-400 hover:text-white"
    >
      <X className="w-6 h-6" />
    </button>
  </div>
  <div className="flex-1 overflow-y-auto p-4 space-y-4">
    {mockChatMessages.map((msg) => (
      <div key={msg.id} className="bg-gray-700/50 rounded-lg p-3">
        <span className="font-semibold text-blue-400">{msg.user}</span>
        <p className="text-gray-300">{msg.message}</p>
      </div>
    ))}
  </div>
  <div className="p-4 border-t border-gray-700">
    <div className="flex gap-2">
      <input
        type="text"
        value={chatMessage}
        onChange={(e) => setChatMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => setChatMessage('')}
        className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
      >
               Send
      </button>
    </div>
  </div>
</aside>

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
        isChatOpen ? 'lg:ml-0' : 'ml-0'
      }`}>
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{gameNames[gameId || '']}</h1>
            <p className="text-gray-400">Choose your game mode</p>
          </div>

          {/* Game Options */}
          <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Play with Computer */}
            <div 
              onClick={handlePlayWithComputer}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <Bot className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Play with Computer</h3>
                <p className="text-gray-400">Challenge our AI in a single-player game</p>
              </div>
            </div>

            {/* Create Private Room */}
            <div 
              onClick={() => setCreateModalOpen(true)}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Create Private Room</h3>
                <p className="text-gray-400">Play with friends in a private game session</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Overlay for mobile when chat is open */}
      {isChatOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={toggleChat}
          style={{ opacity: isChatOpen ? 1 : 0 }}
        />
      )}

      {/* Create Room Modal */}
      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        gameId={gameId || ''}
      />

         {/* Bet Modal */}
         <BetModal
        isOpen={isBetModalOpen}
        onClose={() => setBetModalOpen(false)}
        onConfirm={handleBetConfirm}
      />
    </div>
  );
};

export default GamingLobby;