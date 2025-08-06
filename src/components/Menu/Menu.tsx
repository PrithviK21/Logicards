function Menu({ onPlay }: { onPlay: () => void }) {
  return (
    <div className='menu'>
      <h1>Logicards</h1>
      <button onClick={onPlay}>Play</button>
    </div>
  );
}

export default Menu;
