import { useContext, useState } from 'react';
import './App.css';
import Game from './components/Game/Game';
import Menu from './components/Menu/Menu';
import Win from './components/WinLoss/Win';
import Loss from './components/WinLoss/Loss';
import { ScoreContext } from './components/context/ScoreContext';

const GAME_STATES = {
  MENU: 'menu',
  GAME: 'game',
  WIN: 'win',
  LOSS: 'loss',
};

/**
 * 3x3 grid of cards.
 * Shuffle them. Flip 1 randomly
 *
 * LOOP
 * Player clicks Play button. Active Card is executed
 * Perform card function. Need to be able to do all.
 * New Active Card is found based on rules
 * Check until win or loss
 * END LOOP
 *
 */

function App() {
  const [gameState, setGameState] = useState(GAME_STATES.GAME);
  const scoreContext = useContext(ScoreContext);

  // Add null check for type safety
  if (!scoreContext) {
    throw new Error('Game must be used within a ScoreProvider');
  }

  const { reset } = scoreContext;

  const returnToMenu = () => {
    setGameState(GAME_STATES.MENU);
    reset();
  };

  if (gameState === GAME_STATES.MENU) {
    return <Menu onPlay={() => setGameState(GAME_STATES.GAME)} />;
  }
  if (gameState === GAME_STATES.GAME) {
    return <Game onWin={() => setGameState(GAME_STATES.WIN)} onLoss={() => setGameState(GAME_STATES.LOSS)} />;
  }
  if (gameState === GAME_STATES.WIN) {
    return <Win returnToMenu={returnToMenu} />;
  }
  if (gameState === GAME_STATES.LOSS) {
    return <Loss returnToMenu={returnToMenu} />;
  }
}

export default App;
