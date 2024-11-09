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
    { id: 3, user: 'Spectator', message: 'Great game everyone!' }
  ];

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="relative flex h-[calc(100vh-4rem)] bg-gray-900">
      {/* Chat Toggle Button (Mobile) */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-4 right-4 z-50 lg:hidden rounded-full p-3 bg-blue-600 text-white shadow-lg ${
          isChatOpen ? 'hidden' : 'flex'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Sidebar */}
      <aside
        className={`${
          isChatOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } fixed lg:relative z-40 w-80 h-full bg-gray-800 border-r border-gray-700 flex flex-col transition-transform duration-300 ease-in-out`}
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
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleChat}
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