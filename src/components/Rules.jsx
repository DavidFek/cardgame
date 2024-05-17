import { Link } from "react-router-dom";

export function Rules() {
  return (
    <div className="rules__wrapper">
      <h1 className="rules__title">Rules</h1>
      <p className="rules__text">
        Find all the matching pairs of cards to win the game!
      </p>
      <p className="rules__text">
        Click on a card to flip it over. If two flipped cards have the same
        image, they will stay flipped over. If they do not match, they will flip
        back over.
      </p>
      <p className="rules__text">Good luck!</p>
      <Link className="rules__button" to={"/game"}>
        Let's GO!
      </Link>
    </div>
  );
}

export default Rules;
