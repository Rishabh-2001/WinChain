import React, { useState, useEffect } from 'react';
import { X, Circle, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface TicTacToeProps {
  players: {
    id: string;
    name: string;
  }[];
}

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

const TicTacToe: React.FC<TicTacToeProps> = ({ players }) => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  const checkWinner = (squares: (string | null)[]) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinningLine(combo);
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(players[gameWinner === 'X' ? 0 : 1].name);
    } else if (!newBoard.includes(null)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* Game Status */}
      <div className="mb-6 text-center">
        {!winner && !isDraw && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-semibold"
          >
            Current Turn: {players[currentPlayer === 'X' ? 0 : 1].name}
          </motion.div>
        )}
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-3 max-w-md w-full aspect-square p-4">
        {board.map((cell, index) => (
          <motion.button
            key={index}
            whileHover={!cell && !winner ? { scale: 1.05 } : {}}
            whileTap={!cell && !winner ? { scale: 0.95 } : {}}
            className={`aspect-square bg-gray-800/50 rounded-xl flex items-center justify-center
              ${winningLine?.includes(index) ? 'ring-2 ring-green-500' : 'hover:bg-gray-700/50'}
              transition-colors duration-200`}
            onClick={() => handleClick(index)}
          >
            {cell && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-12 h-12 sm:w-16 sm:h-16"
              >
                {cell === 'X' ? (
                  <X className="w-full h-full text-blue-400" />
                ) : (
                  <Circle className="w-full h-full text-rose-400" />
                )}
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Winner Card */}
      {(winner || isDraw) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 bg-gray-800/80 backdrop-blur-2xl p-6 rounded-xl text-center max-w-sm w-full absolute "
        >
          {winner ? (
            <>
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">🎉 {winner} Wins! 🎉</h3>
              <p className="text-gray-400 mb-4">Congratulations on your victory!</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <X className="w-full h-full text-blue-400 absolute" />
                <Circle className="w-full h-full text-rose-400 absolute" />
              </div>
              <h3 className="text-2xl font-bold mb-2">It's a Draw!</h3>
              <p className="text-gray-400 mb-4">Great game by both players!</p>
            </>
          )}
          <button
            onClick={resetGame}
            className="bg-blue-600/80 hover:bg-blue-700/80 px-6 py-2 rounded-lg font-medium
              transition-colors duration-200"
          >
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default TicTacToe;