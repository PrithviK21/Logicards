export type ICard = {
  value: number;
  isFaceUp: boolean;
  isSelected?: boolean;
};
export type GameState = {
  cards: ICard[];
  activeCard: number;
  gamePhase: "waiting" | "selecting" | "animating";
  pendingEffect?: PendingEffect;
};

interface PendingEffect {
  step?: "swap" | "flip" | "select";
  requiresSelection: boolean;
  maxSelectionCount: number;
  selectablePositions: number[];
  fn: (selectedPositions: number[]) => GameStateUpdate;
}

interface GameStateUpdate {
  cards: ICard[];
  activeCard: number;
  gamePhase?: "waiting" | "selecting";
  pendingEffect?: PendingEffect;
}

////////////// PROP TYPES /////////////

export type GameProps = {
  onWin: () => void;
  onLoss: () => void;
};

export type WinLossProps = {
  returnToMenu: () => void;
};

export type CardProps = {
  details: ICard;
  onClick: (value: number) => void;
  isSelected: boolean;
  isActive: boolean;
  canSelect: boolean;
};
