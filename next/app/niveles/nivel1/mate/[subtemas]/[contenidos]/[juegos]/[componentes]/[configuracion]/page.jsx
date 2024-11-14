"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { gameTypeComponent } from "@/utils/gameTypeComponent";

const ConfigurationPage = () => {
    const params = useParams();
    const { juegos } = params;

    const gameId = Number(juegos);
    if (isNaN(gameId)) {
        console.error("Error: El ID del juego no es un número válido. Valor recibido:", juegos);
    }

    const [gameTypeId, setGameTypeId] = useState("");
    const [totalPoints, setTotalPoints] = useState("");
    const [minimumPoints, setMinimumPoints] = useState("");
    const [numScenes, setNumScenes] = useState("");
    const [questions, setQuestions] = useState([{ text: "", options: ["", ""], correct: null, points: "" }]);

    console.log("Game ID recibido:", gameId);

    const addQuestion = () => {
        if (questions.length < Number(numScenes)) {
            setQuestions([...questions, { text: "", options: ["", ""], correct: null, points: "" }]);
        }
    };

    const updateQuestion = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const updateOption = (questionIndex, optionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(newQuestions);
    };

    const addOption = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.push("");
        setQuestions(newQuestions);
    };

    const selectCorrectOption = (questionIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].correct = optionIndex;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un archivo JSON con todos los detalles del juego
        const gameData = {
            gameTypeId: Number(gameTypeId),
            total_points: Number(totalPoints),
            minimum_points: Number(minimumPoints),
            num_scenes: Number(numScenes),
            questions,
        };

        const questionsBlob = new Blob([JSON.stringify(gameData)], { type: 'application/json' });
        const formData = new FormData();
        formData.append("file", questionsBlob);
        formData.append("upload_preset", "ml_default");

        try {
            // Subir el archivo JSON a Cloudinary
            const response = await fetch("https://api.cloudinary.com/v1_1/dikgrq4yt/raw/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!data.secure_url) {
                console.error("No se encontró la URL en la respuesta.");
                return;
            }

            // Construir el objeto `gameDetail` con los campos necesarios
            const gameDetail = {
                gameTypeId: Number(gameTypeId),
                gameId: Number(gameId),
                json_url: data.secure_url, // URL del archivo JSON almacenada en Cloudinary
            };

            console.log('Datos enviados al servidor:', gameDetail);

            // Hacer la solicitud al backend
            const gameResponse = await fetch("http://localhost:3001/api/gamecomponent/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(gameDetail),
            });

            if (gameResponse.ok) {
                const newGameDetail = await gameResponse.json();
                console.log("Juego creado exitosamente", newGameDetail);
            } else {
                console.error("Error al crear el juego:", gameResponse.statusText);
            }
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md mx-auto p-4 rounded max-w-md">
            <h2 className="mb-4 font-bold text-xl">Crear Detalles del Juego</h2>

            {/* Selector de Tipo de Juego */}
            <div className="mb-4">
                <label htmlFor="gameType" className="block mb-2 font-semibold">Tipo de Juego</label>
                <select
                    id="gameType"
                    value={gameTypeId}
                    onChange={(e) => setGameTypeId(e.target.value)}
                    className="p-2 border rounded w-full"
                    required
                >
                    <option value="">Selecciona el tipo de juego</option>
                    {Object.entries(gameTypeComponent).map(([typeId, component]) => (
                        <option key={typeId} value={typeId}>
                            {component.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Input para el Puntaje Total */}
            <div className="mb-4">
                <label htmlFor="totalPoints" className="block mb-2 font-semibold">Puntaje Total</label>
                <input
                    type="number"
                    id="totalPoints"
                    value={totalPoints}
                    onChange={(e) => setTotalPoints(e.target.value)}
                    className="p-2 border rounded w-full"
                    required
                />
            </div>

            {/* Input para el Puntaje Mínimo */}
            <div className="mb-4">
                <label htmlFor="minimumPoints" className="block mb-2 font-semibold">Puntaje Mínimo</label>
                <input
                    type="number"
                    id="minimumPoints"
                    value={minimumPoints}
                    onChange={(e) => setMinimumPoints(e.target.value)}
                    className="p-2 border rounded w-full"
                    required
                />
            </div>

            {/* Input para el Número de Escenas */}
            <div className="mb-4">
                <label htmlFor="numScenes" className="block mb-2 font-semibold">Número de Escenas</label>
                <input
                    type="number"
                    id="numScenes"
                    value={numScenes}
                    onChange={(e) => setNumScenes(e.target.value)}
                    className="p-2 border rounded w-full"
                    required
                />
            </div>

            {/* Preguntas del Juego */}
            <div className="mb-4">
                <h3 className="mb-2 font-semibold">Preguntas</h3>
                {questions.map((question, index) => (
                    <div key={index} className="mb-2 p-2 border rounded">
                        {/* Texto de la Pregunta */}
                        <input
                            type="text"
                            placeholder={`Pregunta ${index + 1}`}
                            value={question.text}
                            onChange={(e) => updateQuestion(index, "text", e.target.value)}
                            className="mb-2 p-2 border rounded w-full"
                            required
                        />
                        {/* Puntos de la Pregunta */}
                        <input
                            type="number"
                            placeholder="Puntos para esta pregunta"
                            value={question.points}
                            onChange={(e) => updateQuestion(index, "points", e.target.value)}
                            className="mb-2 p-2 border rounded w-full"
                            required
                        />
                        <div className="mb-2">
                            <h4 className="font-semibold">Opciones</h4>
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center mb-1">
                                    <input
                                        type="text"
                                        placeholder={`Opción ${optionIndex + 1}`}
                                        value={option}
                                        onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                                        className="mr-2 p-2 border rounded w-full"
                                        required
                                    />
                                    <input
                                        type="radio"
                                        name={`correctOption-${index}`}
                                        checked={question.correct === optionIndex}
                                        onChange={() => selectCorrectOption(index, optionIndex)}
                                    />
                                </div>
                            ))}
                            {question.options.length < 6 && (
                                <button
                                    type="button"
                                    onClick={() => addOption(index)}
                                    className="bg-blue-500 mt-2 px-2 py-1 rounded text-white"
                                >
                                    Agregar Opción
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {questions.length < Number(numScenes) && (
                    <button
                        type="button"
                        onClick={addQuestion}
                        className="bg-blue-500 mt-2 px-4 py-2 rounded text-white"
                    >
                        Agregar Pregunta
                    </button>
                )}
            </div>

            {/* Botón para enviar el formulario */}
            <button type="submit" className="bg-green-600 px-4 py-2 rounded font-bold text-white">
                Crear Juego
            </button>
        </form>
    );
};

export default ConfigurationPage;
