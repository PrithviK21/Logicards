import { useContext, useState } from "react";
import "./App.css";
import Game from "./components/Game/Game";
import Menu from "./components/Menu/Menu";
import Win from "./components/WinLoss/Win";
import Loss from "./components/WinLoss/Loss";
import { ScoreContext } from "./components/context/ScoreContext";
import Rules from "./components/Rules/Rules";

const GAME_STATES = {
  MENU: "menu",
  RULES: "rules",
  GAME: "game",
  WIN: "win",
  LOSS: "loss",
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
  const [gameState, setGameState] = useState(GAME_STATES.MENU);
  const scoreContext = useContext(ScoreContext);

  // Add null check for type safety
  if (!scoreContext) {
    throw new Error("Game must be used within a ScoreProvider");
  }

  const { reset } = scoreContext;

  const returnToMenu = () => {
    setGameState(GAME_STATES.MENU);
    reset();
  };

  if (gameState === GAME_STATES.MENU) {
    return (
      <Menu
        onPlay={() => setGameState(GAME_STATES.GAME)}
        onRules={() => setGameState(GAME_STATES.RULES)}
      />
    );
  }
  if (gameState === GAME_STATES.GAME) {
    return (
      <Game
        onWin={() => setGameState(GAME_STATES.WIN)}
        onLoss={() => setGameState(GAME_STATES.LOSS)}
        returnToMenu={() => setGameState(GAME_STATES.MENU)}
      />
    );
  }
  if (gameState === GAME_STATES.RULES) {
    return <Rules returnToMenu={returnToMenu} />;
  }
  if (gameState === GAME_STATES.WIN) {
    return <Win returnToMenu={returnToMenu} />;
  }
  if (gameState === GAME_STATES.LOSS) {
    return <Loss returnToMenu={returnToMenu} />;
  }
}

export default App;
