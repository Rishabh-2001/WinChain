import React from 'react';
import { Trophy } from 'lucide-react';

interface BetInfoProps {
  playerBet: number;
  computerBet: number;
}

const BetInfo: React.FC<BetInfoProps> = ({ playerBet, computerBet }) => {
  const totalPot = playerBet + computerBet;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-6 ">
      <h3 className="text-xl font-semibold mb-6">Current Bets</h3>
      <div className="relative">
        {/* Player Bet */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="text-blue-400 font-bold">P</span>
            </div>
            <div>
              <span className="block text-sm text-gray-400">Your Bet</span>
              <span className="text-lg font-bold text-blue-400">${playerBet}</span>
            </div>
          </div>
        </div>

        {/* Total Pot */}
        <div className="relative flex justify-center items-center my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-700"></div>
          </div>
          <div className="relative z-10 bg-gray-800 px-4 py-2 rounded-full border-2 border-yellow-500/50">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-yellow-400">${totalPot}</span>
            </div>
          </div>
        </div>

        {/* Computer Bet */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <span className="text-red-400 font-bold">C</span>
            </div>
            <div>
              <span className="block text-sm text-gray-400">Computer Bet</span>
              <span className="text-lg font-bold text-red-400">${computerBet}</span>
            </div>
          </div>
        </div>

        {/* Animated Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-yellow-500/10 to-red-500/0 rounded-lg animate-pulse pointer-events-none"></div>
      </div>
    </div>
  );
};

export default BetInfo;