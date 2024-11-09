import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Clock, Trophy, MessageCircle } from 'lucide-react';

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

  // Mock room data - replace with actual API call
  useEffect(() => {
    // Simulating API call
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
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(`/games/${gameId}`)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Lobby
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>{room.currentPlayers.length}/{room.maxPlayers} Players</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" />
              <span>Room Status: {room.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Game Area */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Game Area</h2>
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
            {room.status === 'waiting' ? (
              <div className="text-center">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Waiting for Players</h3>
                <p className="text-gray-400">Game will start once all players are ready</p>
              </div>
            ) : (
              <div>Game Interface Here</div>
            )}
          </div>
        </div>

        {/* Players & Chat */}
        <div className="space-y-6">
          {/* Players */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Players</h3>
            <div className="space-y-4">
              {room.currentPlayers.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between bg-gray-700 rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-full" />
                    <span>{player.name}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    player.status === 'ready' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {player.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Chat</h3>
            <div className="h-[200px] bg-gray-900 rounded-lg mb-4 p-4 overflow-y-auto">
              {/* Chat messages would go here */}
            </div>
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
                className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRoom;