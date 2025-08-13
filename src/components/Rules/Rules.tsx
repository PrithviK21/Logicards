import pg1 from "../../assets/images/rules/pg1.png";
function Rules({ returnToMenu }: { returnToMenu: () => void }) {
  return (
    <>
      <button className="rules-header" onClick={returnToMenu}>
        Menu
      </button>
      <div className="rules">
        <img src={pg1} alt="Rules page 1" />
      </div>
    </>
  );
}

export default Rules;
