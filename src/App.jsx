import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./redux/gameSlice";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameBoard from "./components/GameBoard";
import Rules from "./components/Rules";

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/game" element={<GameBoard />} />
          <Route path="/" element={<Rules />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
