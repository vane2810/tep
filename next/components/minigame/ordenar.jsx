import React, { useState } from "react";

const Ordenar = ({ gameData }) => {
  const [currentOrder, setCurrentOrder] = useState(gameData.elementos); // Orden actual de los elementos
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const { ordenCorrecto, points, points_min } = gameData;

  // Mover un elemento hacia arriba
  const moveUp = (index) => {
    if (index === 0) return; // No se puede mover el primero hacia arriba
    const newOrder = [...currentOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setCurrentOrder(newOrder);
  };

  // Mover un elemento hacia abajo
  const moveDown = (index) => {
    if (index === currentOrder.length - 1) return; // No se puede mover el último hacia abajo
    const newOrder = [...currentOrder];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setCurrentOrder(newOrder);
  };

  // Validar el orden
  const validateOrder = () => {
    const correctCount = currentOrder.filter((item, index) => item === ordenCorrecto[index]).length;
    const calculatedScore = (correctCount / ordenCorrecto.length) * points;

    setScore(calculatedScore);
    setIsGameOver(true);
  };

  // Reiniciar el juego
  const resetGame = () => {
    setCurrentOrder(gameData.elementos);
    setScore(0);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div>
        <h1>Juego Finalizado</h1>
        <p>Puntaje obtenido: {score.toFixed(2)}</p>
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
      <h1>Ordenar</h1>
      <p>Puntaje: {score}</p>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {currentOrder.map((item, index) => (
          <li key={index} style={{ margin: "10px 0" }}>
            {item}
            <button onClick={() => moveUp(index)} disabled={index === 0}>
              ↑
            </button>
            <button onClick={() => moveDown(index)} disabled={index === currentOrder.length - 1}>
              ↓
            </button>
          </li>
        ))}
      </ul>
      <button onClick={validateOrder} style={{ marginTop: "20px" }}>
        Validar Orden
      </button>
    </div>
  );
};

export default Ordenar;
