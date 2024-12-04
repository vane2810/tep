import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaRedoAlt, FaArrowRight, FaQuestionCircle } from "react-icons/fa";
import EmptyContentMessage from "../menssages/mensajeVacio";

const ElegirRespuestaImagen = ({ gameData, config }) => {
  // Estado para manejar las preguntas y el progreso del juego
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState({ message: "" });

  // Asegurarse de que config está definido y tiene preguntas
  if (!config || !config.preguntas || config.preguntas.length === 0) {
    return (
      <div className="text-center text-gray-800 text-lg">
        <EmptyContentMessage />
      </div>
    );
  }

  // Extraer datos del juego desde la configuración
  const { preguntas, points_questions, points_min } = config;

  // Manejar la selección de una opción de imagen
  const handleOptionClick = (selectedOptionIndex) => {
    const currentQuestion = preguntas[currentQuestionIndex];
    if (currentQuestion.opciones[selectedOptionIndex].correcta) {
      setScore((prevScore) => prevScore + points_questions);
      setFeedback({
        message: "¡Respuesta Correcta!",
      });
    } else {
      setFeedback({
        message: "Respuesta Incorrecta",
      });
    }

    // Ir a la siguiente pregunta o finalizar el juego
    setTimeout(() => {
      if (currentQuestionIndex < preguntas.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsGameOver(true);
      }
      setFeedback({ message: "" });
    }, 3000);
  };

  // Reiniciar el juego
  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsGameOver(false);
    setFeedback({ message: "" });
  };

  // Continuar al siguiente nivel
  const continueGame = () => {
    console.log("Continuando al siguiente nivel...");
  };

  // Mostrar pantalla de finalización
  if (isGameOver) {
    return (
      <div className="flex justify-center items-center bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("/img/games/fondo14.jpg")' }}>
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
                src="/img/personajes/starly/starly_triste.webp"
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
  const currentQuestion = preguntas[currentQuestionIndex];

  return (
    <div className="relative flex justify-center items-center bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("/img/games/fondo14.jpg")' }}>
      <div className="bg-white shadow-lg p-12 rounded-lg w-full max-w-4xl">
        {/* Barra superior con el número de pregunta y el puntaje */}
        <div className="flex justify-between items-center mb-8">
          <p className="flex items-center font-semibold text-red-700 text-xl">
            <FaQuestionCircle className="mr-2" />
            Pregunta {currentQuestionIndex + 1} de {preguntas.length}
          </p>
          <p className="font-semibold text-red-700 text-xl">Puntaje: {score} Estrellas</p>
        </div>

        {/* Pregunta y opciones de imagen */}
        <h2 className="mb-8 font-semibold text-2xl text-center text-gray-800">{currentQuestion.texto}</h2>
        <div className="gap-4 grid grid-cols-2 mb-8">
          {currentQuestion.opciones.map((opcion, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className="p-4 rounded-lg transform transition-transform hover:scale-105"
            >
              <img src={opcion.url} alt={`Opción ${index + 1}`} className="rounded-lg w-full h-40 object-cover" />
            </button>
          ))}
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
          </div>
        )}
      </div>
    </div>
  );
};

ElegirRespuestaImagen.propTypes = {
  gameData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  config: PropTypes.shape({
    preguntas: PropTypes.arrayOf(
      PropTypes.shape({
        texto: PropTypes.string.isRequired,
        opciones: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired,
            correcta: PropTypes.bool.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
    points_questions: PropTypes.number.isRequired,
    points_min: PropTypes.number.isRequired,
  }).isRequired,
};

export default ElegirRespuestaImagen;
