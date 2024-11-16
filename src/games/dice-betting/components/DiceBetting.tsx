import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Dice4, CoinsIcon, ArrowRight } from 'lucide-react';
import walletContext from '../../../contexts/WalletContext'
import {depositIntoWallet, withdrawFromWallet} from '../../../helpers'
interface DiceBettingProps {
  players: {
    id: string;
    name: string;
  }[];
}

type BetType = 'odd' | 'even' | 'multiple2' | 'multiple3' | 'exact' | null;
type BetResult = 'win' | 'lose' | null;

interface Bet {
  type: BetType;
  value?: number;
  description: string;
  multiplier: number;
}

const DiceBetting: React.FC<DiceBettingProps> = ({ players,totalBetAmt }) => {
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null);
  const [coins, setCoins] = useState(1000);
  const [betAmount, setBetAmount] = useState(100);
  const [isRolling, setIsRolling] = useState(false);
  const [diceNumber, setDiceNumber] = useState<number | null>(null);
  const [result, setResult] = useState<BetResult>(null);
  const [showResult, setShowResult] = useState(false);
  const {
    setWalletBalance, walletData} = useContext(walletContext);
   const {walletAddress, walletBalance} = walletData;

  const bettingOptions: Bet[] = [
    { type: 'odd', description: 'Bet on Odd Number', multiplier: 2 },
    { type: 'even', description: 'Bet on Even Number', multiplier: 2 },
    { type: 'multiple2', description: 'Multiple of 2', multiplier: 2 },
    { type: 'multiple3', description: 'Multiple of 3', multiplier: 2 },
    { type: 'exact', description: 'Exact Number', multiplier: 2 },
  ];

  const checkWin = (number: number, bet: Bet): boolean => {
    switch (bet.type) {
      case 'odd':
        return number % 2 !== 0;
      case 'even':
        return number % 2 === 0;
      case 'multiple2':
        return number % 2 === 0;
      case 'multiple3':
        return number % 3 === 0;
      case 'exact':
        return number === bet.value;
      default:
        return false;
    }
  };

  const rollDice = async () => {
    if (!selectedBet || isRolling) return;

    setIsRolling(true);
    setShowResult(false);

    // Animate through random numbers
    for (let i = 0; i < 20; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setDiceNumber(Math.floor(Math.random() * 6) + 1);
    }

    // Final result
    const finalNumber = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(finalNumber);

    // Determine result
    const isWin = checkWin(finalNumber, selectedBet);
    setResult(isWin ? 'win' : 'lose');


    // Update coins
    if (isWin) {
      setCoins(prev => prev + (betAmount * selectedBet.multiplier));
    } else {
      setCoins(prev => prev - betAmount);
    }

    setTimeout(() => {
      setIsRolling(false);
      setShowResult(true);
    }, 500);
  };

  const DiceFace = ({ number }: { number: number }) => (
    <div className="relative w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center transform transition-transform duration-150">
      <div className="grid grid-cols-3 grid-rows-3 gap-2 w-20 h-20">
        {Array(9).fill(null).map((_, i) => {
          const shouldShow = {
            1: [4],
            2: [2, 6],
            3: [2, 4, 6],
            4: [0, 2, 6, 8],
            5: [0, 2, 4, 6, 8],
            6: [0, 2, 3, 5, 6, 8],
          }[number]?.includes(i);

          return shouldShow ? (
            <div key={i} className="w-3 h-3 bg-gray-900 rounded-full" />
          ) : (
            <div key={i} />
          );
        })}
      </div>
    </div>
  );

  const playAgainWithdraw = async (walletAddress,amountToWithdraw, newAmt)=>{
    console.log("Widhdraing for new game", amountToWithdraw, newAmt);
    const res = await withdrawFromWallet(amountToWithdraw, walletAddress)
    console.log(">>res",res);
    if(res)
    {
      setWalletBalance(newAmt);
    }
  }

  const handleNewBet = async () =>{
    const newAmt = walletBalance-totalBetAmt/2;
    playAgainWithdraw(walletAddress,totalBetAmt/2, newAmt);
    setSelectedBet(null);
    setShowResult(false);
    setDiceNumber(null);

  }

  useEffect(()=>{
    if(result==="win")
    {
      const moneyToAdd = totalBetAmt;
      const newAmt = walletBalance + totalBetAmt;
      const res = depositIntoWallet(moneyToAdd, walletAddress )
      if(res)
      {
        setWalletBalance(newAmt);
      }
    }
    else{
      console.log("LOST");
    }
  }, [result])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-lg">
          <CoinsIcon className="w-5 h-5 text-yellow-400" />
          <span className="font-bold text-yellow-400">{totalBetAmt}</span>
        </div>
      </div>

      {/* Betting Options */}
      {!selectedBet && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl mb-8"
        >
          {bettingOptions.map((bet) => (
            <motion.button
              key={bet.type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedBet(bet)}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl text-center hover:bg-gray-700/50
                transition-colors border border-gray-700/50"
            >
              <h3 className="text-lg font-semibold mb-2">{bet.description}</h3>
              <div className="flex items-center justify-center gap-2 text-yellow-400">
                <CoinsIcon className="w-4 h-4" />
                <span>{bet.multiplier}x</span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Betting UI */}
      {selectedBet && !isRolling && !showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6 mb-8"
        >
          <div className="text-xl font-semibold text-center">
            {selectedBet.description}
            {selectedBet.type === 'exact' && (
              <div className="flex gap-2 mt-4">
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <button
                    key={num}
                    onClick={() => setSelectedBet({ ...selectedBet, value: num })}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center
                      ${selectedBet.value === num ? 'bg-blue-500' : 'bg-gray-800/50'}
                      hover:bg-blue-600 transition-colors`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* <div className="flex items-center gap-4">
            <input
              type="range"
              min="100"
              max={coins}
              step="100"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              className="w-48"
            />
            <span className="font-bold text-yellow-400">{betAmount}</span>
          </div> */}

          <button
            onClick={rollDice}
            className="bg-blue-600/80 hover:bg-blue-700/80 px-8 py-3 rounded-lg font-medium
              transition-colors flex items-center gap-2"
          >
            <Dice4 className="w-5 h-5" />
            Roll Dice
          </button>
        </motion.div>
      )}

      {/* Dice Animation */}
      <AnimatePresence>
        {diceNumber && (
          <motion.div
            key="dice"
            initial={isRolling ? { rotate: 0 } : { scale: 0 }}
            animate={isRolling ? 
              { rotate: 360, scale: [1, 1.2, 1] } : 
              { scale: 1, rotate: 0 }
            }
            transition={isRolling ? 
              { duration: 0.5, repeat: Infinity } : 
              { type: "spring" }
            }
            className="mb-8"
          >
            <DiceFace number={diceNumber} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Display */}
      <AnimatePresence>
        {showResult && result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="mt-8 bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl text-center max-w-sm w-full"
          >
            <Trophy className={`w-16 h-16 mx-auto mb-4 ${
              result === 'win' ? 'text-yellow-400' : 'text-gray-400'
            }`} />
            <h3 className="text-2xl font-bold mb-2">
              {result === 'win' ? '🎉 You Won! 🎉' : '😔 You Lost!'}
            </h3>
            {result === 'win' && (
              <p className="text-green-400 mb-4">
                +{betAmount * (selectedBet?.multiplier || 1)} coins
              </p>
            )}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  handleNewBet();
                
                }}
                className="bg-gray-700/50 hover:bg-gray-600/50 px-6 py-2 rounded-lg font-medium
                  transition-colors"
              >
                New Bet
              </button>
              <button
                onClick={() => {
                  const newAmt = walletBalance-totalBetAmt/2;
                  playAgainWithdraw(walletAddress,totalBetAmt/2, newAmt);
                  setShowResult(false);
                  setDiceNumber(null);

                }}
                className="bg-blue-600/80 hover:bg-blue-700/80 px-6 py-2 rounded-lg font-medium
                  transition-colors flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                Roll Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiceBetting;