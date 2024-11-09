import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Users, Lock, Trophy, Clock, ArrowRight, Eye, MessageCircle, X, ChevronRight } from 'lucide-react';
import CreateRoomModal from '../components/lobby/CreateRoomModal';
import GameRoomCard from '../components/lobby/GameRoomCard';
import JoinPrivateRoomModal from '../components/lobby/JoinPrivateRoomModal';

type TabType = 'live' | 'upcoming' | 'past';

const GamingLobby = () => {
  const { gameId } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>('live');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(true);

  const gameNames: Record<string, string> = {
    'tic-tac-toe': 'Tic Tac Toe',
    'rock-paper-scissors': 'Rock Paper Scissors',
    'dice-roll': 'Dice Roll'
  };

  // Mock data for rooms
  const rooms = {
    live: [
      {
        id: '1',
        name: 'Quick Match #1',
        host: 'Player123',
        players: '1/2',
        isPrivate: false,
        status: 'Waiting',
        level: 'Casual',
        spectators: 5
      },
      {
        id: '2',
        name: 'Pro Room',
        host: 'GameMaster',
        players: '2/4',
        isPrivate: true,
        status: 'In Progress',
        level: 'Competitive',
        spectators: 12
      }
    ],
    upcoming: [
      {
        id: '3',
        name: 'Tournament Match',
        host: 'TourneyAdmin',
        players: '0/8',
        isPrivate: false,
        status: 'Starting Soon',
        level: 'Tournament',
        startTime: '2024-03-20T15:00:00Z'
      }
    ],
    past: [
      {
        id: '4',
        name: 'Championship Finals',
        host: 'ChampHost',
        players: '2/2',
        isPrivate: false,
        status: 'Completed',
        level: 'Tournament',
        winner: 'Player456'
      }
    ]
  };

  const mockChatMessages = [
    { id: 1, user: 'Player123', message: 'Anyone up for a quick match?' },
    { id: 2, user: 'GameMaster', message: 'Tournament starting in 10 minutes!' },
    { id: 3, user: 'Spectator', message: 'Great game everyone!' },
    { id: 4, user: 'Player456', message: 'I’m in for the quick match!' },
    { id: 5, user: 'Player789', message: 'Same here, ready to play!' },
    { id: 6, user: 'GameMaster', message: 'Alright, everyone, let’s get ready. First match starts in 5 minutes.' },
    { id: 7, user: 'Player123', message: 'Any bets on who’s going to win this one?' },
    { id: 8, user: 'Spectator', message: 'I’m betting on Player456. They’ve been on fire today!' },
    { id: 9, user: 'Player456', message: 'Haha, thanks! But I’m sure Player789 will bring the heat.' },
    { id: 10, user: 'Player789', message: 'No pressure, but I’ve been practicing non-stop!' },
    { id: 11, user: 'Spectator', message: 'Exciting! I can’t wait to see this battle!' },
    { id: 12, user: 'GameMaster', message: 'Alright, the match is starting! Everyone, let’s play fair and have fun!' },
    { id: 13, user: 'Player123', message: 'Good luck, everyone!' },
    { id: 14, user: 'Player456', message: 'Let’s do this!' },
    { id: 15, user: 'Player789', message: 'May the best player win!' },
    { id: 16, user: 'GameMaster', message: 'Match is now live! Remember to stay respectful in the chat.' },
    { id: 17, user: 'Spectator', message: 'Ohhh, looks like Player456 just got the first point!' },
    { id: 18, user: 'Player123', message: 'I knew Player456 was good, but wow!' },
    { id: 19, user: 'Player789', message: 'It’s just the warm-up, don’t count me out yet!' },
    { id: 20, user: 'Player456', message: 'I’ll take the lead while I can! Haha.' },
    { id: 21, user: 'Spectator', message: 'This is getting intense, I love it!' },
    { id: 22, user: 'GameMaster', message: 'Stay focused, folks. The match is only halfway done!' },
    { id: 23, user: 'Player123', message: 'This match is crazy, who’s going to take the lead next?' },
    { id: 24, user: 'Player789', message: 'I’ll catch up, just you wait!' },
    { id: 25, user: 'Spectator', message: 'I think Player789 has a secret strategy we don’t know about.' },
    { id: 26, user: 'Player456', message: 'I’m just trying to keep my focus. The game’s not over yet!' },
    { id: 27, user: 'Player123', message: 'So close! I can’t tell who will win this round.' },
    { id: 28, user: 'GameMaster', message: 'Match is over! Congrats to Player456 for the win!' },
    { id: 29, user: 'Spectator', message: 'Well played, Player456! You earned that one.' },
    { id: 30, user: 'Player123', message: 'Good game, everyone! That was a tough one.' },
    { id: 31, user: 'Player789', message: 'I’ll get you next time, Player456! Good game.' },
    { id: 32, user: 'Player456', message: 'Thanks, everyone. That was an awesome match!' },
  ];
  

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="relative flex h-[calc(100vh-6rem)] bg-gray-900">
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
  <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
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
        <div className="p-4 lg:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">{gameNames[gameId || '']}</h1>
              <p className="text-gray-400">Join a room or create your own game</p>
            </div>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Room
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-700 overflow-x-auto">
            <nav className="flex gap-4 min-w-max">
              {(['live', 'upcoming', 'past'] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium capitalize ${
                    activeTab === tab
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Room Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {rooms[activeTab].map((room) => (
              <GameRoomCard
                key={room.id}
                room={room}
                onJoin={() => {
                  if (room.isPrivate) {
                    setSelectedRoom(room.id);
                    setJoinModalOpen(true);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Overlay for mobile when chat is open */}
      {isChatOpen && (
  <div
    className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300 ease-in-out"
    onClick={toggleChat}
    style={{ opacity: isChatOpen ? 1 : 0 }} // Ensure fade-in effect
  />
)}

      {/* Modals */}
      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        gameId={gameId || ''}
      />
      
      <JoinPrivateRoomModal
        isOpen={isJoinModalOpen}
        onClose={() => {
          setJoinModalOpen(false);
          setSelectedRoom(null);
        }}
        roomId={selectedRoom}
      />
    </div>
  );
};

export default GamingLobby;