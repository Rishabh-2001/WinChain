import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hash, Hand, Dice5, Wallet, ArrowRight } from 'lucide-react';

interface GameCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  gradient: string;
  path: string;
}

const GameCard = ({ icon, title, description, action, gradient, path }: GameCardProps) => {
  const navigate = useNavigate();
  function handleGameNavigation(path:string) {
    console.log("SDFDSF");
    
    navigate(`games${path}`)
  }
  return (
    <div 
      className={`relative group overflow-hidden rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 ${gradient} cursor-pointer`}
      onClick={() => handleGameNavigation(path)}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
      
      <div className="relative z-10">
        <div className="bg-white/10 rounded-lg p-3 w-fit mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        
        <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
          {action} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const GameCards = () => {
  const games = [
    {
      icon: <Hash className="w-8 h-8" />,
      title: "Tic Tac Toe",
      description: "Challenge friends to the classic game of X's and O's",
      action: "Play Now",
      gradient: "bg-gradient-to-br from-blue-900/50 to-purple-900/50",
      path: "/tic-tac-toe"
    },
    {
      icon: <Hand className="w-8 h-8" />,
      title: "Rock Paper Scissors",
      description: "Test your luck in this timeless battle of choices",
      action: "Start Game",
      gradient: "bg-gradient-to-br from-purple-900/50 to-pink-900/50",
      path: "/rock-paper-scissors"
    },
    {
      icon: <Dice5 className="w-8 h-8" />,
      title: "Dice Roll",
      description: "Roll the dice and test your fortune",
      action: "Roll Now",
      gradient: "bg-gradient-to-br from-green-900/50 to-blue-900/50",
      path: "/dice-roll"
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Web3 Wallet",
      description: "Connect your wallet to access blockchain features",
      action: "Connect Wallet",
      gradient: "bg-gradient-to-br from-yellow-900/50 to-orange-900/50",
      path: "/wallet"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {games.map((game, index) => (
        <GameCard key={index} {...game} />
      ))}
    </div>
  );
};

export default GameCards;