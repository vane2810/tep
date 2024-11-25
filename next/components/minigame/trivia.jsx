import React, { useState, useEffect } from "react";

const Trivia = ({ gameData, config }) => {
  // Estado para manejar las preguntas y el progreso del juego
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Asegurarse de que config está definido y tiene preguntas
  if (!config || !config.preguntas || config.preguntas.length === 0) {
    return (
      <div className="text-center text-gray-800 text-lg">
        No hay preguntas configuradas para este juego. Por favor, configura las preguntas.
      </div>
    );
  }

  // Extraer datos del juego desde la configuración
  const { preguntas, points, points_questions, points_min } = config;

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
      <div className="text-center">
        <h1>Juego Finalizado</h1>
        <p>Puntaje obtenido: {score}</p>
        {score >= points_min ? (
          <p>¡Felicidades, aprobaste el juego!</p>
        ) : (
          <p>No alcanzaste el puntaje mínimo. Inténtalo de nuevo.</p>
        )}
        <button onClick={resetGame} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white">
          Reintentar
        </button>
      </div>
    );
  }

  // Mostrar pregunta actual
  const currentQuestion = preguntas[currentQuestionIndex];

  return (
    <div className="text-center">
      <h1 className="mb-4 font-bold text-2xl">Trivia</h1>
      <p className="mb-2 text-lg">Puntaje: {score}</p>
      <p className="mb-2 text-lg">
        Pregunta {currentQuestionIndex + 1} de {preguntas.length}
      </p>
      <h2 className="mb-4 font-semibold text-xl">{currentQuestion.texto}</h2>
      <div className="mb-4">
        {currentQuestion.opciones.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className="bg-purple-500 hover:bg-purple-600 m-2 px-4 py-2 rounded text-white"
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && <p className={`text-lg ${feedback === "¡Correcto!" ? "text-green-600" : "text-red-600"}`}>{feedback}</p>}
    </div>
  );
};

export default Trivia;
