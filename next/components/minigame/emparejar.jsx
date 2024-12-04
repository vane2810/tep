import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaRedoAlt, FaArrowRight } from "react-icons/fa";

const Emparejar = ({ gameData, config }) => {
  // Estados para manejar el juego
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState([]);
  const [incorrectMatches, setIncorrectMatches] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  // Extraer datos de configuración del juego
  const { pares, description, points } = config;
  const pointsPerPair = Math.floor(points / pares.length); // Puntos por par correcto

  // Manejar la selección de un elemento en la columna izquierda
  const handleLeftSelect = (element) => {
    setSelectedLeft(element);
  };

  // Manejar la selección de un elemento en la columna derecha y validar el emparejamiento
  const handleRightSelect = (element) => {
    if (!selectedLeft) return;

    const isCorrect = pares.some(
      (pair) => pair.elemento1 === selectedLeft && pair.elemento2 === element
    );

    if (isCorrect) {
      setMatches((prev) => [...prev, { left: selectedLeft, right: element }]);
    } else {
      setIncorrectMatches((prev) => [...prev, { left: selectedLeft, right: element }]);
    }

    setSelectedLeft(null);

    // Verificar si el juego ha terminado (si todos los pares han sido emparejados)
    if (matches.length + incorrectMatches.length + 1 === pares.length) {
      setTimeout(() => {
        setIsGameOver(true);
      }, 1000);
    }
  };

  // Reiniciar el juego
  const resetGame = () => {
    setMatches([]);
    setIncorrectMatches([]);
    setSelectedLeft(null);
    setIsGameOver(false);
  };

  // Mostrar pantalla de finalización
  if (isGameOver) {
    const allCorrect = incorrectMatches.length === 0;
    const totalScore = matches.length * pointsPerPair;

    return (
      <div className="flex justify-center items-center bg-cover bg-center min-h-screen yagora" style={{ backgroundImage: 'url("/img/games/fondo6.webp")' }}>
        <div className="bg-white shadow-lg p-12 rounded-lg w-full max-w-4xl text-center">
          <h1 className="mb-4 font-bold text-4xl">Juego Finalizado</h1>
          {allCorrect ? (
            <>
              <img src="/img/personajes/starly/starly_fuego.webp" alt="Felicidades" className="mx-auto mb-6 w-40 h-40" />
              <p className="mb-6 font-bold text-2xl">
                Puntaje Obtenido: <span className="text-green-600">{totalScore} Estrellas</span>
              </p>
              <p className="mb-6 font-bold text-2xl text-green-600">
                ¡Felicidades, todos los emparejamientos son correctos!
              </p>
            </>
          ) : (
            <>
              <img src="/img/personajes/starly/starly_triste.webp" alt="Inténtalo de nuevo" className="mx-auto mb-6 w-40 h-40" />
              <p className="mb-6 font-bold text-2xl">
                Puntaje Obtenido: <span className="text-red-600">{totalScore} Estrellas</span>
              </p>
              <p className="mb-6 font-bold text-2xl text-red-600">
                No todos los emparejamientos fueron correctos <br />Inténtalo de nuevo
              </p>
            </>
          )}

          {/* Botones de Reintentar o Continuar */}
          <div className="flex justify-center mt-6">
            {allCorrect ? (
              <button
                onClick={() => console.log("Continuando al siguiente nivel...")}
                className="flex items-center bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg font-bold text-white transform transition-transform hover:scale-105 mx-2"
              >
                <FaArrowRight className="mr-3" />
                Continuar
              </button>
            ) : (
              <button
                onClick={resetGame}
                className="flex items-center bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg font-bold text-white transform transition-transform hover:scale-105 mx-2"
              >
                <FaRedoAlt className="mr-3" />
                Reintentar
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Renderizar juego mientras no haya terminado
  return (
    <div className="relative flex justify-center items-center bg-cover bg-center min-h-screen yagora" style={{ backgroundImage: 'url("/img/games/fondo6.webp")' }}>
      <div className="bg-white shadow-lg p-12 rounded-lg w-full max-w-4xl">
        {/* Mostrar descripción del juego */}
        {description && (
          <p className="mb-8 font-bold text-2xl text-center text-green-700">{description}</p>
        )}

        <div className="flex justify-between gap-16 mb-8">
          {/* Columna Izquierda */}
          <div>
            <h2 className="mb-4 font-semibold text-center text-pink-700 text-xl">Izquierda</h2>
            {pares.map((pair, index) => (
              <button
                key={`left-${index}`}
                onClick={() => handleLeftSelect(pair.elemento1)}
                disabled={
                  matches.some((match) => match.left === pair.elemento1) ||
                  incorrectMatches.some((match) => match.left === pair.elemento1)
                }
                className={`w-full mb-4 p-4 rounded-lg ${
                  matches.some((match) => match.left === pair.elemento1)
                    ? "bg-green-300 border-green-400"
                    : incorrectMatches.some((match) => match.left === pair.elemento1)
                    ? "bg-red-300 border-red-400"
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
                key={`right-${index}`}
                onClick={() => handleRightSelect(pair.elemento2)}
                disabled={
                  matches.some((match) => match.right === pair.elemento2) ||
                  incorrectMatches.some((match) => match.right === pair.elemento2)
                }
                className={`w-full mb-4 p-4 rounded-lg ${
                  matches.some((match) => match.right === pair.elemento2)
                    ? "bg-green-300 border-green-400"
                    : incorrectMatches.some((match) => match.right === pair.elemento2)
                    ? "bg-red-300 border-red-400"
                    : "bg-white"
                } border border-gray-300 hover:bg-blue-100`}
              >
                {pair.elemento2}
              </button>
            ))}
          </div>
        </div>
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
    description: PropTypes.string.isRequired, // Añadir descripción en la configuración
    points: PropTypes.number.isRequired, // Puntos totales desde la configuración
  }).isRequired,
};

export default Emparejar;
