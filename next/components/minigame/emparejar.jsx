// Juego Emparejar
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaRedoAlt, FaArrowRight } from "react-icons/fa";
import useSession from "@/hooks/useSession"; // Importar el hook de sesión
import { useRouter } from "next/navigation";

const Emparejar = ({ gameData, config, userProgress, setShowGame }) => {
  const { session } = useSession();
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Extraer el userId de la sesión solo si el usuario tiene rol 'estudiante'
    if (session?.role === 'estudiante') {
      setUserId(session.user);
    }
  }, [session]);

  // Estados para manejar el juego
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState([]);
  const [incorrectMatches, setIncorrectMatches] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Extraer datos de configuración del juego
  const { pares, description, points, points_min } = config;
  const pointsPerPair = Math.floor(points / pares.length); // Puntos por par correcto

  // Mostrar el juego si el progreso del estudiante indica que el juego está completado
  useEffect(() => {
    if (userProgress && userProgress.status === "completado") {
      setScore(userProgress.score);
      setIsGameOver(true);
    }
  }, [userProgress]);

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
      setScore((prevScore) => prevScore + pointsPerPair);
    } else {
      setIncorrectMatches((prev) => [...prev, { left: selectedLeft, right: element }]);
    }

    setSelectedLeft(null);

    // Verificar si el juego ha terminado (si todos los pares han sido emparejados)
    if (matches.length + incorrectMatches.length + 1 === pares.length) {
      setTimeout(() => {
        setIsGameOver(true);
        saveOrUpdateProgress(score + (isCorrect ? pointsPerPair : 0));
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
      console.error('Error al gestionar el progreso del estudiante:', error);
    }
  };

  // Función para crear un nuevo progreso (POST)
  const createProgress = async (finalScore) => {
    try {
      const response = await fetch('http://localhost:3001/api/progreso/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: userId,
          game_id: gameData.id,
          status: finalScore >= points_min ? 'completado' : 'fallido',
          score: finalScore,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Progreso creado:', data);
      } else {
        console.error('Error al crear el progreso:', await response.text());
      }
    } catch (error) {
      console.error('Error al conectar con el servidor para crear el progreso:', error);
    }
  };

  // Función para actualizar el progreso existente (PUT)
  const updateProgress = async (finalScore) => {
    try {
      const response = await fetch(`http://localhost:3001/api/progreso/${userId}/${gameData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score: finalScore,
          status: finalScore >= points_min ? 'completado' : 'fallido',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Progreso actualizado:', data);
        return 200; // OK status
      } else if (response.status === 404) {
        console.warn('Progreso no encontrado para actualizar.');
        return 404; // Not found status
      } else {
        console.error('Error al actualizar el progreso:', await response.text());
      }
    } catch (error) {
      console.error('Error al conectar con el servidor para actualizar el progreso:', error);
    }
    return null;
  };

  // Reiniciar el juego
  const resetGame = () => {
    setMatches([]);
    setIncorrectMatches([]);
    setSelectedLeft(null);
    setIsGameOver(false);
    setScore(0);
    setShowGame(true); // Mantener el juego visible al reiniciar
  };

  // Continuar al siguiente nivel
  const handleContinue = () => {
    router.back(); // Redirigir al usuario a la página anterior
  };

  // Mostrar pantalla de finalización
  if (isGameOver) {
    const allCorrect = incorrectMatches.length === 0;

    return (
      <div className="flex justify-center items-center bg-cover bg-center min-h-screen yagora" style={{ backgroundImage: 'url("/img/games/fondo6.webp")' }}>
        <div className="bg-white shadow-lg p-12 rounded-lg w-full max-w-4xl text-center">
          <h1 className="mb-4 font-bold text-4xl">Juego Finalizado</h1>
          {allCorrect ? (
            <>
              <img src="/img/personajes/starly/starly_fuego.webp" alt="Felicidades" className="mx-auto mb-6 w-40 h-40" />
              <p className="mb-6 font-bold text-2xl">
                Puntaje Obtenido: <span className="text-green-600">{score} Estrellas</span>
              </p>
              <p className="mb-6 font-bold text-2xl text-green-600">
                ¡Felicidades, todos los emparejamientos son correctos!
              </p>
            </>
          ) : (
            <>
              <img src="/img/personajes/starly/starly_triste.webp" alt="Inténtalo de nuevo" className="mx-auto mb-6 w-40 h-40" />
              <p className="mb-6 font-bold text-2xl">
                Puntaje Obtenido: <span className="text-red-600">{score} Estrellas</span>
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
                onClick={handleContinue}
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
    description: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    points_min: PropTypes.number.isRequired,
  }).isRequired,
  userProgress: PropTypes.object,
  setShowGame: PropTypes.func.isRequired,
};

export default Emparejar;
