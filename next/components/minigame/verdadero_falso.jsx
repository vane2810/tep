import React, { useState } from "react";

const TrueFalse = ({ gameData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState("");

  const { afirmaciones, respuestasCorrectas, points, points_questions, points_min } = gameData;

  // Manejar la selección del jugador
  const handleAnswer = (answer) => {
    const isCorrect = answer === respuestasCorrectas[currentQuestionIndex];
    if (isCorrect) {
      setScore((prevScore) => prevScore + points_questions);
      setFeedback("¡Correcto!");
    } else {
      setFeedback("Incorrecto.");
    }

    // Pasar a la siguiente pregunta o finalizar el juego
    if (currentQuestionIndex < afirmaciones.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setFeedback("");
      }, 1000);
    } else {
      setTimeout(() => {
        setIsGameOver(true);
        setFeedback("");
      }, 1000);
    }
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
      <h1>Verdadero o Falso</h1>
      <p>Puntaje: {score}</p>
      <p>
        Pregunta {currentQuestionIndex + 1} de {afirmaciones.length}
      </p>
      <h2>{afirmaciones[currentQuestionIndex]}</h2>
      <button onClick={() => handleAnswer(true)}>Verdadero</button>
      <button onClick={() => handleAnswer(false)}>Falso</button>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default TrueFalse;
