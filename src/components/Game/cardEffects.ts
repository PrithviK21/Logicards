import { CROSS_CARD_POSITIONS } from "../../constants";
import type { GameState, ICard } from "../../types";
import {
  getOrthogonallyAdjacent,
  findActiveCard,
  getDiagonallyAdjacent,
  flipCardsAndGetActive,
  shuffle,
} from "./Game.utils";

export const cardEffects: {
  1: (state: GameState) => GameState;
  2: (state: GameState) => GameState;
  3: (state: GameState) => GameState;
  4: (state: GameState) => GameState;
  5: (state: GameState) => GameState;
  6: (state: GameState) => GameState;
  7: (state: GameState) => GameState;
  8: (state: GameState) => GameState;
  9: (state: GameState) => GameState;
} = {
  1: (state: GameState) => {
    const activePos = state.cards.findIndex(
      (card) => card.value === state.activeCard
    );
    const newCards = [...state.cards];

    const adjacentPositions = getOrthogonallyAdjacent(activePos);
    const flippedCards: ICard[] = [];
    adjacentPositions.forEach((pos) => {
      if (pos >= 0 && pos < 9) {
        newCards[pos].isFaceUp = !newCards[pos].isFaceUp;
        if (newCards[pos].isFaceUp) {
          flippedCards.push(newCards[pos]);
        }
      }
    });
    const newActiveCard = findActiveCard(newCards, 1, flippedCards);
    return {
      ...state,
      cards: newCards,
      activeCard: newActiveCard,
      gamePhase: "waiting" as const,
    };
  },
  2: (state: GameState) => {
    const activePos = state.cards.findIndex((card) => card.value === 2);
    const diagonalPositions = getDiagonallyAdjacent(activePos);
    //TODO: User should now be able to select 2 from diagonal pos, and then flip them
    return {
      ...state,
      gamePhase: "selecting" as const,
      pendingEffect: {
        fn: (selectedCardPositions: number[]) => {
          return flipCardsAndGetActive(selectedCardPositions, 2, state.cards);
        },
        requiresSelection: true,
        maxSelectionCount: Math.min(2, diagonalPositions.length),
        selectablePositions: diagonalPositions, // all positions
      },
    };
  },
  3: (state: GameState) => {
    const newCards = shuffle(state.cards);
    return {
      ...state,
      cards: newCards,
      gamePhase: "selecting" as const,
      pendingEffect: {
        fn: (selectedCardPositions: number[]) => {
          return flipCardsAndGetActive(selectedCardPositions, 3, newCards);
        },
        requiresSelection: true,
        maxSelectionCount: 1,
        selectablePositions: [0, 2, 6, 8], // all positions
      },
    };
  },
  4: (state: GameState) => {
    const newCards = [...state.cards];
    const flippedCards: ICard[] = [];
    CROSS_CARD_POSITIONS.forEach((pos) => {
      newCards[pos].isFaceUp = !newCards[pos].isFaceUp;
      if (newCards[pos].isFaceUp) {
        flippedCards.push(newCards[pos]);
      }
    });
    const newActiveCard = findActiveCard(
      newCards,
      state.activeCard,
      flippedCards
    );
    return {
      ...state,
      cards: newCards,
      activeCard: newActiveCard,
      gamePhase: "waiting" as const,
    };
  },
  5: (state: GameState) => {
    const newCards = [...state.cards];
    return {
      ...state,
      cards: newCards,
      gamePhase: "selecting" as const,
      pendingEffect: {
        fn: (selectedCardPositions: number[]) => {
          return flipCardsAndGetActive(selectedCardPositions, 5, newCards);
        },
        requiresSelection: true,
        maxSelectionCount: 1,
        selectablePositions: CROSS_CARD_POSITIONS, // all positions
      },
    };
  },
  6: (state: GameState) => {
    const newCards = [...state.cards];
    const activePos = newCards.findIndex(
      (card) => card.value === state.activeCard
    );
    return {
      ...state,
      cards: newCards,
      gamePhase: "selecting" as const,
      pendingEffect: {
        fn: (selectedCardPositions: number[]) => {
          const posToSwapWith = selectedCardPositions[0];
          const temp = newCards[activePos];
          newCards[activePos] = newCards[posToSwapWith];
          newCards[posToSwapWith] = temp;
          return {
            ...state,
            cards: newCards,
            gamePhase: "selecting" as const,
            pendingEffect: {
              fn: (selectedCardPositions: number[]) => {
                return flipCardsAndGetActive(
                  selectedCardPositions,
                  6,
                  newCards
                );
              },
              requiresSelection: true,
              maxSelectionCount: 1,
              selectablePositions: [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(
                (pos) => ![activePos, posToSwapWith].includes(pos)
              ), // all positions except own
              step: "flip",
            },
          };
          // return flipCardsAndGetActive(selectedCardPositions,6,newCards)
        },
        requiresSelection: true,
        maxSelectionCount: 1,
        selectablePositions: [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(
          (pos) => pos != activePos
        ), // all positions except own
        step: "swap",
      },
    };
  },
  7: (state: GameState) => {
    const activePos = state.cards.findIndex((card) => card.value === 7);
    const newCards = [...state.cards];

    const diagonalPositions = getDiagonallyAdjacent(activePos);

    return {
      ...state,
      cards: newCards,
      gamePhase: "selecting" as const,
      pendingEffect: {
        fn: (selectedCardPositions: number[]) => {
          return flipCardsAndGetActive(selectedCardPositions, 7, newCards);
        },
        requiresSelection: true,
        maxSelectionCount: 1,
        selectablePositions: diagonalPositions, // all positions
      },
    };
  },
  8: (state: GameState) => {
    const activePos = state.cards.findIndex((card) => card.value === 8);
    const newCards = [...state.cards];

    const adjacentPositions = getOrthogonallyAdjacent(activePos);

    return {
      ...state,
      cards: newCards,
      gamePhase: "selecting" as const,
      pendingEffect: {
        fn: (selectedCardPositions: number[]) => {
          return flipCardsAndGetActive(selectedCardPositions, 8, newCards);
        },
        requiresSelection: true,
        maxSelectionCount: 1,
        selectablePositions: adjacentPositions, // all positions
      },
    };
  },
  9: (state: GameState) => {
    const newCards = [...state.cards];
    const availablePositions = [0, 2, 6, 8];

    return {
      ...state,
      cards: newCards,
      gamePhase: "selecting" as const,
      pendingEffect: {
        fn: (selectedCardPositions: number[]) => {
          return flipCardsAndGetActive(selectedCardPositions, 9, newCards);
        },
        requiresSelection: true,
        maxSelectionCount: 1,
        selectablePositions: availablePositions, // all positions
      },
    };
  },
};
