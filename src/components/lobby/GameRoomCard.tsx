import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Lock, Trophy, Eye, Clock } from 'lucide-react';

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
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
            {room.name}
            {room.isPrivate && (
              <Lock className="w-4 h-4 text-yellow-400" />
            )}
          </h3>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            <span>Hosted by</span>
            <span className="font-medium text-gray-300">{room.host}</span>
          </p>
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium">{room.players}</span>
          </div>
          {room.spectators && (
            <div className="flex items-center gap-2 text-gray-400">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{room.spectators}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
            room.status === 'Waiting' ? 'bg-green-500/10 text-green-400' :
            room.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-400' :
            'bg-gray-500/10 text-gray-400'
          }`}>
            <Clock className="w-3 h-3" />
            {room.status}
          </span>
          <span className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-purple-500/10 text-purple-400">
            <Trophy className="w-3 h-3" />
            {room.level}
          </span>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {room.status === 'In Progress' && (
            <button
              onClick={handleSpectate}
              className="flex-1 sm:flex-none px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Watch
            </button>
          )}
          {room.status !== 'Completed' && (
            <button
              onClick={handleJoin}
              className="flex-1 sm:flex-none px-4 py-2 bg-blue-600/80 hover:bg-blue-700/80 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              {room.isPrivate ? 'Request Join' : 'Join Game'}
            </button>
          )}
        </div>
      </div>

      {room.winner && (
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <span className="text-sm text-gray-400 flex items-center gap-2">
            Winner: 
            <span className="text-green-400 font-medium">{room.winner}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default GameRoomCard;