import React from "react";

function Card({ card, isFlipped, handleCardClick }) {
  const handleClick = () => {
    handleCardClick(card);
  };

  return (
    <div
      className={card.canFlip ? "card-item" : "card-item-flipped"}
      onClick={handleClick}
    >
      {isFlipped ? <img className="card-image" src={card.image} alt="" /> : " "}
    </div>
  );
}

export default Card;
