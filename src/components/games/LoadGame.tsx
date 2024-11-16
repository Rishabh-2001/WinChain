import React from 'react'
import TicTacToe from '../../games/tic-tac-toe/components/TicTacToeGame'
import RockPaperScissors from '../../games/rock-paper-scissors/components/RockPaperScissors'
import DiceBetting from '../../games/dice-betting/components/DiceBetting'

const LoadGame = ({gameId,players, totalBetAmt}) => {
   
    function renderGame()
    {
        if(gameId==='tic-tac-toe')
        {
            return  <TicTacToe players={players} totalBetAmt={totalBetAmt} />
        } 
        else if(gameId==='rock-paper-scissors')
        {
            return <RockPaperScissors  players={players}  totalBetAmt={totalBetAmt} />
        }
        else if(gameId==='dice-roll'){
           return <DiceBetting players={players} totalBetAmt={totalBetAmt}  />
        }
    }
  return (
    <div>
        {renderGame()}
    </div>
  )
}

export default LoadGame