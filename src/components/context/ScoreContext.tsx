import { createContext, useState } from 'react';

type ScoreContextType = {
  numberOfTurns: number;
  incrementTurns: () => void;
  reset: () => void;
};

const ScoreContext = createContext<ScoreContextType | null>(null);

const ScoreContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [numberOfTurns, setNumberOfTurns] = useState<number>(0);
  const incrementTurns = () => setNumberOfTurns((turns) => turns + 1);
  const reset = () => setNumberOfTurns(0);

  return <ScoreContext.Provider value={{ numberOfTurns, incrementTurns, reset }}>{children}</ScoreContext.Provider>;
};

export { ScoreContext, ScoreContextProvider };
