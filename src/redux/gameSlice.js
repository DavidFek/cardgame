import { createSlice } from "@reduxjs/toolkit";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import image8 from "../assets/image8.png";
import image9 from "../assets/image9.png";
import image10 from "../assets/image10.png";

const allImages = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];

const numPairs = 5;
const images = generateImages(numPairs);

function preloadImages(images) {
  images.forEach((image) => {
    new Image().src = image;
  });
}

function generateImages(numPairs) {
  if (numPairs > allImages.length || numPairs < 1) {
    throw new Error(`Cannot generate more than ${allImages.length} pairs`);
  }
  const images = [];
  for (let i = 0; i < numPairs; i++) {
    images.push(allImages[i], allImages[i]);
  }
  return shuffle(images);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const gameSlice = createSlice({
  name: "game",
  initialState: {
    cards: images.map((image, i) => ({
      id: i,
      image,
      isFlipped: false,
      canFlip: true,
    })),
    flippedCards: [],
    gameOver: false,
    score: 0,
  },
  reducers: {
    flipCard: (state, action) => {
      const cardId = action.payload;
      const cardIndex = state.cards.findIndex((card) => card.id === cardId);

      if (
        cardIndex > -1 &&
        !state.cards[cardIndex].isFlipped &&
        state.cards[cardIndex].canFlip
      ) {
        state.cards[cardIndex].isFlipped = true;
        state.flippedCards.push({ ...state.cards[cardIndex] });
      }

      if (state.flippedCards.length === 2) {
        const [card1, card2] = state.flippedCards;

        if (card1.image === card2.image) {
          state.cards[card1.id].canFlip = false;
          state.cards[card2.id].canFlip = false;
          state.score += 1;
        }

        state.flippedCards = [];

        if (state.cards.every((card) => card.isFlipped)) {
          state.gameOver = true;
        }
      }
    },
    setNumPairs: (state, action) => {
      const numPairs = action.payload;
      const images = generateImages(numPairs);
      const shuffledImages = shuffle(images);
      preloadImages(shuffledImages);
      state.cards = images.map((image, i) => ({
        id: i,
        image,
        isFlipped: false,
        canFlip: true,
      }));
      state.flippedCards = [];
      state.gameOver = false;
      state.score = 0;
    },
    flipCardBack: (state, action) => {
      const cardId = action.payload;
      const cardIndex = state.cards.findIndex((card) => card.id === cardId);

      if (cardIndex > -1) {
        state.cards[cardIndex].isFlipped = false;
      }
    },
    resetGame: (state) => {
      const numPairs = state.cards.length / 2;
      const images = generateImages(numPairs);
      const shuffledImages = shuffle(images);
      preloadImages(shuffledImages);
      state.cards = shuffledImages.map((image, i) => ({
        id: i,
        image,
        isFlipped: false,
        canFlip: true,
      }));
      state.flippedCards = [];
      state.gameOver = false;
      state.score = 0;
    },
  },
});

export const { actions, reducer } = gameSlice;
export default reducer;

export { generateImages };
