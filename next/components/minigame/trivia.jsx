import React, { useState } from "react";
import { FaRedoAlt, FaArrowRight, FaQuestionCircle } from "react-icons/fa";

const Trivia = ({ gameData, config }) => {
  // Estado para manejar las preguntas y el progreso del juego
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", correctAnswer: "" });

  // Asegurarse de que config está definido y tiene preguntas
  if (!config || !config.preguntas || config.preguntas.length === 0) {
    return (
      <div className="text-center text-gray-800 text-lg">
        No hay preguntas configuradas para este juego. Por favor, configura las preguntas.
      </div>
    );
  }

  // Extraer datos del juego desde la configuración
  const { preguntas, points_questions, points_min } = config;

  // Manejar la selección de una opción
  const handleOptionClick = (selectedOption) => {
    const currentQuestion = preguntas[currentQuestionIndex];
    if (selectedOption === currentQuestion.respuestaCorrecta) {
      setScore((prevScore) => prevScore + points_questions);
      setFeedback({ message: "¡Respuesta Correcta! :D", correctAnswer: `La respuesta correcta era: ${currentQuestion.respuestaCorrecta}` });
    } else {
      setFeedback({
        message: "Respuesta Incorrecta :c",
        correctAnswer: `La respuesta correcta era: ${currentQuestion.respuestaCorrecta}`,
      });
    }

    // Ir a la siguiente pregunta o finalizar el juego
    if (currentQuestionIndex < preguntas.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setFeedback({ message: "", correctAnswer: "" });
      }, 2000);
    } else {
      setTimeout(() => {
        setIsGameOver(true);
        setFeedback({ message: "", correctAnswer: "" });
      }, 2000);
    }
  };

  // Reiniciar el juego
  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsGameOver(false);
    setFeedback({ message: "", correctAnswer: "" });
  };

  // Continuar al siguiente nivel
  const continueGame = () => {
    console.log("Continuando al siguiente nivel...");
  };

  // Mostrar pantalla de finalización
  if (isGameOver) {
    return (
      <div className="flex justify-center items-center bg-gradient-to-br from-purple-100 to-blue-200 min-h-screen yagora">
        <div className="bg-white shadow-lg p-12 rounded-lg w-full max-w-4xl text-center">
          <h1 className="mb-4 font-bold text-4xl">Juego Finalizado</h1>
          <p className="mb-4 text-2xl">Puntaje Obtenido: <span className="font-semibold">{score} Estrellas</span></p>
          {score >= points_min ? (
            <>
              <img src="/img/personajes/starly/starly_globos.webp" alt="Felicidades" className="mx-auto mb-6 w-40 h-40" />
              <p className="mb-6 font-bold text-2xl text-green-600">¡Felicidades, aprobaste el juego!</p>
              <div className="flex justify-center space-x-8 mt-6">
                <button
                  onClick={resetGame}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg font-bold text-white transform transition-transform hover:scale-105"
                >
                  <FaRedoAlt className="mr-3" />
                  Reintentar
                </button>
                <button
                  onClick={continueGame}
                  className="flex items-center bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg font-bold text-white transform transition-transform hover:scale-105"
                >
                  <FaArrowRight className="mr-3" />
                  Continuar
                </button>
              </div>
            </>
          ) : (
            <>
              <img src="/img/personajes/starly/starly_llorando.webp" alt="Inténtalo de nuevo" className="mx-auto mb-6 w-40 h-40" />
              <p className="mb-6 font-bold text-2xl text-red-600">No alcanzaste el puntaje mínimo<br/> Inténtalo de nuevo</p>
              <button
                onClick={resetGame}
                className="flex items-center bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg font-bold text-white transform transition-transform hover:scale-105"
              >
                <FaRedoAlt className="mr-3" />
                Reintentar
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Mostrar pregunta actual
  const currentQuestion = preguntas[currentQuestionIndex];

  return (
    <div className="relative flex justify-center items-center bg-gradient-to-br from-purple-100 to-blue-200 min-h-screen yagora">
      <div className="bg-white shadow-lg p-12 rounded-lg w-full max-w-4xl">
        {/* Barra superior con el número de pregunta y el puntaje */}
        <div className="flex justify-between items-center mb-8">
          <p className="flex items-center font-semibold text-purple-700 text-xl">
            <FaQuestionCircle className="mr-2" />
            Pregunta {currentQuestionIndex + 1} de {preguntas.length}
          </p>
          <p className="font-semibold text-purple-700 text-xl">
            Puntaje: {score} Estrellas
          </p>
        </div>

        {/* Pregunta y opciones */}
        <h2 className="mb-8 font-semibold text-2xl text-center text-gray-800">{currentQuestion.texto}</h2>
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 mb-8">
          {currentQuestion.opciones.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="bg-purple-500 hover:bg-purple-600 px-6 py-4 rounded-lg font-bold text-white transform transition-transform hover:scale-105"
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {feedback.message && (
          <div className="bg-white shadow-md mt-4 p-6 rounded-lg text-center">
            <p
              className={`text-xl font-bold mb-2 ${
                feedback.message === "¡Respuesta Correcta! :D" ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback.message}
            </p>
            <p className="text-lg">{feedback.correctAnswer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trivia;
