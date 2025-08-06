import { useContext, useEffect, useState } from 'react';
import Card from './Card/Card';
import type { GameProps, GameState, ICard } from '../../types';
import { generateInitialBoard } from './Game.utils';
import { cardEffects } from './cardEffects';
import { ScoreContext } from '../context/ScoreContext';

/**
 * CARD FUNCTIONS:
 * 1. Flip all orthogonally adjacent cards
 * 2. Flip over any two diagonally adjacent cards
 * 3. Without flipping, shuffle, then flip any corner card
 * 4. Flip all cross cards
 * 5. Flip any one cross card
 * 6. Swap with any card. Flip any other card
 * 7. Flip any one diagonally adjacent card
 * 8. Flip any one orthogongally adjacent card
 * 9. Flip any one corner card
 */

function Game({ onWin, onLoss }: GameProps) {
  const scoreContext = useContext(ScoreContext);

  // Add null check for type safety
  if (!scoreContext) {
    throw new Error('Game must be used within a ScoreProvider');
  }

  const { numberOfTurns, incrementTurns, reset: resetTurnCount } = scoreContext;

  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    activeCard: -1,
    gamePhase: 'waiting',
  });

  const [selectedCardPositions, setSelectedCardPositions] = useState<number[]>([]);

  useEffect(() => {
    const initialState = generateInitialBoard();
    setGameState({ ...initialState, gamePhase: 'waiting' });
  }, []);

  useEffect(() => {
    if (gameState.cards.length === 0) return;
    if (gameState.cards.every((card) => card.isFlipped)) {
      onWin();
    } else if (gameState.cards.every((card) => !card.isFlipped)) {
      onLoss();
    }
  }, [gameState.cards]);

  const executeActiveCard = () => {
    try {
      const cardFn = cardEffects[gameState.activeCard as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9];
      const newGameState = cardFn(gameState);
      setGameState(newGameState);
      incrementTurns();
    } catch (e) {
      console.error('Card execution failed:', e);
    }
  };

  const submitSelectedCards = () => {
    const result = gameState.pendingEffect?.fn?.(selectedCardPositions) ?? {
      cards: gameState.cards,
      activeCard: gameState.activeCard,
    };
    if (result.pendingEffect) {
      setGameState({
        cards: result.cards!,
        activeCard: result.activeCard,
        gamePhase: result.gamePhase ?? 'waiting',
        pendingEffect: result.pendingEffect,
      });
    } else {
      setGameState({
        cards: result.cards,
        activeCard: result.activeCard,
        gamePhase: 'waiting',
      });
    }
    setSelectedCardPositions([]);
  };

  const handleCardClick = (value: number) => {
    if (gameState.gamePhase !== 'selecting' && !gameState.pendingEffect) return;

    const cardPos = gameState.cards.findIndex((card) => card.value === value);

    if (!gameState.pendingEffect?.selectablePositions?.includes(cardPos)) return;

    if (selectedCardPositions.includes(cardPos))
      setSelectedCardPositions((prev) => prev.filter((pos) => pos !== cardPos));
    else if (selectedCardPositions.length < gameState.pendingEffect!.maxSelectionCount!)
      setSelectedCardPositions((prev) => [...prev, cardPos]);
  };

  const resetGame = () => {
    resetTurnCount();
    setGameState({ ...generateInitialBoard(), gamePhase: 'waiting' });
    setSelectedCardPositions([]);
  };

  return (
    <div className='game'>
      <div className=''>
        <h1>Logicards</h1>
        <button onClick={resetGame}>Reset</button>
      </div>
      <div className='play-area'>
        <div className='card-container'>
          {gameState?.cards?.map((card, index) => {
            return (
              <Card
                isActive={gameState.activeCard === card.value}
                key={card.value}
                details={card}
                onClick={handleCardClick}
                canSelect={gameState.pendingEffect?.selectablePositions.includes(index) ?? false}
                isSelected={selectedCardPositions.includes(index)}
              />
            );
          })}
        </div>
        <div className='button-container'>
          <span>Active Card: {gameState.activeCard}</span>
          <button onClick={executeActiveCard} disabled={gameState.gamePhase === 'selecting'}>
            Play
          </button>
          {gameState.gamePhase === 'selecting' && (
            <>
              <button
                onClick={submitSelectedCards}
                disabled={selectedCardPositions.length !== gameState.pendingEffect?.maxSelectionCount}
              >
                {gameState.pendingEffect?.step === 'swap'
                  ? 'Swap'
                  : gameState.pendingEffect?.step === 'flip'
                  ? 'Flip'
                  : 'Select'}
              </button>
            </>
          )}
        </div>
      </div>
      {/* <Card  /> */}
      <div className='info'>
        <h2>Number of turns: {numberOfTurns}</h2>
        {gameState.gamePhase === 'selecting' && (
          <>
            <h3>
              {gameState.pendingEffect?.step === 'swap'
                ? 'Select a card to swap with:'
                : gameState.pendingEffect?.step === 'flip'
                ? 'Select a card to flip:'
                : `Select any ${gameState.pendingEffect?.maxSelectionCount} card(s)`}{' '}
              <MiniMap cards={gameState.cards} allowedPositions={gameState.pendingEffect!.selectablePositions!} />
            </h3>
          </>
        )}
      </div>
    </div>
  );
}

const MiniMap = ({ cards, allowedPositions }: { cards: ICard[]; allowedPositions: number[] }) => {
  return (
    <div>
      <span>The following cards can be selected</span>
      <div className='minimap'>
        {cards.map((card, index) => {
          if (allowedPositions.includes(index)) return <span className='allowed'>{card.value}</span>;
          return <span className='not-allowed'>{card.value}</span>;
        })}
      </div>
    </div>
  );
};

export default Game;
