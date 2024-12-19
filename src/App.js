import React, { useState, useEffect } from "react";
import "./App.css";
import Firework from "./components/Firework";

const phrases = [
  "Player dives to win a foul.",
  "A missed penalty.",
  "A yellow card is given.",
  "A red card is shown.",
  "A player argues with the referee.",
  "A substitution happens.",
  "A corner kick is taken.",
  "A goal is disallowed by VAR.",
  "A free kick hits the wall.",
  "A player celebrates by taking off their shirt.",
  "The crowd boos at a decision.",
  "Fans start singing loudly.",
  "A streaker runs onto the pitch.",
  "The camera cuts to a disappointed fan.",
  "Commentators mention the atmosphere.",
  "A coach is seen yelling instructions.",
  "The fans chant for a substitution.",
  "An empty section of the stadium is shown.",
  "The ball hits the crossbar.",
  "A shot goes wildly off target.",
  "A defensive error leads to a goal.",
  "The goalkeeper makes a double save.",
  "A goal is scored from a corner.",
  "An own goal is scored.",
  "A player injured and subbed out."
];

// Generate a shuffled grid of phrases
const shuffledPhrases = [...phrases].sort(() => Math.random() - 0.5);



function App() {
  const [marked, setMarked] = useState(Array(25).fill(false));              // Tracks cell state
  const [bingo, setBingo] = useState(false);                                // Tracks win condition
  const [winningPatterns, setWinningPatterns] = useState([]);               // Multiple patterns


  const toggleCell = (index) => {
    const updatedMarked = [...marked];                                      // Copy the current state
    updatedMarked[index] = !updatedMarked[index];                           // Toggle the cell state
  
    setMarked(updatedMarked); // Update state
    checkWin(updatedMarked);  // Recalculate Bingo patterns
  };

  useEffect(() => {
    checkWin();
  }, [marked]);

  // Check rows, columns, and diagonals for Bingo
  const checkWin = (updatedState = marked) => {
    const winningPatternsList = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];
  
    let newPatterns = [];
    for (const pattern of winningPatternsList) {
      if (pattern.every((index) => index === 12 || updatedState[index])) {
        // Check if the pattern is already in winningPatterns
        if (!winningPatterns.some((existingPattern) =>
            existingPattern.every((idx) => pattern.includes(idx))
          )) {
          newPatterns.push(pattern); // Add the new pattern if it's not already tracked
        }
      }
    }
  
    if (newPatterns.length > 0) {
      setWinningPatterns((prev) => [...prev, ...newPatterns]); // Append new patterns
      setBingo(true);
    } else if (winningPatterns.length === 0) {
      setBingo(false); // Reset Bingo if no patterns exist
    }
  };

  return (
    <div className="app">
      {!bingo && <h1>Football Bingo Game 🎉</h1>}
      {bingo && <Firework/>}
      {bingo && <h1 className="win-message">🎊 Bingo! You Won! 🎊</h1>}
      <div className="bingo-board">
      {shuffledPhrases.map((phrase, index) => {
        return (
            <div
              key={index}
              className={`bingo-cell 
                ${marked[index] ? "selected" : ""} 
                ${winningPatterns.some((pattern) => pattern.includes(index)) ? "bingo" : ""} 
                ${index === 12 ? "free" : ""}`}
              onClick={() => toggleCell(index)}
            >
              {index === 12 ? "FOOTBALL" : phrase}
            </div>
        );
    })}
      </div>
    </div>
  );
}

export default App;
