import { cardImages } from "../../../utils/images";

function ReadOnlyCard({ value }: { value: number }) {
  const imgMap = cardImages[value - 1];
  const imgPath = imgMap.front;
  return (
    <div className="card flipped read-only">
      <img src={imgPath} alt={`Card with ${value} on it`} />
    </div>
  );
}

export default ReadOnlyCard;
