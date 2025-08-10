function Menu({
  onPlay,
  onRules,
}: {
  onPlay: () => void;
  onRules: () => void;
}) {
  return (
    <div className="menu">
      <h1>Logicards</h1>
      <button onClick={onPlay}>Play</button>
      <button onClick={onRules}>How to Play</button>
      {/* <button onClick={onPlay}>About</button> */}
    </div>
  );
}

export default Menu;
