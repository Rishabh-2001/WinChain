import React, { useState, useEffect, useContext } from 'react';
import { X, Circle, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import walletContext from '../../../contexts/WalletContext'
import {depositIntoWallet, withdrawFromWallet} from '../../../helpers'

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

const TicTacToe: React.FC<TicTacToeProps> = ({ players, totalBetAmt }) => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<'X' | 'O' | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isComputerThinking, setIsComputerThinking] = useState(false);
  const [difficulty] = useState<'hard' | 'medium'>('hard');
  const {
    setWalletBalance, walletData} = useContext(walletContext);
   const {walletAddress, walletBalance} = walletData;

  const findWinningLines = (squares: (string | null)[]): number[][] => {
    const winningLines: number[][] = [];
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        winningLines.push(combo);
      }
    }
    return winningLines;
  };

  const checkWinner = (squares: (string | null)[]): string | null => {
    const winningLines = findWinningLines(squares);
    if (winningLines.length > 0) {
      return squares[winningLines[0][0]];
    }
    return null;
  };

  const minimax = (
    squares: (string | null)[],
    depth: number,
    isMaximizing: boolean,
    alpha: number = -Infinity,
    beta: number = Infinity
  ): number => {
    const winner = checkWinner(squares);
    
    // Terminal states
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (!squares.includes(null)) return 0;
    
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
          squares[i] = 'O';
          const score = minimax(squares, depth + 1, false, alpha, beta);
          squares[i] = null;
          bestScore = Math.max(bestScore, score);
          alpha = Math.max(alpha, bestScore);
          if (beta <= alpha) break;
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
          squares[i] = 'X';
          const score = minimax(squares, depth + 1, true, alpha, beta);
          squares[i] = null;
          bestScore = Math.min(bestScore, score);
          beta = Math.min(beta, bestScore);
          if (beta <= alpha) break;
        }
      }
      return bestScore;
    }
  };

  const findBestMove = (squares: (string | null)[]): number => {
    let bestScore = -Infinity;
    let bestMove = -1;

    // First move optimization - take center if available
    if (squares.filter(square => square !== null).length === 0) {
      return 4; // Center position
    }

    // If it's medium difficulty, occasionally make a random move
    if (difficulty === 'medium' && Math.random() < 0.3) {
      const emptyCells = squares
        .map((square, index) => (square === null ? index : null))
        .filter((index): index is number => index !== null);
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = 'O';
        const score = minimax(squares, 0, false);
        squares[i] = null;
        
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const makeComputerMove = async () => {
    setIsComputerThinking(true);
    await new Promise(resolve => setTimeout(resolve, 600));

    const newBoard = [...board];
    const move = findBestMove(newBoard);
    newBoard[move] = 'O';
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    console.log("gameWinner>",gameWinner);
    
    if (gameWinner) {
      setWinner(gameWinner as 'X' | 'O');
      setWinningLine(findWinningLines(newBoard)[0]);
      // call add money
    } else if (!newBoard.includes(null)) {
      setIsDraw(true);
      // call add money
    } else {
      setCurrentPlayer('X');
    }
    setIsComputerThinking(false);
  };

  const returnMoney = async (moneyToAdd,newAmt, walletAddress) =>{
    const res = await depositIntoWallet(moneyToAdd, walletAddress );
    console.log(">>res",res);
    if(res)
    {
      setWalletBalance(newAmt);
    }
    
  }

  const playAgainWithdraw = async (walletAddress,amountToWithdraw, newAmt)=>{
    console.log("Widhdraing for new game", amountToWithdraw, newAmt);
    const res = await withdrawFromWallet(amountToWithdraw, walletAddress)
    console.log(">>res",res);
    if(res)
    {
      setWalletBalance(newAmt);
    }
  }



  useEffect(()=>{
    
  
     if(winner === 'O')
     {
        // computer win
        // deduct money, no change
     }
     else if(winner==='X')
     {
        // you win , add money
        // depositWa
        const moneyToAdd = totalBetAmt;
        const newAmt = walletBalance + totalBetAmt;
        const res = depositIntoWallet(moneyToAdd, walletAddress )
        if(res)
        {
          setWalletBalance(newAmt);
        }
     }
     else if(isDraw){
        // draw, add same money back
        const moneyToAdd = totalBetAmt/2;
        const newAmt = walletBalance + totalBetAmt/2;
        console.log(">>> DRAW", newAmt);

        // const res = depositIntoWallet(newAmt, walletAddress );
        
        returnMoney(moneyToAdd,newAmt, walletAddress)
        
        
     }
     
  }, [winner, isDraw])

  const handleClick = (index: number) => {
    if (board[index] || winner || currentPlayer === 'O' || isComputerThinking) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    console.log("gameWinner",gameWinner);
    
    if (gameWinner) {
      setWinner(gameWinner as 'X' | 'O');
      setWinningLine(findWinningLines(newBoard)[0]);
    } else if (!newBoard.includes(null)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer('O');
    }
  };

  useEffect(() => {
    if (currentPlayer === 'O' && !winner && !isDraw) {
      makeComputerMove();
    }
  }, [currentPlayer]);
   
   

  const resetGame = () => {
    const newAmt = walletBalance-totalBetAmt/2;
    playAgainWithdraw(walletAddress,totalBetAmt/2, newAmt);
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
    setIsComputerThinking(false);
  };

  const isWinningCell = (index: number) => {
    return winningLine?.includes(index);
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
            {isComputerThinking ? (
              <span className="text-blue-400">Computer is thinking...</span>
            ) : (
              <span>
                Current Turn: {currentPlayer === 'X' ? 'Your' : "Computer's"} Turn
              </span>
            )}
          </motion.div>
        )}
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-3 max-w-md w-full aspect-square p-4">
        {board.map((cell, index) => (
          <motion.button
            key={index}
            whileHover={!cell && !winner && currentPlayer === 'X' && !isComputerThinking ? { scale: 1.05 } : {}}
            whileTap={!cell && !winner && currentPlayer === 'X' && !isComputerThinking ? { scale: 0.95 } : {}}
            className={`aspect-square rounded-xl flex items-center justify-center
              transition-all duration-200
              ${!cell && !winner && currentPlayer === 'X' && !isComputerThinking 
                ? 'hover:bg-gray-700/50 cursor-pointer bg-gray-800/50' 
                : 'cursor-not-allowed bg-gray-800/50'}
              ${isWinningCell(index) ? 'bg-green-500/20 border-2 border-green-500' : ''}`}
            onClick={() => handleClick(index)}
          >
            {cell && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-12 h-12 sm:w-16 sm:h-16"
              >
                {cell === 'X' ? (
                  <X className={`w-full h-full ${isWinningCell(index) ? 'text-green-400' : 'text-blue-400'}`} />
                ) : (
                  <Circle className={`w-full h-full ${isWinningCell(index) ? 'text-green-400' : 'text-rose-400'}`} />
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
          className="mt-8 bg-gray-800/80 backdrop-blur-2xl p-6 rounded-xl text-center max-w-sm w-full absolute"
        >
          {winner ? (
            <>
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                {winner === 'O' ? '🤖 Computer Wins!' : '🎉 You Win! 🎉'}
              </h3>
              <p className="text-gray-400 mb-4">
                {winner === 'O' 
                  ? 'The computer outsmarted you this time!' 
                  : 'Congratulations! You beat the AI!'}
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <X className="w-full h-full text-blue-400 absolute" />
                <Circle className="w-full h-full text-rose-400 absolute" />
              </div>
              <h3 className="text-2xl font-bold mb-2">It's a Draw!</h3>
              <p className="text-gray-400 mb-4">A perfect match between human and machine!</p>
            </>
          )}
          <button
            onClick={resetGame}
            className="bg-blue-600/80 hover:bg-blue-700/80 px-6 py-2 rounded-lg font-medium
              transition-colors duration-200"
          >
            Play Again with ${totalBetAmt/2}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default TicTacToe;