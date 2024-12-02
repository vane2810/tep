import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaRedoAlt, FaArrowRight, FaQuestionCircle } from "react-icons/fa";
import EmptyContentMessage from "../menssages/mensajeVacio";

const Arrastrar = ({ gameData, config }) => {
  const [draggedElement, setDraggedElement] = useState(null);
  const [droppedPositions, setDroppedPositions] = useState({});
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ message: "", correctAnswer: "" });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Asegurarse de que config está definido y tiene preguntas
  if (!config || !config.preguntas || config.preguntas.length === 0) {
    return (
      <div className="text-center text-gray-800 text-lg">
        <EmptyContentMessage/>
      </div>
    );
  }

  // Extraer datos del juego desde la configuración
  const { preguntas, points_questions, points_min } = config;

  // Crear los elementos para arrastrar y las posiciones para soltar
  const elementos = preguntas.flatMap((question) => question.opciones || []);
  const posiciones = preguntas.map((question) => question.texto || "");

  // Maneja el evento de arrastre
  const handleDragStart = (element) => {
    setDraggedElement(element);
  };

  // Maneja el evento de soltar
  const handleDrop = (position) => {
    if (draggedElement) {
      setDroppedPositions((prev) => ({
        ...prev,
        [position]: draggedElement,
      }));
      setDraggedElement(null);
    }
  };

  // Validar el juego al finalizar
  const validateGame = () => {
    let correctCount = 0;

    preguntas.forEach((question, index) => {
      if (droppedPositions[question.texto] === question.respuestaCorrecta) {
        correctCount++;
      }
    });

    const calculatedScore = (correctCount / preguntas.length) * points_questions;
    setScore(calculatedScore);
    setFeedback({
      message: correctCount === preguntas.length ? "¡Felicidades, has completado el juego!" : "Respuesta Incorrecta",
      correctAnswer: `La respuesta correcta es: ${correctCount === preguntas.length ? "Todas correctas" : "Revisa tus respuestas"}`,
    });
    setIsGameOver(true);
  };

  // Reiniciar el juego
  const resetGame = () => {
    setDraggedElement(null);
    setDroppedPositions({});
    setScore(0);
    setIsGameOver(false);
    setFeedback({ message: "", correctAnswer: "" });
    setCurrentQuestionIndex(0);
  };

  // Continuar al siguiente nivel (aquí solo reinicia el juego)
  const continueGame = () => {
    setIsGameOver(false);
    setCurrentQuestionIndex(0);
  };

  if (isGameOver) {
    return (
      <div className="flex justify-center items-center bg-cover bg-center min-h-screen yagora" style={{ backgroundImage: 'url("/img/games/fondo12.webp")' }}>
        <div className="bg-white shadow-lg p-12 rounded-lg w-full max-w-4xl text-center">
          <h1 className="mb-4 font-bold text-4xl">Juego Finalizado</h1>
          <p className="mb-4 text-2xl">Puntaje: {score.toFixed(2)} Estrellas</p>
          {score >= points_min ? (
            <div>
              <img src="/img/personajes/starly/starly_globos.webp" alt="Felicidades" className="mx-auto mb-6 w-40 h-40" />
              <p className="mb-6 font-bold text-2xl text-green-600">¡Felicidades, aprobaste el juego!</p>
              <div className="flex justify-center space-x-8 mt-6">
                <button onClick={resetGame} className="flex items-center bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg font-bold text-white transform transition-transform hover:scale-105">
                  <FaRedoAlt className="mr-3" />
                  Reintentar
                </button>
                <button onClick={continueGame} className="flex items-center bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg font-bold text-white transform transition-transform hover:scale-105">
                  <FaArrowRight className="mr-3" />
                  Continuar
                </button>
              </div>
            </div>
          ) : (
            <div>
              <img src="/img/personajes/starly/starly_llorando.webp" alt="Inténtalo de nuevo" className="mx-auto mb-6 w-40 h-40" />
              <p className="mb-6 font-bold text-2xl text-red-600">No alcanzaste el puntaje mínimo. Inténtalo de nuevo.</p>
              <button onClick={resetGame} className="flex items-center bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg font-bold text-white transform transition-transform hover:scale-105">
                <FaRedoAlt className="mr-3" />
                Reintentar
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center bg-cover bg-center min-h-screen yagora" style={{ backgroundImage: 'url("/img/games/fondo12.webp")' }}>
      <div className="bg-white shadow-lg p-12 rounded-lg w-full max-w-4xl">
        {/* Barra superior */}
        <div className="flex justify-between items-center mb-8">
          <p className="flex items-center font-semibold text-purple-700 text-xl">
            <FaQuestionCircle className="mr-2" />
            Pregunta {currentQuestionIndex + 1} de {preguntas.length}
          </p>
          <p className="font-semibold text-purple-700 text-xl">Puntaje: {score} Estrellas</p>
        </div>

        {/* Elementos para arrastrar */}
        <h2 className="mb-8 font-semibold text-2xl text-center text-gray-800">{preguntas[currentQuestionIndex]?.texto}</h2>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          {/* Elementos arrastrables */}
          <div>
            {elementos.map((element, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(element)}
                style={{
                  padding: "10px",
                  margin: "10px",
                  border: "1px solid black",
                  cursor: "grab",
                }}
              >
                {element}
              </div>
            ))}
          </div>

          {/* Posiciones para soltar */}
          <div>
            {posiciones.map((position, index) => (
              <div
                key={index}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(position)}
                style={{
                  padding: "10px",
                  margin: "10px",
                  border: "1px solid black",
                  minHeight: "50px",
                  backgroundColor: droppedPositions[position] ? "lightgreen" : "white",
                }}
              >
                {droppedPositions[position] || position}
              </div>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {feedback.message && (
          <div className="bg-white shadow-md mt-4 p-6 rounded-lg text-center">
            <p
              className={`text-xl font-bold mb-2 ${
                feedback.message === "¡Felicidades, has completado el juego!" ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback.message}
            </p>
            <p className="text-lg">{feedback.correctAnswer}</p>
          </div>
        )}

        {/* Validar juego */}
        <button onClick={validateGame} style={{ marginTop: "20px" }}>
          Validar
        </button>
      </div>
    </div>
  );
};

Arrastrar.propTypes = {
  gameData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  config: PropTypes.shape({
    preguntas: PropTypes.arrayOf(
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

export default Arrastrar;
