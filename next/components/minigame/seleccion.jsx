import React, { useState } from "react";

const Seleccion = ({ gameData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState("");

  const { preguntas, opciones, respuestasCorrectas, points, points_questions, points_min } = gameData;

  // Manejar selección de respuestas
  const handleSelect = (optionIndex) => {
    setSelectedAnswers((prev) =>
      prev.includes(optionIndex) ? prev.filter((i) => i !== optionIndex) : [...prev, optionIndex]
    );
  };

  // Validar la respuesta de la pregunta actual
  const validateAnswer = () => {
    const correctAnswers = respuestasCorrectas[currentQuestionIndex];
    const isCorrect =
      selectedAnswers.length === correctAnswers.length &&
      selectedAnswers.every((answer) => correctAnswers.includes(answer));

    if (isCorrect) {
      setScore((prevScore) => prevScore + points_questions);
      setFeedback("¡Correcto!");
    } else {
      setFeedback("Incorrecto.");
    }

    // Pasar a la siguiente pregunta o finalizar el juego
    if (currentQuestionIndex < preguntas.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswers([]);
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
    setSelectedAnswers([]);
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
      <h1>Selección Múltiple</h1>
      <p>Puntaje: {score}</p>
      <p>
        Pregunta {currentQuestionIndex + 1} de {preguntas.length}
      </p>
      <h2>{preguntas[currentQuestionIndex]}</h2>
      <div>
        {opciones[currentQuestionIndex].map((option, index) => (
          <label key={index} style={{ display: "block", margin: "10px 0" }}>
            <input
              type="checkbox"
              checked={selectedAnswers.includes(index)}
              onChange={() => handleSelect(index)}
            />
            {option}
          </label>
        ))}
      </div>
      <button onClick={validateAnswer} disabled={selectedAnswers.length === 0}>
        Validar Respuesta
      </button>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default Seleccion;
