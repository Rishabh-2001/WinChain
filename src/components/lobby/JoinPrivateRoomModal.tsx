import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface JoinPrivateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string | null;
}

const JoinPrivateRoomModal: React.FC<JoinPrivateRoomModalProps> = ({ isOpen, onClose, roomId }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically verify the password with an API
    // For now, we'll just navigate to the room
    navigate(`/games/${roomId}/room/${roomId}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Join Private Room</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Room Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter room password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 font-medium transition-colors"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinPrivateRoomModal;