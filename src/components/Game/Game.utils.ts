import type { ICard } from '../../types';

const getOrthogonallyAdjacent = (position: number): number[] => {
  const row = Math.floor(position / 3);
  const col = position % 3;
  const adjacent = [];

  if (row > 0) adjacent.push(position - 3); // top
  if (row < 2) adjacent.push(position + 3); // bottom
  if (col > 0) adjacent.push(position - 1); // left
  if (col < 2) adjacent.push(position + 1); // right

  return adjacent;
};
/**
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */
const getDiagonallyAdjacent = (position: number): number[] => {
  const row = Math.floor(position / 3);
  const col = position % 3;
  const adjacent = [];
  // top left
  if (row > 0 && col > 0) adjacent.push(position - 4);
  // top right
  if (row > 0 && col < 2) adjacent.push(position - 2);
  // bottom left
  if (row < 2 && col > 0) adjacent.push(position + 2);
  // bottom right
  if (row < 2 && col < 2) adjacent.push(position + 4);

  return adjacent;
};

const getCardValuesAsString = (positions: number[], cards: ICard[]) => {
  const cardValues: number[] = [];
  positions.forEach((pos) => {
    cardValues.push(cards[pos].value);
  });
  return cardValues.join(', ');
};

const shuffle = (originalCards: ICard[]) => {
  const newCards = [...originalCards];
  for (let i = newCards.length - 1; i > 1; i--) {
    const j = Math.round(Math.random() * i);
    const temp = newCards[j];
    newCards[j] = newCards[i];
    newCards[i] = temp;
  }
  return newCards;
};

const generateInitialBoard = () => {
  let cards: ICard[] = [];
  for (let i = 1; i < 10; i++) {
    cards.push({
      value: i,
      isFlipped: false,
    });
  }
  cards = shuffle(cards);
  const randomActive = Math.floor(Math.random() * 9);
  cards[randomActive].isFlipped = true;
  return { cards: cards, activeCard: cards[randomActive].value };
};

const findActiveCard = (cards: ICard[], activeCard: number, newCards: ICard[] = []) => {
  if (newCards.length > 0) {
    let maxCard = { value: 0 };
    newCards.forEach((card) => {
      if (card.value > maxCard.value) {
        maxCard = card;
      }
    });
    return maxCard.value;
  } else {
    let closestHigherCard = 10;
    cards.forEach((card) => {
      if (!card.isFlipped) return;
      const currDiff = card.value - activeCard;
      if (currDiff > 0 && currDiff < closestHigherCard - activeCard) closestHigherCard = card.value;
    });
    if (closestHigherCard !== 10) return closestHigherCard;

    let closestLowerCard = 0;
    cards.forEach((card) => {
      if (!card.isFlipped) return;
      const currDiff = activeCard - card.value;
      if (currDiff > 0 && currDiff < activeCard - closestLowerCard) closestLowerCard = card.value;
    });
    if (closestLowerCard !== 0) return closestLowerCard;
    return activeCard;
  }
};

const flipCardsAndGetActive = (selectedCardPositions: number[], currentActiveValue: number, cards: ICard[]) => {
  const newCards = [...cards];
  const flippedCards: ICard[] = [];
  selectedCardPositions.forEach((cardPos) => {
    newCards[cardPos].isFlipped = !newCards[cardPos].isFlipped;
    if (newCards[cardPos].isFlipped) flippedCards.push(newCards[cardPos]);
  });
  const newActiveCard = findActiveCard(newCards, currentActiveValue, flippedCards);
  return { cards: newCards, activeCard: newActiveCard };
};

export {
  findActiveCard,
  flipCardsAndGetActive,
  generateInitialBoard,
  shuffle,
  getCardValuesAsString,
  getOrthogonallyAdjacent,
  getDiagonallyAdjacent,
};
