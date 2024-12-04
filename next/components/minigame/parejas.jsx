import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaRedoAlt, FaArrowRight } from "react-icons/fa";

const EncontrarPareja = ({ gameData, config }) => {
  const [pairs, setPairs] = useState([]);
  const [shuffledPairs, setShuffledPairs] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.time_limit * 60); // Tiempo en segundos
  const [isGameOver, setIsGameOver] = useState(false);
  const pointsPerPair = Math.floor(config.points / config.pairs.length); // Puntos por par correcto

  useEffect(() => {
    if (config && config.pairs) {
      const duplicatedPairs = config.pairs.flatMap((pair, index) => [
        { ...pair, id: `${index}-1`, value: pair.text1 },
        { ...pair, id: `${index}-2`, value: pair.text2 },
      ]);
      const shuffled = [...duplicatedPairs].sort(() => Math.random() - 0.5);
      setPairs(config.pairs);
      setShuffledPairs(shuffled);
    }
  }, [config]);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver]);

  const handleCardClick = (card) => {
    if (selectedCards.length === 2 || selectedCards.some((selected) => selected.id === card.id)) {
      return; // No hacer nada si ya hay dos cartas seleccionadas o si se selecciona la misma carta nuevamente
    }

    const newSelectedCards = [...selectedCards, card];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      if (newSelectedCards[0].value === newSelectedCards[1].value) {
        setMatchedPairs([...matchedPairs, newSelectedCards[0].value]);
        setScore((prevScore) => prevScore + pointsPerPair);
      }
      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
    }

    if (matchedPairs.length + 1 === config.pairs.length) {
      setTimeout(() => {
        setIsGameOver(true);
      }, 1000);
    }
  };

  const resetGame = () => {
    const duplicatedPairs = config.pairs.flatMap((pair, index) => [
      { ...pair, id: `${index}-1`, value: pair.text1 },
      { ...pair, id: `${index}-2`, value: pair.text2 },
    ]);
    const shuffled = [...duplicatedPairs].sort(() => Math.random() - 0.5);
    setShuffledPairs(shuffled);
    setMatchedPairs([]);
    setSelectedCards([]);
    setScore(0);
    setTimeLeft(config.time_limit * 60);
    setIsGameOver(false);
  };

  if (isGameOver) {
    const allPairsMatched = matchedPairs.length === config.pairs.length;
    const finalScore = score;

    return (
      <div className="flex justify-center items-center bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("/img/games/fondo4.webp")' }}>
        <div className="bg-white shadow-lg p-12 rounded-lg w-full max-w-4xl text-center">
          <h1 className="mb-4 font-bold text-4xl">Juego Finalizado</h1>
          <p className="mb-4 text-2xl">
            Puntaje Obtenido: <span className="font-semibold">{finalScore} Estrellas</span>
          </p>
          {allPairsMatched ? (
            <>
              <img
                src="/img/personajes/starly/starly_globos.webp"
                alt="Felicidades"
                className="mx-auto mb-6 w-36 h-36"
              />
              <p className="mb-6 font-bold text-2xl text-green-600">
                ¡Felicidades, emparejaste todas las cartas correctamente!
              </p>
            </>
          ) : (
            <>
              <img
                src="/img/personajes/starly/starly_triste.webp"
                alt="Inténtalo de nuevo"
                className="mx-auto mb-6 w-36 h-36"
              />
              <p className="mb-6 font-bold text-2xl text-red-600">
                No lograste emparejar todas las cartas antes de que el tiempo se agotara.
                <br />
                ¡Inténtalo de nuevo!
              </p>
            </>
          )}

          {/* Botones de Reintentar o Continuar */}
          <div className="flex justify-center space-x-8 mt-6">
            <button
              onClick={resetGame}
              className="flex items-center bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg font-bold text-white transform transition-transform hover:scale-105"
            >
              <FaRedoAlt className="mr-3" />
              Reintentar
            </button>
            {allPairsMatched && (
              <button
                onClick={() => console.log("Continuando al siguiente nivel...")}
                className="flex items-center bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg font-bold text-white transform transition-transform hover:scale-105"
              >
                <FaArrowRight className="mr-3" />
                Continuar
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("/img/games/fondo4.webp")' }}>
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-4xl text-center">
        <div className="flex justify-between mb-8 text-purple-800">
          <p className="font-bold text-xl">Tiempo Restante: {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}</p>
          <p className="font-bold text-xl">Puntaje: {score} / {config.points} Estrellas</p>
        </div>
        <div className="gap-4 grid grid-cols-4">
          {shuffledPairs.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`w-32 h-32 flex items-center justify-center border-2 rounded-lg cursor-pointer text-lg font-bold transition-transform ${
                selectedCards.includes(card) || matchedPairs.includes(card.value)
                  ? "bg-green-300 text-black"
                  : "bg-purple-500 text-white"
              }`}
            >
              {selectedCards.includes(card) || matchedPairs.includes(card.value) ? card.value : "?"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

EncontrarPareja.propTypes = {
  gameData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  config: PropTypes.shape({
    pairs: PropTypes.arrayOf(
      PropTypes.shape({
        text1: PropTypes.string.isRequired,
        text2: PropTypes.string.isRequired,
      })
    ).isRequired,
    points: PropTypes.number.isRequired,
    time_limit: PropTypes.number.isRequired, // Tiempo en minutos
  }).isRequired,
};

export default EncontrarPareja;
