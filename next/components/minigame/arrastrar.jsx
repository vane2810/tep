import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaRedoAlt, FaArrowRight } from "react-icons/fa";
import EmptyContentMessage from "../menssages/mensajeVacio";

const ArrastrarSoltar = ({ gameData, config }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", correctAnswer: "" });
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Asegurarse de que config está definido y tiene preguntas
  if (!config || !config.questions || config.questions.length === 0) {
    return (
      <div className="text-center text-gray-800 text-lg">
        <EmptyContentMessage />
      </div>
    );
  }

  // Extraer datos del juego desde la configuración
  const { questions, points_questions, points_min } = config;

  // Manejar la selección de una opción
  const handleDrop = (correctOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === correctOption) {
      setScore((prevScore) => prevScore + points_questions);
      setFeedback({
        message: "¡Respuesta Correcta!",
        correctAnswer: `La respuesta correcta era: ${correctOption}`,
      });
    } else {
      setFeedback({
        message: "Respuesta Incorrecta",
        correctAnswer: `La respuesta correcta era: ${correctOption}`,
      });
    }

    // Ir a la siguiente pregunta o finalizar el juego
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsGameOver(true);
      }
      setFeedback({ message: "", correctAnswer: "" });
      setSelectedAnswer(null);
    }, 3000);
  };

  // Reiniciar el juego
  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsGameOver(false);
    setFeedback({ message: "", correctAnswer: "" });
    setSelectedAnswer(null);
  };

  // Continuar al siguiente nivel
  const continueGame = () => {
    console.log("Continuando al siguiente nivel...");
  };

  // Mostrar pantalla de finalización
  if (isGameOver) {
    return (
      <div className="flex justify-center items-center bg-cover bg-center min-h-screen yagora" style={{ backgroundImage: 'url("/img/games/fondo2.webp")' }}>
        <div className="bg-white shadow-lg p-12 rounded-lg w-full max-w-4xl text-center">
          <h1 className="mb-4 font-bold text-4xl">Juego Finalizado</h1>
          <p className="mb-4 text-2xl">
            Puntaje Obtenido: <span className="font-semibold">{score} Estrellas</span>
          </p>
          {score >= points_min ? (
            <>
              <img
                src="/img/personajes/starly/starly_fuego.webp"
                alt="Felicidades"
                className="mx-auto mb-6 w-36 h-36"
              />
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
              <img
                src="/img/personajes/starly/starly_llorando.webp"
                alt="Inténtalo de nuevo"
                className="mx-auto mb-6 w-36 h-36"
              />
              <p className="mb-6 font-bold text-2xl text-red-600">
                No alcanzaste el puntaje mínimo
                <br />
                Inténtalo de nuevo
              </p>
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
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="relative flex justify-center items-center bg-cover bg-center min-h-screen yagora" style={{ backgroundImage: 'url("/img/games/fondo2.webp")' }}>
      <div className="bg-white shadow-lg p-12 rounded-lg w-full max-w-4xl">
        {/* Barra superior con el número de pregunta y el puntaje */}
        <div className="flex justify-between items-center mb-8">
          <p className="flex items-center font-semibold text-blue-700 text-xl">
            Pregunta {currentQuestionIndex + 1} de {questions.length}
          </p>
          <p className="font-semibold text-blue-700 text-xl">Puntaje: {score} Estrellas</p>
        </div>

        {/* Pregunta y área para arrastrar y soltar */}
        <h2 className="mb-8 font-semibold text-2xl text-center text-gray-800">{currentQuestion.texto}</h2>
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 mb-8">
          {currentQuestion.opciones.map((option, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => setSelectedAnswer(option)}
              className="bg-blue-400 hover:bg-blue-500 px-6 py-4 rounded-lg font-bold text-center text-white cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>

        {/* Área de soltar */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(currentQuestion.respuestaCorrecta)}
          className="border-4 p-8 border-blue-500 border-dashed rounded-lg font-bold text-blue-700 text-center text-xl"
        >
          Suelta aquí la respuesta correcta
        </div>

        {/* Feedback */}
        {feedback.message && (
          <div className="bg-white shadow-md mt-4 p-6 rounded-lg text-center">
            <p
              className={`text-xl font-bold mb-2 ${
                feedback.message === "¡Respuesta Correcta!" ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback.message}
            </p>
            <p className="font-bold text-xl">{feedback.correctAnswer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

ArrastrarSoltar.propTypes = {
  gameData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  config: PropTypes.shape({
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        texto: PropTypes.string.isRequired,
        opciones: PropTypes.arrayOf(PropTypes.string).isRequired,
        respuestaCorrecta: PropTypes.string.isRequired,
      })
    ).isRequired,
    points_questions: PropTypes.number.isRequired,
    points_min: PropTypes.number.isRequired,
  }).isRequired,
};

export default ArrastrarSoltar;