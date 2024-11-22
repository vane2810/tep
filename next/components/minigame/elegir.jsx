import React, { useState } from "react";

const ImageSelectionGame = ({ gameData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState("");

  const { pistas, imagenes, respuestasCorrectas, points, points_questions, points_min } = gameData;

  // Manejar la selección del jugador
  const handleSelect = (imageIndex) => {
    const isCorrect = imageIndex === respuestasCorrectas[currentQuestionIndex];
    if (isCorrect) {
      setScore((prevScore) => prevScore + points_questions);
      setFeedback("¡Correcto!");
    } else {
      setFeedback("Incorrecto.");
    }

    // Pasar a la siguiente pregunta o finalizar el juego
    setTimeout(() => {
      setFeedback("");
      if (currentQuestionIndex < pistas.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsGameOver(true);
      }
    }, 1000);
  };

  // Reiniciar el juego
  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsGameOver(false);
    setFeedback("");
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
      <h1>Elige la Imagen Correcta</h1>
      <p>Puntaje: {score}</p>
      <p>
        Pregunta {currentQuestionIndex + 1} de {pistas.length}
      </p>
      <h2>{pistas[currentQuestionIndex]}</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        {imagenes[currentQuestionIndex].map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Opción ${index + 1}`}
            onClick={() => handleSelect(index)}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              border: "2px solid black",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default ImageSelectionGame;
