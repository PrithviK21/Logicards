function Rules({ returnToMenu }: { returnToMenu: () => void }) {
  return (
    <>
      <button className="rules-header" onClick={returnToMenu}>
        Menu
      </button>
      <div
        className="rules"
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#2f4d68", marginBottom: "1rem" }}>
          How to Play Logicards
        </h1>
        <ol
          style={{
            fontSize: "1.2rem",
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "left",
            background: "#f6faff",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 2px 8px #dbeafe",
          }}
        >
          <li>
            <strong>Goal:</strong> Flip all cards face up using the powers of
            the active card.
          </li>
          <li>
            <strong>Setup:</strong> 9 cards are shuffled in a 3x3 grid. One card
            starts face up as the <b>Active Card</b>.
          </li>
          <li>
            <strong>Turn:</strong> Click <b>Play</b> to use the Active Card’s
            power. Some powers let you select cards to flip or swap.
          </li>
          <li>
            <strong>Active Card Powers:</strong>
            <ul style={{ marginTop: "0.5rem" }}>
              <li>
                <b>1:</b> Flip all orthogonally adjacent cards (up, down, left,
                right).
              </li>
              <li>
                <b>2:</b> Flip any two diagonally adjacent cards.
              </li>
              <li>
                <b>3:</b> Shuffle all cards, then flip any corner card.
              </li>
              <li>
                <b>4:</b> Flip all cross cards (non corner cards).
              </li>
              <li>
                <b>5:</b> Flip any one cross card.
              </li>
              <li>
                <b>6:</b> Swap with any card, then flip any card except the
                swapped one.
              </li>
              <li>
                <b>7:</b> Flip any one diagonally adjacent card.
              </li>
              <li>
                <b>8:</b> Flip any one orthogonally adjacent card.
              </li>
              <li>
                <b>9:</b> Flip any one corner card.
              </li>
            </ul>
          </li>
          <li>
            <strong>After Each Turn:</strong> The next Active Card is chosen
            from the face-up cards by he game.
          </li>
          <li>
            <strong>Win:</strong> All cards are face up.
            <br />
            <strong>Lose:</strong> All cards are face down.
          </li>
        </ol>
      </div>
    </>
  );
}

export default Rules;
