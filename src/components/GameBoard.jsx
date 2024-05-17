import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions, generateImages } from "../redux/gameSlice";
import Card from "./Card";

function GameBoard() {
  const dispatch = useDispatch();
  const { cards, gameOver, score } = useSelector((state) => state.game);
  const flippedCards = useRef([]);
  const [numPairs, setNumPairs] = useState(5);
  const game = useSelector((state) => state.game.gameOver);

  useEffect(() => {
    dispatch(actions.setNumPairs(numPairs));
  }, [numPairs, dispatch]);

  const handleNewGame = () => {
    dispatch(actions.resetGame());
    dispatch(actions.setNumPairs(numPairs));
  };

  const handleCardClick = (card) => {
    if (flippedCards.current.length >= 2) return;
    dispatch(actions.flipCard(card.id));
    flippedCards.current = [...flippedCards.current, card];
  };

  useEffect(() => {
    if (flippedCards.current.length === 2) {
      const [card1, card2] = flippedCards.current;
      if (card1.image !== card2.image) {
        setTimeout(() => {
          dispatch(actions.flipCardBack(card1.id));
          dispatch(actions.flipCardBack(card2.id));
          flippedCards.current = [];
        }, 1000);
      } else {
        flippedCards.current = [];
      }
    }
  }, [flippedCards.current, dispatch]);

  return (
    <div className="gameboard__wrapper">
      <div className="gameboard__info-wrapper">
        <div className="gameboard__score">Score: {score}</div>
        <button className="gameboard__button-new" onClick={handleNewGame}>
          New Game
        </button>
        <p>Number of pairs:</p>
        <input
          className="gameboard__input"
          type="number"
          min="1"
          max="10"
          value={numPairs}
          onChange={(e) => setNumPairs(e.target.value)}
        />
      </div>
      {game && <div className="gameboard__win">You win!</div>}
      <div className="card-wrapper">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={card.isFlipped}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default GameBoard;
