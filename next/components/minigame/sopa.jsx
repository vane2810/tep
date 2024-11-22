import React, { useState } from "react";

const WordSearchGame = ({ gameData }) => {
  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const { palabras, tablero, points, points_per_word, points_min } = gameData;

  // Manejar selección de celdas
  const handleCellSelect = (row, col) => {
    setSelectedCells((prev) => [...prev, { row, col }]);
  };

  // Validar la palabra seleccionada
  const validateWord = () => {
    const selectedWord = selectedCells.map((cell) => tablero[cell.row][cell.col]).join("");

    if (palabras.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      setFoundWords((prev) => [...prev, selectedWord]);
      setScore((prevScore) => prevScore + points_per_word);
    }

    setSelectedCells([]);

    // Verificar si el juego ha terminado
    if (foundWords.length + 1 === palabras.length) {
      setIsGameOver(true);
    }
  };

  // Reiniciar el juego
  const resetGame = () => {
    setFoundWords([]);
    setSelectedCells([]);
    setScore(0);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div>
        <h1>Juego Finalizado</h1>
        <p>Puntaje obtenido: {score}</p>
        {score >= points_min ? (
          <p>¡Felicidades, completaste el juego!</p>
        ) : (
          <p>No alcanzaste el puntaje mínimo. Inténtalo de nuevo.</p>
        )}
        <button onClick={resetGame}>Reintentar</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Sopa de Letras</h1>
      <p>Puntaje: {score}</p>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${tablero[0].length}, 1fr)`,
            gap: "5px",
            marginBottom: "20px",
          }}
        >
          {tablero.map((row, rowIndex) =>
            row.map((letter, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellSelect(rowIndex, colIndex)}
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: selectedCells.some(
                    (cell) => cell.row === rowIndex && cell.col === colIndex
                  )
                    ? "lightblue"
                    : "white",
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {letter}
              </div>
            ))
          )}
        </div>
        <button onClick={validateWord} disabled={selectedCells.length === 0}>
          Validar Palabra
        </button>
      </div>
      <div>
        <h2>Palabras encontradas:</h2>
        <ul>
          {foundWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WordSearchGame;