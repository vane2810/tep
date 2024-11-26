import React, { useState } from "react";

const Arrastrar = ({ gameData }) => {
  const [draggedElement, setDraggedElement] = useState(null);
  const [droppedPositions, setDroppedPositions] = useState({});
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const { elementos, posiciones, points, points_min } = gameData;

  // Inicia el arrastre de un elemento
  const handleDragStart = (element) => {
    setDraggedElement(element);
  };

  // Maneja el evento de soltar en una posición
  const handleDrop = (position) => {
    if (draggedElement) {
      setDroppedPositions((prev) => ({
        ...prev,
        [position]: draggedElement,
      }));
      setDraggedElement(null);
    }
  };

  // Validar los elementos colocados
  const validateGame = () => {
    let correctCount = 0;

    posiciones.forEach((position, index) => {
      if (droppedPositions[position] === elementos[index]) {
        correctCount++;
      }
    });

    const calculatedScore = (correctCount / posiciones.length) * points;
    setScore(calculatedScore);
    setIsGameOver(true);
  };

  // Reiniciar el juego
  const resetGame = () => {
    setDraggedElement(null);
    setDroppedPositions({});
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
      <h1>Arrastrar y Soltar</h1>
      <p>Puntaje: {score}</p>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        {/* Elementos para arrastrar */}
        <div>
          <h2>Elementos</h2>
          {elementos.map((element, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(element)}
              style={{
                padding: "10px",
                margin: "10px",
                border: "1px solid black",
                cursor: "grab",
              }}
            >
              {element}
            </div>
          ))}
        </div>

        {/* Posiciones para soltar */}
        <div>
          <h2>Posiciones</h2>
          {posiciones.map((position, index) => (
            <div
              key={index}
              onDragOver={(e) => e.preventDefault()} // Permite soltar
              onDrop={() => handleDrop(position)}
              style={{
                padding: "10px",
                margin: "10px",
                border: "1px solid black",
                minHeight: "50px",
                backgroundColor: droppedPositions[position] ? "lightgreen" : "white",
              }}
            >
              {droppedPositions[position] || position}
            </div>
          ))}
        </div>
      </div>
      <button onClick={validateGame} style={{ marginTop: "20px" }}>
        Validar
      </button>
    </div>
  );
};

export default Arrastrar;