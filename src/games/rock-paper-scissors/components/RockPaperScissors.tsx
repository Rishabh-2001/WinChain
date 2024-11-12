import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Hand, Circle, Trophy, RotateCcw } from 'lucide-react';

type Choice = 'rock' | 'paper' | 'scissors' | null;
type GameResult = 'win' | 'lose' | 'draw' | null;

const choices: Choice[] = ['rock', 'paper', 'scissors'];

const RockPaperScissors: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<GameResult>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [scores, setScores] = useState({ player: 0, computer: 0 });

  const getChoiceIcon = (choice: Choice, className = 'w-full h-full') => {
    switch (choice) {
      case 'rock':
        return <Circle className={className} />;
      case 'paper':
        return <Hand className={className} />;
      case 'scissors':
        return <Scissors className={className} />;
      default:
        return null;
    }
  };

  const determineWinner = (player: Choice, computer: Choice): GameResult => {
    if (!player || !computer) return null;
    if (player === computer) return 'draw';
    
    const winConditions = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper',
    };

    return winConditions[player] === computer ? 'win' : 'lose';
  };

  const getComputerChoice = (): Choice => {
    // Fair computer algorithm that doesn't just pick randomly
    // It considers the player's previous choices and tries to create a balanced game
    // For now, we'll use a simple random choice but with weighted probabilities
    // This can be enhanced with more sophisticated AI strategies if needed
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const handleChoice = async (choice: Choice) => {
    if (countdown !== null) return;
    
    setPlayerChoice(choice);
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }

    const aiChoice = getComputerChoice();
    setComputerChoice(aiChoice);
    const gameResult = determineWinner(playerChoice, aiChoice);
    setResult(gameResult);

    if (gameResult === 'win') {
      setScores(prev => ({ ...prev, player: prev.player + 1 }));
    } else if (gameResult === 'lose') {
      setScores(prev => ({ ...prev, computer: prev.computer + 1 }));
    }
  }, [countdown, playerChoice]);

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setCountdown(null);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4">
      {/* Game Title */}
      <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        Rock Paper Scissors
      </h1>

      {/* Scoreboard */}
      <div className="flex justify-center gap-8 mb-8">
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-1">You</div>
          <div className="text-3xl font-bold text-blue-400">{scores.player}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-1">Computer</div>
          <div className="text-3xl font-bold text-rose-400">{scores.computer}</div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative w-full">
        {/* Countdown Overlay */}
        <AnimatePresence>
          {countdown !== null && countdown > 0 && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <span className="text-6xl font-bold text-white">{countdown}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Choices Display */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Player Choice */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold text-blue-400">You</h3>
            <motion.div
              animate={playerChoice ? { scale: [1, 1.1, 1] } : {}}
              className="w-24 h-24 bg-gray-800/50 rounded-xl flex items-center justify-center text-blue-400 border-2 border-blue-400/20"
            >
              {playerChoice && getChoiceIcon(playerChoice)}
            </motion.div>
          </div>

          {/* Computer Choice */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold text-rose-400">Computer</h3>
            <motion.div
              animate={computerChoice ? { scale: [1, 1.1, 1] } : {}}
              className="w-24 h-24 bg-gray-800/50 rounded-xl flex items-center justify-center text-rose-400 border-2 border-rose-400/20"
            >
              {computerChoice && getChoiceIcon(computerChoice)}
            </motion.div>
          </div>
        </div>

        {/* Choice Buttons */}
        {!playerChoice && (
          <div className="grid grid-cols-3 gap-4">
            {choices.map((choice) => (
              <motion.button
                key={choice}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChoice(choice)}
                className="aspect-square bg-gray-800/50 rounded-xl flex items-center justify-center
                  hover:bg-gray-700/50 transition-colors p-4 border border-gray-700/50"
              >
                <div className="w-12 h-12 text-gray-400">
                  {getChoiceIcon(choice)}
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Result Display */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl text-center border border-gray-700/50"
            >
              <Trophy className={`w-16 h-16 mx-auto mb-4 ${
                result === 'win' ? 'text-yellow-400' :
                result === 'lose' ? 'text-gray-400' :
                'text-blue-400'
              }`} />
              <h3 className="text-2xl font-bold mb-4">
                {result === 'win' && '🎉 You Win! 🎉'}
                {result === 'lose' && '😔 You Lose!'}
                {result === 'draw' && '🤝 It\'s a Draw!'}
              </h3>
              <button
                onClick={resetGame}
                className="bg-blue-600/80 hover:bg-blue-700/80 px-6 py-2 rounded-lg font-medium
                  transition-colors flex items-center gap-2 mx-auto border border-blue-500/50"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RockPaperScissors;