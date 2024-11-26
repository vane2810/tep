import React, { useState, useEffect } from "react";

const QuickResponseGame = ({ gameData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(gameData.time_limit_per_question || 10);
  const [feedback, setFeedback] = useState("");

  const { preguntas, opciones, respuestasCorrectas, time_limit_per_question, points, points_questions, points_min } =
    gameData;

  useEffect(() => {
    if (!preguntas || !opciones) return; // Seguridad: verifica que los datos existan

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleTimeout();
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const handleAnswer = (optionIndex) => {
    if (!respuestasCorrectas || !preguntas[currentQuestionIndex]) return; // Seguridad

    const isCorrect = optionIndex === respuestasCorrectas[currentQuestionIndex];
    if (isCorrect) {
      setScore((prevScore) => prevScore + points_questions);
      setFeedback("¡Correcto!");
    } else {
      setFeedback("Incorrecto.");
    }

    setTimeout(() => {
      setFeedback("");
      if (currentQuestionIndex < preguntas.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setTimeLeft(time_limit_per_question);
      } else {
        setIsGameOver(true);
      }
    }, 1000);
  };

  const handleTimeout = () => {
    setFeedback("¡Tiempo agotado!");
    setTimeout(() => {
      setFeedback("");
      if (currentQuestionIndex < preguntas.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setTimeLeft(time_limit_per_question);
      } else {
        setIsGameOver(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsGameOver(false);
    setTimeLeft(time_limit_per_question);
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

  if (!preguntas || !opciones || !opciones[currentQuestionIndex]) {
    return <p>Datos no disponibles o incompletos.</p>; // Mensaje en caso de datos incompletos
  }

  return (
    <div>
      <h1>Respuestas Rápidas</h1>
      <p>Puntaje: {score}</p>
      <p>Tiempo restante: {timeLeft}s</p>
      <p>
        Pregunta {currentQuestionIndex + 1} de {preguntas.length}
      </p>
      <h2>{preguntas[currentQuestionIndex]}</h2>
      <div>
        {opciones[currentQuestionIndex].map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            style={{ display: "block", margin: "10px 0" }}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default QuickResponseGame;
