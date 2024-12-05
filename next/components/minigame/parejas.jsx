import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaRedoAlt, FaArrowRight } from "react-icons/fa";
import useSession from "@/hooks/useSession"; // Importar el hook de sesión
import { useRouter } from "next/navigation";

const EncontrarPareja = ({ gameData, config, userProgress, setShowGame }) => {
  const { session } = useSession();
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Extraer el userId de la sesión solo si el usuario tiene rol 'estudiante'
    if (session?.role === "estudiante") {
      setUserId(session.user);
    }
  }, [session]);

  // Estado para manejar el progreso del juego
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
      saveOrUpdateProgress(score); // Guardar el progreso si el tiempo se agota
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
        saveOrUpdateProgress(score + pointsPerPair);
      }, 1000);
    }
  };

  // Función para guardar o actualizar el progreso en el backend
  const saveOrUpdateProgress = async (finalScore) => {
    if (!userId) {
      console.error("No se puede guardar el progreso porque no se encontró el userId del estudiante.");
      return;
    }

    try {
      // Primero intentar actualizar el progreso existente
      const updateResponse = await updateProgress(finalScore);
      if (updateResponse === 404) {
        // Si no existe, crear un nuevo progreso
        await createProgress(finalScore);
      }
    } catch (error) {
      console.error("Error al gestionar el progreso del estudiante:", error);
    }
  };

  // Función para crear un nuevo progreso (POST)
  const createProgress = async (finalScore) => {
    try {
      const response = await fetch("http://localhost:3001/api/progreso/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: userId,
          game_id: gameData.id,
          status: finalScore >= config.points ? "completado" : "fallido",
          score: finalScore,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Progreso creado:", data);
      } else {
        console.error("Error al crear el progreso:", await response.text());
      }
    } catch (error) {
      console.error("Error al conectar con el servidor para crear el progreso:", error);
    }
  };

  // Función para actualizar el progreso existente (PUT)
  const updateProgress = async (finalScore) => {
    try {
      const response = await fetch(`http://localhost:3001/api/progreso/${userId}/${gameData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: finalScore,
          status: finalScore >= config.points ? "completado" : "fallido",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Progreso actualizado:", data);
        return 200; // OK status
      } else if (response.status === 404) {
        console.warn("Progreso no encontrado para actualizar.");
        return 404; // Not found status
      } else {
        console.error("Error al actualizar el progreso:", await response.text());
      }
    } catch (error) {
      console.error("Error al conectar con el servidor para actualizar el progreso:", error);
    }
    return null;
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
    setShowGame(true); // Mantener el juego visible al reiniciar
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
                onClick={() => router.back()}
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
          <p className="font-bold text-xl">
            Tiempo Restante: {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
          </p>
          <p className="font-bold text-xl">
            Puntaje: {score} / {config.points} Estrellas
          </p>
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
  userProgress: PropTypes.object, // Progreso del usuario (opcional)
  setShowGame: PropTypes.func.isRequired, // Función para controlar si se muestra el juego
};

export default EncontrarPareja;
