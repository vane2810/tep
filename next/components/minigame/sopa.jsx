import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaRedoAlt, FaArrowRight } from "react-icons/fa";
import useSession from "@/hooks/useSession"; // Importar el hook de sesión
import { useRouter } from "next/navigation";

const SopaDeLetras = ({ gameData, config, userProgress, setShowGame }) => {
  const { session } = useSession();
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Extraer el userId de la sesión solo si el usuario tiene rol 'estudiante'
    if (session?.role === "estudiante") {
      setUserId(session.user);
    }
  }, [session]);

  // Estado para manejar la sopa de letras y el progreso del juego
  const [grid, setGrid] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundCells, setFoundCells] = useState([]);
  const [timeLeft, setTimeLeft] = useState(config.time_limit * 60); // Tiempo en segundos
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (config && config.words.length > 0) {
      const lowercaseWords = config.words.map((word) => word.toLowerCase());
      generateGrid(lowercaseWords);
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

  useEffect(() => {
    // Detener el temporizador si todas las palabras se han encontrado
    if (foundWords.length === config.words.length) {
      setIsGameOver(true);
      setScore(config.points);
      saveOrUpdateProgress(config.points);
    }
  }, [foundWords, config.words.length, config.points]);

  const generateGrid = (words) => {
    const gridSize = 10; // Tamaño reducido de la cuadrícula
    const emptyGrid = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));

    words.forEach((word) => {
      let placed = false;
      while (!placed) {
        const direction = Math.floor(Math.random() * 4); // 0: derecha, 1: abajo, 2: diagonal derecha abajo, 3: diagonal derecha arriba
        const startRow = Math.floor(Math.random() * gridSize);
        const startCol = Math.floor(Math.random() * gridSize);

        if (canPlaceWord(word, emptyGrid, startRow, startCol, direction, gridSize)) {
          placeWord(word, emptyGrid, startRow, startCol, direction);
          placed = true;
        }
      }
    });

    // Llenar espacios vacíos con letras aleatorias (en minúsculas)
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (emptyGrid[i][j] === "") {
          emptyGrid[i][j] = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Letras aleatorias a-z
        }
      }
    }

    setGrid(emptyGrid);
  };

  const canPlaceWord = (word, grid, row, col, direction, gridSize) => {
    const wordLength = word.length;

    if (direction === 0 && col + wordLength > gridSize) return false;
    if (direction === 1 && row + wordLength > gridSize) return false;
    if (direction === 2 && (row + wordLength > gridSize || col + wordLength > gridSize)) return false;
    if (direction === 3 && (row - wordLength < 0 || col + wordLength > gridSize)) return false;

    for (let i = 0; i < wordLength; i++) {
      const newRow = direction === 1 || direction === 2 ? row + i : direction === 3 ? row - i : row;
      const newCol = direction === 0 || direction === 2 || direction === 3 ? col + i : col;

      if (grid[newRow][newCol] !== "" && grid[newRow][newCol] !== word[i]) {
        return false;
      }
    }

    return true;
  };

  const placeWord = (word, grid, row, col, direction) => {
    for (let i = 0; i < word.length; i++) {
      const newRow = direction === 1 || direction === 2 ? row + i : direction === 3 ? row - i : row;
      const newCol = direction === 0 || direction === 2 || direction === 3 ? col + i : col;
      grid[newRow][newCol] = word[i];
    }
  };

  const handleCellClick = (row, col) => {
    // Permitir deseleccionar una celda si ya estaba seleccionada
    if (selectedCells.some((cell) => cell.row === row && cell.col === col)) {
      setSelectedCells(selectedCells.filter((cell) => !(cell.row === row && cell.col === col)));
      return;
    }

    const newSelectedCells = [...selectedCells, { row, col }];
    setSelectedCells(newSelectedCells);

    const selectedWord = newSelectedCells.map((cell) => grid[cell.row][cell.col]).join("");

    if (config.words.some((word) => word.toLowerCase() === selectedWord)) {
      setFoundWords([...foundWords, selectedWord]);
      setFoundCells((prevFoundCells) => [...prevFoundCells, ...newSelectedCells]);
      setSelectedCells([]);
    } else if (newSelectedCells.length > config.words.reduce((a, b) => (a.length > b.length ? a : b)).length) {
      setSelectedCells([]);
    }
  };

  const resetGame = () => {
    const lowercaseWords = config.words.map((word) => word.toLowerCase());
    setFoundWords([]);
    setSelectedCells([]);
    setFoundCells([]);
    setTimeLeft(config.time_limit * 60);
    setIsGameOver(false);
    setScore(0);
    generateGrid(lowercaseWords);
    setShowGame(true); // Mantener el juego visible al reiniciar
  };

  // Guardar o actualizar el progreso del juego
  const saveOrUpdateProgress = async (finalScore) => {
    if (!userId) {
      console.error("No se puede guardar el progreso porque no se encontró el userId del estudiante.");
      return;
    }

    try {
      // Intentar actualizar primero
      const updateResponse = await updateProgress(finalScore);
      if (updateResponse === 404) {
        await createProgress(finalScore);
      }
    } catch (error) {
      console.error("Error al gestionar el progreso del estudiante:", error);
    }
  };

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
        console.log("Progreso creado correctamente.");
      } else {
        console.error("Error al crear el progreso:", await response.text());
      }
    } catch (error) {
      console.error("Error al conectar con el servidor para crear el progreso:", error);
    }
  };

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
        console.log("Progreso actualizado correctamente.");
        return 200; // OK status
      } else if (response.status === 404) {
        return 404; // Not found status
      } else {
        console.error("Error al actualizar el progreso:", await response.text());
      }
    } catch (error) {
      console.error("Error al conectar con el servidor para actualizar el progreso:", error);
    }
    return null;
  };

  // Mostrar la pantalla de finalización
  if (isGameOver) {
    const allWordsFound = foundWords.length === config.words.length;
    const finalScore = allWordsFound ? config.points : 0;

    return (
      <div className="flex justify-center items-center bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("/img/games/fondo5.webp")' }}>
        <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-3xl text-center">
          <h1 className="mb-4 font-bold text-4xl">Juego Finalizado</h1>
          <p className="mb-4 text-2xl">
            Puntaje Obtenido: <span className="font-semibold">{finalScore} Estrellas</span>
          </p>
          {allWordsFound ? (
            <>
              <img
                src="/img/personajes/starly/starly_globos.webp"
                alt="Felicidades"
                className="mx-auto mb-6 w-36 h-36"
              />
              <p className="mb-6 font-bold text-2xl text-green-600">
                ¡Felicidades, encontraste todas las palabras!
              </p>
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => router.back()}
                  className="flex items-center bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg font-bold text-white transform transition-transform hover:scale-105 mx-2"
                >
                  <FaArrowRight className="mr-3" />
                  Continuar
                </button>
              </div>
            </>
          ) : (
            <>
              <img
                src="/img/personajes/starly/starly_triste.webp"
                alt="Inténtalo de nuevo"
                className="mx-auto mb-6 w-36 h-36"
              />
              <p className="mb-6 font-bold text-2xl text-red-600">
                No encontraste todas las palabras antes de que el tiempo se agotara.
                <br />
                ¡Inténtalo de nuevo!
              </p>
              <div className="flex justify-center mt-6">
                <button
                  onClick={resetGame}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg font-bold text-white transform transition-transform hover:scale-105 mx-2"
                >
                  <FaRedoAlt className="mr-3" />
                  Reintentar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Mostrar el tablero de la sopa de letras
  return (
    <div className="flex justify-center items-center bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("/img/games/fondo5.webp")' }}>
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-3xl text-center">
        <div className="flex justify-between mb-6 text-purple-800">
          <p className="font-bold text-xl">Tiempo Restante: {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}</p>
        </div>

        {/* Mostrar lista de palabras a buscar */}
        <div className="mb-6">
          <h2 className="mb-4 font-bold text-lg">Palabras a Buscar:</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {config.words.map((word, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full font-bold ${
                  foundWords.includes(word.toLowerCase()) ? "bg-green-300 text-green-800" : "bg-gray-200 text-gray-800"
                }`}
              >
                {word.toLowerCase()}
              </span>
            ))}
          </div>
        </div>

        <div className="gap-1 grid grid-cols-10">
          {grid.map((row, rowIndex) =>
            row.map((letter, colIndex) => {
              const isSelected = selectedCells.some((cell) => cell.row === rowIndex && cell.col === colIndex);
              const isFound = foundCells.some((cell) => cell.row === rowIndex && cell.col === colIndex);

              return (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`w-10 h-10 flex items-center justify-center border-2 rounded-lg cursor-pointer text-lg font-bold transition-transform ${
                    isFound
                      ? "bg-green-500 text-white"
                      : isSelected
                      ? "bg-green-300 text-black"
                      : "bg-purple-500 text-white"
                  }`}
                >
                  {letter}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

SopaDeLetras.propTypes = {
  gameData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  config: PropTypes.shape({
    words: PropTypes.arrayOf(PropTypes.string).isRequired,
    points: PropTypes.number.isRequired,
    time_limit: PropTypes.number.isRequired, // Tiempo en minutos
  }).isRequired,
  userProgress: PropTypes.object, // Progreso del usuario (opcional)
  setShowGame: PropTypes.func.isRequired, // Función para controlar si se muestra el juego
};

export default SopaDeLetras;
