  import React, { useState } from "react";
  import PropTypes from "prop-types";
  import { FaRedoAlt, FaArrowRight, FaQuestionCircle } from "react-icons/fa";
  import EmptyContentMessage from "../menssages/mensajeVacio";

  const VerdaderoFalso = ({ gameData, config }) => {
    // Estado para manejar las preguntas y el progreso del juego
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [feedback, setFeedback] = useState({ message: "", correctAnswer: "" });

    // Asegurarse de que config está definido y tiene preguntas
    if (!config || !config.questions || config.questions.length === 0) {
      return (
        <div className="text-center text-gray-800 text-lg">
          <EmptyContentMessage />
        </div>
      );
    }

    // Extraer datos del juego desde la configuración
    const { questions, points_per_question, points_min } = config;

    // Manejar la selección de una opción (verdadero o falso)
    const handleOptionClick = (selectedOption) => {
      const currentQuestion = questions[currentQuestionIndex];
      if (selectedOption === currentQuestion.respuesta) {
        setScore((prevScore) => prevScore + points_per_question);
        setFeedback({
          message: "¡Respuesta Correcta!",
          correctAnswer: "",
        });
      } else {
        setFeedback({
          message: "Respuesta Incorrecta",
          correctAnswer: `La respuesta correcta era: ${currentQuestion.respuesta}`,
        });
      }

      // Ir a la siguiente pregunta o finalizar el juego
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
          setIsGameOver(true);
        }
        setFeedback({ message: "", correctAnswer: "" });
      }, 2000);
    };

    // Reiniciar el juego
    const resetGame = () => {
      setCurrentQuestionIndex(0);
      setScore(0);
      setIsGameOver(false);
      setFeedback({ message: "", correctAnswer: "" });
    };

    // Continuar al siguiente nivel
    const continueGame = () => {
      console.log("Continuando al siguiente nivel...");
    };

    // Mostrar pantalla de finalización
    if (isGameOver) {
      return (
        <div className="flex justify-center items-center bg-cover bg-center min-h-screen yagora" style={{ backgroundImage: 'url("/img/games/fondo11.webp")' }}>
          <div className="bg-white shadow-lg p-12 rounded-lg w-full max-w-4xl text-center">
            <h1 className="mb-4 font-bold text-4xl">Juego Finalizado</h1>
            <p className="mb-4 text-2xl">
              Puntaje Obtenido: <span className="font-semibold">{score} Estrellas</span>
            </p>
            {score >= points_min ? (
              <>
                <img
                  src="/img/personajes/starly/starly_globos.webp"
                  alt="Felicidades"
                  className="mx-auto mb-6 w-36 h-36"
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
                  className="mx-auto mb-6 w-36 h-36"
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

    // Mostrar pregunta actual
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="relative flex justify-center items-center bg-cover bg-center min-h-screen yagora" style={{ backgroundImage: 'url("/img/games/fondo11.webp")' }}>
        <div className="bg-white shadow-lg p-12 rounded-lg w-full max-w-4xl">
          {/* Barra superior con el número de pregunta y el puntaje */}
          <div className="flex justify-between items-center mb-8">
            <p className="flex items-center font-semibold text-orange-700 text-xl">
              <FaQuestionCircle className="mr-2" />
              Pregunta {currentQuestionIndex + 1} de {questions.length}
            </p>
            <p className="font-semibold text-orange-700 text-xl">Puntaje: {score} Estrellas</p>
          </div>

          {/* Pregunta y opciones (Verdadero o Falso) */}
          <h2 className="mb-8 font-semibold text-2xl text-center text-gray-800">{currentQuestion.texto}</h2>
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => handleOptionClick("verdadero")}
              className="bg-green-500 hover:bg-green-600 px-8 py-2 rounded-full font-bold text-white transform transition-transform hover:scale-105"
            >
              Verdadero
            </button>
            <button
              onClick={() => handleOptionClick("falso")}
              className="bg-blue-500 hover:bg-blue-600 px-8 py-2 rounded-full font-bold text-white transform transition-transform hover:scale-105"
            >
              Falso
            </button>
          </div>

          {/* Feedback */}
          {feedback.message && (
            <div className="bg-white shadow-md mt-4 p-4 rounded-lg text-center">
              <p
                className={`text-xl font-bold mb-2 ${
                  feedback.message === "¡Respuesta Correcta!" ? "text-green-600" : "text-red-600"
                }`}
              >
                {feedback.message}
              </p>
              {feedback.correctAnswer && <p className="font-bold text-xl">{feedback.correctAnswer}</p>}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Definición de PropTypes para validar los tipos de propiedades que el componente VerdaderoFalso espera recibir
  VerdaderoFalso.propTypes = {
    gameData: PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    config: PropTypes.shape({
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          texto: PropTypes.string.isRequired,
          respuesta: PropTypes.oneOf(["verdadero", "falso"]).isRequired,
        })
      ).isRequired,
      points_per_question: PropTypes.number.isRequired,
      points_min: PropTypes.number.isRequired,
    }).isRequired,
  };

  export default VerdaderoFalso;
