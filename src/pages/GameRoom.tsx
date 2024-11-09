import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Clock, Trophy, MessageCircle, X } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  avatar: string;
  status: 'ready' | 'waiting' | 'playing';
}

interface GameRoom {
  id: string;
  name: string;
  gameId: string;
  maxPlayers: number;
  currentPlayers: Player[];
  status: 'waiting' | 'in-progress' | 'finished';
  isPrivate: boolean;
  level: string;
  createdAt: Date;
}

const GameRoom = () => {
  const { gameId, roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState<GameRoom | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [isChatVisible, setIsChatVisible] = useState(true);

  useEffect(() => {
    setRoom({
      id: roomId || '',
      name: 'Game Room #1',
      gameId: gameId || '',
      maxPlayers: 4,
      currentPlayers: [
        { id: '1', name: 'Player 1', avatar: '/avatars/1.png', status: 'ready' },
        { id: '2', name: 'Player 2', avatar: '/avatars/2.png', status: 'waiting' },
      ],
      status: 'waiting',
      isPrivate: false,
      level: 'Casual',
      createdAt: new Date(),
    });
  }, [gameId, roomId]);

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-10 bg-gray-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button
              onClick={() => navigate(`/games/${gameId}`)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Lobby</span>
            </button>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-lg">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium">{room.currentPlayers.length}/{room.maxPlayers}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-lg">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium capitalize">{room.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-2xl font-bold mb-4">Game Area</h2>
              <div className="aspect-video bg-gray-900/50 rounded-lg flex items-center justify-center border border-gray-700/50">
                {room.status === 'waiting' ? (
                  <div className="text-center p-8">
                    <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Waiting for Players</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      Game will start once all players are ready. Get prepared for an exciting match!
                    </p>
                  </div>
                ) : (
                  <div>Game Interface Here</div>
                )}
              </div>
            </div>
          </div>

          {/* Players & Chat */}
          <div className="space-y-6">
            {/* Mobile Chat Toggle */}
            <div className="lg:hidden flex justify-end">
              <button
                onClick={() => setIsChatVisible(!isChatVisible)}
                className="bg-gray-800/50 p-2 rounded-lg text-gray-400 hover:text-white"
              >
                {isChatVisible ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
              </button>
            </div>

            <div className={`space-y-6 ${isChatVisible ? 'block' : 'hidden lg:block'}`}>
              {/* Players */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold mb-4">Players</h3>
                <div className="space-y-3">
                  {room.currentPlayers.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-600/50 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-gray-400" />
                        </div>
                        <span className="font-medium">{player.name}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        player.status === 'ready' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {player.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold mb-4">Chat</h3>
                <div className="h-[300px] bg-gray-900/50 rounded-lg mb-4 p-4 overflow-y-auto border border-gray-700/50">
                  {/* Chat messages would go here */}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-700/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600/50"
                  />
                  <button
                    onClick={() => setChatMessage('')}
                    className="bg-blue-600/80 hover:bg-blue-700/80 rounded-lg px-4 py-2 flex items-center gap-2 font-medium transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRoom;