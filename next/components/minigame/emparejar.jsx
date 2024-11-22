import React, { useState } from "react";

const Emparejar = ({ gameData }) => {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matches, setMatches] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const { pares, points, points_per_pair, points_min } = gameData;

  // Manejar selección en la columna izquierda
  const handleLeftSelect = (element) => {
    setSelectedLeft(element);
  };

  // Manejar selección en la columna derecha
  const handleRightSelect = (element) => {
    setSelectedRight(element);
  };

  // Validar emparejamiento
  const validateMatch = () => {
    if (!selectedLeft || !selectedRight) return;

    const isCorrect = pares.some(
      (pair) => pair.elemento1 === selectedLeft && pair.elemento2 === selectedRight
    );

    if (isCorrect) {
      setMatches((prev) => [...prev, selectedLeft]);
      setScore((prevScore) => prevScore + points_per_pair);
    }

    setSelectedLeft(null);
    setSelectedRight(null);

    // Verificar si el juego ha terminado
    if (matches.length + 1 === pares.length) {
      setIsGameOver(true);
    }
  };

  // Reiniciar el juego
  const resetGame = () => {
    setMatches([]);
    setScore(0);
    setSelectedLeft(null);
    setSelectedRight(null);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div>
        <h1>Juego Finalizado</h1>
        <p>Puntaje obtenido: {score}</p>
        {score >= points_min ? (
          <p>¡Felicidades, aprobaste el juego!</p>
        ) : (
          <p>No alcanzaste el puntaje mínimo. Inténtalo de nuevo.</p>
        )}
        <button onClick={resetGame}>Reintentar</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Emparejar</h1>
      <p>Puntaje: {score}</p>
      <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "600px", margin: "0 auto" }}>
        <div>
          <h2>Izquierda</h2>
          {pares.map((pair, index) => (
            <button
              key={index}
              onClick={() => handleLeftSelect(pair.elemento1)}
              disabled={matches.includes(pair.elemento1)}
              style={{ background: selectedLeft === pair.elemento1 ? "lightblue" : "white" }}
            >
              {pair.elemento1}
            </button>
          ))}
        </div>
        <div>
          <h2>Derecha</h2>
          {pares.map((pair, index) => (
            <button
              key={index}
              onClick={() => handleRightSelect(pair.elemento2)}
              disabled={matches.includes(pair.elemento1)}
              style={{ background: selectedRight === pair.elemento2 ? "lightblue" : "white" }}
            >
              {pair.elemento2}
            </button>
          ))}
        </div>
      </div>
      <button onClick={validateMatch} disabled={!selectedLeft || !selectedRight}>
        Validar Emparejamiento
      </button>
    </div>
  );
};

export default Emparejar;
