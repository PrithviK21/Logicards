import type { CardProps } from "../../../types";

function Card({
  details,
  onClick,
  isSelected,
  isActive,
  canSelect,
}: CardProps) {
  const imgPath = `images/cards/${!details.isFlipped ? "backs/" : ""}${
    details.value
  }.png`;

  return (
    <div
      className={`card ${isSelected ? "selected" : ""} 
      ${isActive ? "active" : ""}
      ${canSelect ? "can-select" : ""}
      ${details.isFlipped ? "flipped" : ""}`}
      onClick={() => onClick(details.value)}
    >
      <img src={imgPath} alt={`Card with ${details.value} on it`} />
    </div>
  );
}

export default Card;
