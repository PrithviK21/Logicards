import pg1 from "../../assets/images/rules/pg1.png";
import pg2 from "../../assets/images/rules/pg2.png";
function Rules({ returnToMenu }: { returnToMenu: () => void }) {
  return (
    <>
      <button className="rules-header" onClick={returnToMenu}>
        Return To Menu
      </button>
      <div className="rules">
        <img src={pg1} alt="Rules page 1" />
        <img src={pg2} alt="Rules page 2" />
      </div>
    </>
  );
}

export default Rules;
