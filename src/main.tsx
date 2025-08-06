import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ScoreContextProvider } from './components/context/ScoreContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScoreContextProvider>
      <App />
    </ScoreContextProvider>
  </StrictMode>
);
