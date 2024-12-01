import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaRedoAlt, FaArrowRight } from "react-icons/fa";

const OrdenarElementos = ({ gameData, config }) => {
  // Verificar si el componente está recibiendo los datos correctamente
  console.log("gameData:", gameData);
  console.log("config:", config);

  // Estado para manejar los elementos y el progreso del juego
  const [elements, setElements] = useState(config.elements);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Mezclar los elementos al inicio del juego
  const shuffledElements = [...elements].sort(() => Math.random() - 0.5);
  const [shuffled, setShuffled] = useState(
    shuffledElements.map((el) => ({ value: el, isCorrect: null }))
  );

  // Manejar el ordenamiento de elementos
  const handleElementDrop = (draggedIndex, droppedIndex) => {
    const updatedElements = [...shuffled];
    const [draggedElement] = updatedElements.splice(draggedIndex, 1);
    updatedElements.splice(droppedIndex, 0, draggedElement);
    setShuffled(updatedElements);
  };

  // Verificar si los elementos están ordenados correctamente
  const handleCheckOrder = () => {
    let isCorrect = true;
    const updatedElements = shuffled.map((element, index) => {
      if (element.value === elements[index]) {
        return { ...element, isCorrect: true };
      } else {
        isCorrect = false;
        return { ...element, isCorrect: false };
      }
    });
    setShuffled(updatedElements);
    if (isCorrect) {
      setScore(config.points);
      setFeedback("¡Orden Correcto!");
      setIsGameOver(true);
    } else {
      setScore(0);
      setFeedback("Orden Incorrecto. Inténtalo de nuevo.");
      setIsGameOver(true);
    }
  };

  // Reiniciar el juego
  const resetGame = () => {
    setShuffled([...elements].sort(() => Math.random() - 0.5).map((el) => ({ value: el, isCorrect: null })));
    setIsGameOver(false);
    setScore(0);
    setFeedback("");
  };

  // Continuar al siguiente nivel
  const continueGame = () => {
    console.log("Continuando al siguiente nivel...");
  };

  // Mostrar pantalla de finalización
  if (isGameOver) {
    return (
      <div className="flex justify-center items-center bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("/img/games/fondo10.webp")' }}>
        <div className="bg-white shadow-lg p-12 rounded-lg w-full max-w-4xl text-center">
          <h1 className="mb-4 font-bold text-4xl">Juego Finalizado</h1>
          <p className="mb-4 text-2xl">
            Puntaje Obtenido: <span className="font-semibold">{score} Estrellas</span>
          </p>
          {score >= config.points_min ? (
            <>
              <img
                src="/img/personajes/starly/starly_globos.webp"
                alt="Felicidades"
                className="mx-auto mb-6 w-40 h-40"
              />
              <p className="mb-6 font-bold text-2xl text-green-600">¡Felicidades, aprobaste el juego!</p>
              <div className="flex justify-center space-x-8 mt-6">
                <button
                  onClick={resetGame}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-bold text-white transform transition-transform hover:scale-105"
                >
                  <FaRedoAlt className="mr-3" />
                  Reintentar
                </button>
                <button
                  onClick={continueGame}
                  className="flex items-center bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-bold text-white transform transition-transform hover:scale-105"
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
                className="mx-auto mb-6 w-40 h-40"
              />
              <p className="mb-6 font-bold text-2xl text-red-600">
                No alcanzaste el puntaje mínimo
                <br />
                Inténtalo de nuevo
              </p>
              <button
                onClick={resetGame}
                className="flex items-center bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-bold text-white transform transition-transform hover:scale-105"
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

  // Mostrar los elementos para ordenar
  return (
    <div className="relative flex justify-center items-center bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("/img/games/fondo10.webp")' }}>
      <div className="bg-white shadow-lg p-10 rounded-lg w-full max-w-3xl">

        {/* Instrucciones */}
        <h2 className="mb-8 font-semibold text-2xl text-center text-gray-800">{config.instructions}</h2>

        {/* Elementos para ordenar */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {shuffled.map((element, index) => (
            <div
              key={index}
              className={`w-32 h-32 p-4 rounded-lg font-bold text-white text-center transform transition-transform hover:scale-105 cursor-pointer flex items-center justify-center ${
                element.isCorrect === true ? "bg-teal-500" : element.isCorrect === false ? "bg-rose-400" : "bg-blue-400 hover:bg-blue-500"
              }`}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("dragIndex", index)}
              onDrop={(e) => handleElementDrop(e.dataTransfer.getData("dragIndex"), index)}
              onDragOver={(e) => e.preventDefault()}
            >
              {element.value}
            </div>
          ))}
        </div>

        {/* Botón para verificar el orden */}
        <div className="flex justify-center">
          <button
            onClick={handleCheckOrder}
            className="flex items-center bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold text-white transform transition-transform hover:scale-105"
          >
            Verificar Orden
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="bg-white shadow-md mt-6 p-4 rounded-lg text-center">
            <p
              className={`text-lg font-bold ${
                feedback === "¡Orden Correcto!" ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Definición de PropTypes para validar los tipos de propiedades que el componente OrdenarElementos espera recibir
OrdenarElementos.propTypes = {
  gameData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  config: PropTypes.shape({
    elements: PropTypes.arrayOf(PropTypes.string).isRequired,
    points: PropTypes.number.isRequired,
    points_min: PropTypes.number.isRequired,
    instructions: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrdenarElementos;
