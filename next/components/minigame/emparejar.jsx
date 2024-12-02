import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaRedoAlt, FaArrowRight } from "react-icons/fa";

const Emparejar = ({ gameData, config }) => {
  // Estados para manejar el juego
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Extraer datos de configuración del juego
  const { pares, points_per_pair, points_min } = config;

  // Manejar la selección de un elemento en la columna izquierda
  const handleLeftSelect = (element) => {
    setSelectedLeft(element);
    setFeedback(""); // Limpiar el feedback anterior al seleccionar un nuevo elemento
  };

  // Manejar la selección de un elemento en la columna derecha y validar el emparejamiento
  const handleRightSelect = (element) => {
    if (!selectedLeft) return;

    const isCorrect = pares.some(
      (pair) => pair.elemento1 === selectedLeft && pair.elemento2 === element
    );

    if (isCorrect) {
      setMatches((prev) => [...prev, selectedLeft]);
      setScore((prevScore) => prevScore + points_per_pair);
      setFeedback("¡Emparejamiento Correcto! :D");
    } else {
      setFeedback("Emparejamiento Incorrecto :c");
    }

    setSelectedLeft(null);

    // Limpiar el feedback después de 2 segundos
    setTimeout(() => {
      setFeedback("");
    }, 2000);

    // Verificar si el juego ha terminado
    if (matches.length + 1 === pares.length) {
      setTimeout(() => {
        setIsGameOver(true);
      }, 2000);
    }
  };

  // Reiniciar el juego
  const resetGame = () => {
    setMatches([]);
    setScore(0);
    setSelectedLeft(null);
    setIsGameOver(false);
    setFeedback("");
  };

  // Mostrar pantalla de finalización
  if (isGameOver) {
    return (
      <div className="flex justify-center items-center bg-cover bg-center min-h-screen yagora" style={{ backgroundImage: 'url("/img/games/fondo6.webp")' }}>
        <div className="bg-white shadow-lg p-12 rounded-lg w-full max-w-4xl text-center">
          <h1 className="mb-4 font-bold text-4xl">Juego Finalizado</h1>
          <p className="mb-4 text-2xl">
            Puntaje Obtenido: <span className="font-semibold">{score} Estrellas</span>
          </p>
          {score >= points_min ? (
            <>
              <img src="/img/personajes/starly/starly_fuego.webp" alt="Felicidades" className="mx-auto mb-6 w-40 h-40" />
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
                  onClick={() => console.log("Continuando al siguiente nivel...")}
                  className="flex items-center bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg font-bold text-white transform transition-transform hover:scale-105"
                >
                  <FaArrowRight className="mr-3" />
                  Continuar
                </button>
              </div>
            </>
          ) : (
            <>
              <img src="/img/personajes/starly/starly_triste.webp" alt="Inténtalo de nuevo" className="mx-auto mb-6 w-40 h-40" />
              <p className="mb-6 font-bold text-2xl text-red-600">No alcanzaste el puntaje mínimo.<br />Inténtalo de nuevo.</p>
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

  // Renderizar juego mientras no haya terminado
  return (
    <div className="relative flex justify-center items-center bg-cover bg-center min-h-screen yagora" style={{ backgroundImage: 'url("/img/games/fondo6.webp")' }}>
      <div className="bg-white shadow-lg p-12 rounded-lg w-full max-w-4xl">
        <p className="mb-4 text-3xl text-center text-green-700 wonder">Puntaje: {score} Estrellas</p>

        <div className="flex justify-between gap-16 mb-8">
          {/* Columna Izquierda */}
          <div>
            <h2 className="mb-4 font-semibold text-center text-green-700 text-xl">Izquierda</h2>
            {pares.map((pair, index) => (
              <button
                key={index}
                onClick={() => handleLeftSelect(pair.elemento1)}
                disabled={matches.includes(pair.elemento1)}
                className={`w-full mb-4 p-4 rounded-lg ${
                  matches.includes(pair.elemento1)
                    ? "bg-yellow-300 border-yellow-400"
                    : selectedLeft === pair.elemento1
                    ? "bg-green-100"
                    : "bg-white"
                } border border-gray-300 hover:bg-green-100`}
              >
                {pair.elemento1}
              </button>
            ))}
          </div>

          {/* Columna Derecha */}
          <div>
            <h2 className="mb-4 font-semibold text-blue-700 text-center text-xl">Derecha</h2>
            {pares.map((pair, index) => (
              <button
                key={index}
                onClick={() => handleRightSelect(pair.elemento2)}
                disabled={matches.includes(pair.elemento1)}
                className={`w-full mb-4 p-4 rounded-lg ${
                  matches.includes(pair.elemento1)
                    ? "bg-yellow-300 border-yellow-500"
                    : "bg-white"
                } border border-gray-300 hover:bg-blue-100`}
              >
                {pair.elemento2}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`text-xl font-bold text-center mb-4 ${feedback.includes("Correcto") ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};

// Definición de PropTypes para validar los tipos de propiedades que el componente Emparejar espera recibir
Emparejar.propTypes = {
  gameData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  config: PropTypes.shape({
    pares: PropTypes.arrayOf(
      PropTypes.shape({
        elemento1: PropTypes.string.isRequired,
        elemento2: PropTypes.string.isRequired,
      })
    ).isRequired,
    points_per_pair: PropTypes.number.isRequired,
    points_min: PropTypes.number.isRequired,
  }).isRequired,
};

export default Emparejar;
