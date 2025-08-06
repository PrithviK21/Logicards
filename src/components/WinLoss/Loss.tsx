import type { WinLossProps } from '../../types';

function Loss({ returnToMenu }: WinLossProps) {
  return (
    <div className='menu'>
      <h1>YOU LOSE</h1>
      <button onClick={returnToMenu}>Return to Menu</button>
    </div>
  );
}

export default Loss;
