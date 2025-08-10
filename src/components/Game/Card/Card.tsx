import type { CardProps } from "../../../types";
import { cardImages } from "../../../utils/images";

function Card({
  details,
  onClick,
  isSelected,
  isActive,
  canSelect,
}: CardProps) {
  const imgMap = cardImages[details.value - 1];
  const imgPath = details.isFaceUp ? imgMap.front : imgMap.back;
  return (
    <div
      className={`card ${isSelected ? "selected" : ""} 
      ${isActive ? "active" : ""}
      ${canSelect ? "can-select" : ""}
      ${details.isFaceUp ? "flipped" : ""}`}
      onClick={() => onClick(details.value)}
    >
      <img src={imgPath} alt={`Card with ${details.value} on it`} />
    </div>
  );
}

export default Card;
