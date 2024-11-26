import React, { useState, useEffect } from "react";

const Rompecabezas = ({ gameData }) => {
  const [pieces, setPieces] = useState([]);
  const [shuffledPieces, setShuffledPieces] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(gameData.time_limit);
  const [draggedPieceIndex, setDraggedPieceIndex] = useState(null);

  const { imagen, numPiezas, points, points_min, time_limit } = gameData;

  useEffect(() => {
    const generatePieces = () => {
      const tempPieces = Array.from({ length: numPiezas }, (_, i) => i);
      setPieces(tempPieces);
      setShuffledPieces(shuffleArray(tempPieces));
    };
    generatePieces();

    if (time_limit) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0) {
            clearInterval(countdown);
            setIsGameOver(true);
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [numPiezas, time_limit]);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleDragStart = (index) => {
    setDraggedPieceIndex(index);
  };

  const handleDrop = (targetIndex) => {
    if (draggedPieceIndex === null) return;

    const newPieces = [...shuffledPieces];
    [newPieces[draggedPieceIndex], newPieces[targetIndex]] = [
      newPieces[targetIndex],
      newPieces[draggedPieceIndex],
    ];
    setShuffledPieces(newPieces);
    setDraggedPieceIndex(null);
  };

  const validatePuzzle = () => {
    const isCorrect = shuffledPieces.every((piece, index) => piece === pieces[index]);
    if (isCorrect) {
      setScore(points);
      setIsGameOver(true);
    } else {
      setScore(0);
      setIsGameOver(true);
    }
  };

  const resetGame = () => {
    setPieces([]);
    setShuffledPieces([]);
    setScore(0);
    setTimer(time_limit);
    setIsGameOver(false);
    const generatePieces = () => {
      const tempPieces = Array.from({ length: numPiezas }, (_, i) => i);
      setPieces(tempPieces);
      setShuffledPieces(shuffleArray(tempPieces));
    };
    generatePieces();
  };

  const gridSize = Math.sqrt(numPiezas); // Número de filas y columnas
  const pieceSize = 100 / gridSize; // Tamaño de cada pieza como porcentaje

  if (isGameOver) {
    return (
      <div>
        <h1>Juego Finalizado</h1>
        <p>Puntaje obtenido: {score}</p>
        {score >= points_min ? (
          <p>¡Felicidades, completaste el rompecabezas!</p>
        ) : (
          <p>No alcanzaste el puntaje mínimo. Inténtalo de nuevo.</p>
        )}
        <button onClick={resetGame}>Reintentar</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Rompecabezas</h1>
      <p>Tiempo restante: {time_limit ? `${timer}s` : "Sin límite"}</p>
      <p>Puntaje: {score}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: "2px",
          width: "300px",
          height: "300px",
          margin: "0 auto",
        }}
      >
        {shuffledPieces.map((piece, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${imagen})`,
              backgroundPosition: `${(piece % gridSize) * pieceSize}% ${
                Math.floor(piece / gridSize) * pieceSize
              }%`,
              backgroundSize: `${gridSize * 100}%`,
              backgroundRepeat: "no-repeat",
              border: "1px solid black",
              cursor: "grab",
            }}
          ></div>
        ))}
      </div>
      <button onClick={validatePuzzle} style={{ marginTop: "20px" }}>
        Validar
      </button>
    </div>
  );
};

export default Rompecabezas;
