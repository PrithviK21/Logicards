import { useContext } from 'react';
import type { WinLossProps } from '../../types';
import { ScoreContext } from '../context/ScoreContext';

function Win({ returnToMenu }: WinLossProps) {
  const scoreContext = useContext(ScoreContext);

  // Add null check for type safety
  if (!scoreContext) {
    throw new Error('Game must be used within a ScoreProvider');
  }

  const { numberOfTurns } = scoreContext;

  return (
    <div className='menu'>
      <h1>YOU WIN</h1>
      <h3>You completed the puzzle in {numberOfTurns} turns</h3>
      <button onClick={returnToMenu}>Return to Menu</button>
    </div>
  );
}

export default Win;
