import React, { useState } from "react";

const Completar = ({ gameData }) => {
  const [userAnswers, setUserAnswers] = useState(Array(gameData.frases.length).fill(""));
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const { frases, respuestas, points, points_questions, points_min } = gameData;

  // Manejar cambios en los campos de entrada
  const handleChange = (index, value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = value;
    setUserAnswers(updatedAnswers);
  };

  // Validar respuestas del usuario
  const validateAnswers = () => {
    let correctCount = 0;

    respuestas.forEach((correctAnswer, index) => {
      if (userAnswers[index]?.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
        correctCount++;
      }
    });

    const calculatedScore = correctCount * points_questions;
    setScore(calculatedScore);
    setIsGameOver(true);
  };

  // Reiniciar el juego
  const resetGame = () => {
    setUserAnswers(Array(gameData.frases.length).fill(""));
    setScore(0);
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
      <h1>Completar Espacios en Blanco</h1>
      <p>Puntaje: {score}</p>
      <form>
        {frases.map((frase, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <label>
              {frase.replace("___", "________")}
              <br />
              <input
                type="text"
                value={userAnswers[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                style={{ marginTop: "10px", padding: "5px", width: "100%" }}
              />
            </label>
          </div>
        ))}
      </form>
      <button onClick={validateAnswers} style={{ marginTop: "20px" }}>
        Validar Respuestas
      </button>
    </div>
  );
};

export default Completar;
