import React, { useState, useEffect } from "react";

const Trivia = ({ gameData }) => {
  // Estado para manejar las preguntas y el progreso del juego
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Extraer datos del juego
  const { preguntas, points, points_questions, points_min } = gameData;

  // Manejar la selección de una opción
  const handleOptionClick = (selectedOption) => {
    const currentQuestion = preguntas[currentQuestionIndex];
    if (selectedOption === currentQuestion.respuestaCorrecta) {
      setScore((prevScore) => prevScore + points_questions);
      setFeedback("¡Correcto!");
    } else {
      setFeedback("Incorrecto.");
    }

    // Ir a la siguiente pregunta o finalizar el juego
    if (currentQuestionIndex < preguntas.length - 1) {
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

  // Mostrar pantalla de finalización
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

  // Mostrar pregunta actual
  const currentQuestion = preguntas[currentQuestionIndex];

  return (
    <div>
      <h1>Trivia</h1>
      <p>Puntaje: {score}</p>
      <p>
        Pregunta {currentQuestionIndex + 1} de {preguntas.length}
      </p>
      <h2>{currentQuestion.texto}</h2>
      {currentQuestion.opciones.map((option, index) => (
        <button key={index} onClick={() => handleOptionClick(option)}>
          {option}
        </button>
      ))}
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default Trivia;