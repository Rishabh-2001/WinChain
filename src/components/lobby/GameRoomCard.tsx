import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Lock, Trophy, Eye } from 'lucide-react';

interface GameRoomProps {
  room: {
    id: string;
    name: string;
    host: string;
    players: string;
    isPrivate: boolean;
    status: string;
    level: string;
    spectators?: number;
    startTime?: string;
    winner?: string;
  };
  onJoin: () => void;
}

const GameRoomCard: React.FC<GameRoomProps> = ({ room, onJoin }) => {
  const navigate = useNavigate();

  const handleJoin = () => {
    if (room.isPrivate) {
      onJoin();
    } else {
      navigate(`/games/${room.id}/room/${room.id}`);
    }
  };

  const handleSpectate = () => {
    navigate(`/games/${room.id}/room/${room.id}?spectate=true`);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {room.name}
            {room.isPrivate && <Lock className="w-4 h-4 text-yellow-400" />}
          </h3>
          <p className="text-gray-400 text-sm">Hosted by {room.host}</p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-400" />
          <span className="text-sm">{room.players}</span>
          {room.spectators && (
            <div className="flex items-center gap-1 text-gray-400">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{room.spectators}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-sm ${
            room.status === 'Waiting' ? 'bg-green-500/20 text-green-400' :
            room.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            {room.status}
          </span>
          <span className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-purple-400" />
            <span className="text-sm">{room.level}</span>
          </span>
        </div>
        <div className="flex gap-2">
          {room.status === 'In Progress' && (
            <button
              onClick={handleSpectate}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Watch
            </button>
          )}
          {room.status !== 'Completed' && (
            <button
              onClick={handleJoin}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
            >
              {room.isPrivate ? 'Request Join' : 'Join Game'}
            </button>
          )}
        </div>
      </div>

      {room.winner && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <span className="text-sm text-gray-400">
            Winner: <span className="text-green-400">{room.winner}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default GameRoomCard;