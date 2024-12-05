// Juego Arrastrar
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaRedoAlt, FaArrowRight } from "react-icons/fa";
import EmptyContentMessage from "../menssages/mensajeVacio";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";

const ArrastrarSoltar = ({ gameData, config, userProgress, setShowGame }) => {
  const { session } = useSession();
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Extraer el userId de la sesión solo si el usuario tiene rol 'estudiante'
    if (session?.role === 'estudiante') {
      setUserId(session.user);
    }
  }, [session]);

  // Estado para manejar las preguntas y el progreso del juego
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", correctAnswer: "" });
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Mostrar el juego si el progreso del estudiante indica que el juego está completado
  useEffect(() => {
    if (userProgress && userProgress.status === "completado") {
      // Si el juego ya fue completado antes por el estudiante
      setScore(userProgress.score);
      setIsGameOver(true);
    }
  }, [userProgress]);

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
        saveOrUpdateProgress(
          score + (selectedAnswer === correctOption ? points_questions : 0)
        );
      }
      setFeedback({ message: "", correctAnswer: "" });
      setSelectedAnswer(null);
    }, 3000);
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
          status: finalScore >= points_min ? "completado" : "fallido",
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
            status: finalScore >= points_min ? "completado" : "fallido",
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
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsGameOver(false);
    setFeedback({ message: "", correctAnswer: "" });
    setSelectedAnswer(null);
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
        style={{ backgroundImage: 'url("/img/games/fondo2.webp")' }}
      >
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
              <p className="mb-6 font-bold text-2xl text-green-600">
                ¡Felicidades, aprobaste el juego!
              </p>
              <div className="flex justify-center space-x-8 mt-6">
                <button
                  onClick={resetGame}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg font-bold text-white transform transition-transform hover:scale-105"
                >
                  <FaRedoAlt className="mr-3" />
                  Reintentar
                </button>
                <button
                  onClick={handleContinue}
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
    <div
      className="relative flex justify-center items-center bg-cover bg-center min-h-screen"
      style={{ backgroundImage: 'url("/img/games/fondo2.webp")' }}
    >
      <div className="bg-white shadow-lg p-12 rounded-lg w-full max-w-4xl">
        {/* Barra superior con el número de pregunta y el puntaje */}
        <div className="flex justify-between items-center mb-8">
          <p className="font-semibold text-blue-700 text-xl">
            Pregunta {currentQuestionIndex + 1} de {questions.length}
          </p>
          <p className="font-semibold text-blue-700 text-xl">
            Puntaje: {score} Estrellas
          </p>
        </div>

        {/* Pregunta y área para arrastrar y soltar */}
        <h2 className="mb-8 font-semibold text-2xl text-center text-gray-800">
          {currentQuestion.texto}
        </h2>
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
                feedback.message === "¡Respuesta Correcta!"
                  ? "text-green-600"
                  : "text-red-600"
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

// Definición de PropTypes para validar los tipos de propiedades que el componente ArrastrarSoltar espera recibir
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
  userProgress: PropTypes.object, // Progreso del usuario (opcional)
  setShowGame: PropTypes.func.isRequired, // Función para controlar si se muestra el juego
};

export default ArrastrarSoltar;
