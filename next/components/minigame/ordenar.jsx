// Juego Ordenar
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaRedoAlt, FaArrowRight } from "react-icons/fa";
import useSession from "@/hooks/useSession"; // Importar el hook de sesión
import { useRouter } from "next/navigation";

const OrdenarElementos = ({ gameData, config, userProgress, setShowGame }) => {
  const { session } = useSession();
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Extraer el userId de la sesión solo si el usuario tiene rol 'estudiante'
    if (session?.role === "estudiante") {
      setUserId(session.user);
    }
  }, [session]);

  // Estado para manejar los elementos y el progreso del juego
  const [elements, setElements] = useState(config.elements);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Mostrar el juego si el progreso del estudiante indica que el juego está completado
  useEffect(() => {
    if (userProgress && userProgress.status === "completado") {
      setScore(userProgress.score);
      setIsGameOver(true);
    }
  }, [userProgress]);

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
      saveOrUpdateProgress(config.points); // Guardar el progreso al completar correctamente
    } else {
      setScore(0);
      setFeedback("Orden Incorrecto. Inténtalo de nuevo.");
      setIsGameOver(true);
      saveOrUpdateProgress(0); // Guardar progreso con puntaje 0 si falla
    }
  };

  // Función para guardar o actualizar el progreso en el backend
  const saveOrUpdateProgress = async (finalScore) => {
    if (!userId) {
      console.error(
        "No se puede guardar el progreso porque no se encontró el userId del estudiante."
      );
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
          status: finalScore >= config.points_min ? "completado" : "fallido",
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
      console.error(
        "Error al conectar con el servidor para crear el progreso:",
        error
      );
    }
  };

  // Función para actualizar el progreso existente (PUT)
  const updateProgress = async (finalScore) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/progreso/${userId}/${gameData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            score: finalScore,
            status:
              finalScore >= config.points_min ? "completado" : "fallido",
          }),
        }
      );

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
      console.error(
        "Error al conectar con el servidor para actualizar el progreso:",
        error
      );
    }
    return null;
  };

  // Reiniciar el juego
  const resetGame = () => {
    setShuffled(
      [...elements].sort(() => Math.random() - 0.5).map((el) => ({
        value: el,
        isCorrect: null,
      }))
    );
    setIsGameOver(false);
    setScore(0);
    setFeedback("");
    setShowGame(true); // Mantener el juego visible al reiniciar
  };

  // Continuar al siguiente nivel
  const handleContinue = () => {
    router.back(); // Redirigir al usuario a la página anterior
  };

  // Mostrar pantalla de finalización
  if (isGameOver) {
    return (
      <div
        className="flex justify-center items-center bg-cover bg-center min-h-screen"
        style={{ backgroundImage: 'url("/img/games/fondo10.webp")' }}
      >
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
              <p className="mb-6 font-bold text-2xl text-green-600">
                ¡Felicidades, aprobaste el juego!
              </p>
              <div className="flex justify-center space-x-8 mt-6">
                <button
                  onClick={resetGame}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-bold text-white transform transition-transform hover:scale-105"
                >
                  <FaRedoAlt className="mr-3" />
                  Reintentar
                </button>
                <button
                  onClick={handleContinue}
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
    <div
      className="relative flex justify-center items-center bg-cover bg-center min-h-screen"
      style={{ backgroundImage: 'url("/img/games/fondo10.webp")' }}
    >
      <div className="bg-white shadow-lg p-10 rounded-lg w-full max-w-3xl">
        {/* Instrucciones */}
        <h2 className="mb-8 font-semibold text-2xl text-center text-gray-800">
          {config.instructions}
        </h2>

        {/* Elementos para ordenar */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {shuffled.map((element, index) => (
            <div
              key={index}
              className={`w-32 h-32 p-4 rounded-lg font-bold text-white text-center transform transition-transform hover:scale-105 cursor-pointer flex items-center justify-center ${
                element.isCorrect === true
                  ? "bg-teal-500"
                  : element.isCorrect === false
                  ? "bg-rose-400"
                  : "bg-blue-400 hover:bg-blue-500"
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
  userProgress: PropTypes.object, // Progreso del usuario (opcional)
  setShowGame: PropTypes.func.isRequired, // Función para controlar si se muestra el juego
};

export default OrdenarElementos;
