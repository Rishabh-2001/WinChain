import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Users, Lock, Trophy } from 'lucide-react';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: string;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ isOpen, onClose, gameId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomName: '',
    maxPlayers: '2',
    isPrivate: false,
    password: '',
    level: 'casual',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to create the room
    // For now, we'll just navigate to a mock room
    const roomId = Math.random().toString(36).substr(2, 9);
    navigate(`/games/${gameId}/room/${roomId}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Create Game Room</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Room Name</label>
            <input
              type="text"
              value={formData.roomName}
              onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter room name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Number of Players</label>
            <select
              value={formData.maxPlayers}
              onChange={(e) => setFormData({ ...formData, maxPlayers: e.target.value })}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2">2 Players</option>
              <option value="4">4 Players</option>
              <option value="6">6 Players</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Game Level</label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="casual">Casual</option>
              <option value="competitive">Competitive</option>
              <option value="tournament">Tournament</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPrivate"
              checked={formData.isPrivate}
              onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
              className="rounded bg-gray-700"
            />
            <label htmlFor="isPrivate" className="text-sm font-medium">Private Room</label>
          </div>

          {formData.isPrivate && (
            <div>
              <label className="block text-sm font-medium mb-2">Room Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room password"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 font-medium transition-colors"
          >
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;