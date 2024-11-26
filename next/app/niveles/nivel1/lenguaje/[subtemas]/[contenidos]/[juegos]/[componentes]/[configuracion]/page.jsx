"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { gameTypeComponent } from "@/utils/gameTypeComponent";
import Volver from "@/components/elements/botonVolver";
import { SeparadorMorado } from "@/components/separador";
import { FiFileText, FiPlusCircle, FiSave, FiLayers, FiCheckCircle, FiXCircle, FiArrowRight, FiTrash2 } from "react-icons/fi";

const ConfigurationPage = () => {
    const params = useParams();
    const { juegos } = params;

    const gameId = Number(juegos);
    if (isNaN(gameId)) {
        console.error("Error: El ID del juego no es un número válido. Valor recibido:", juegos);
    }

    const [currentTab, setCurrentTab] = useState("general");
    const [gameTypeId, setGameTypeId] = useState("");
    const [totalPoints, setTotalPoints] = useState("");
    const [minimumPoints, setMinimumPoints] = useState("");
    const [numScenes, setNumScenes] = useState("");
    const [questions, setQuestions] = useState([{ text: "", options: ["", ""], correct: null, points: "" }]);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState(""); // success or error
    const [showModal, setShowModal] = useState(false);

    const addQuestion = () => {
        if (questions.length < Number(numScenes)) {
            setQuestions([...questions, { text: "", options: ["", ""], correct: null, points: "" }]);
        }
    };

    const deleteQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
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
        if (questions[questionIndex].options.length < 4) {
            const newQuestions = [...questions];
            newQuestions[questionIndex].options.push("");
            setQuestions(newQuestions);
        }
    };

    const deleteOption = (questionIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options = newQuestions[questionIndex].options.filter((_, i) => i !== optionIndex);
        setQuestions(newQuestions);
    };

    const selectCorrectOption = (questionIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].correct = optionIndex;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar que el número de preguntas sea igual al número de escenas especificado
        if (questions.length < Number(numScenes)) {
            setModalMessage("Debe completar todas las preguntas de acuerdo con el número de escenas especificadas.");
            setModalType("error");
            setShowModal(true);
            return;
        }

        // Verificar que todas las preguntas estén completas (con texto, opciones y puntos)
        for (const question of questions) {
            if (!question.text || question.options.length < 2 || question.correct === null) {
                setModalMessage("Por favor complete todas las preguntas con opciones y seleccione la respuesta correcta.");
                setModalType("error");
                setShowModal(true);
                return;
            }
        }

        // Validar que la suma de los puntos de todas las preguntas sea igual a los puntos totales especificados
        const totalPointsAssigned = questions.reduce((sum, question) => sum + Number(question.points), 0);
        if (totalPointsAssigned !== Number(totalPoints)) {
            setModalMessage(`La suma de los puntos asignados a las preguntas (${totalPointsAssigned}) no coincide con el total de puntos especificado (${totalPoints}).`);
            setModalType("error");
            setShowModal(true);
            return;
        }

        // Crear un archivo JSON con todos los detalles del juego
        const gameData = {
            gameTypeId: Number(gameTypeId),
            total_points: Number(totalPoints),
            minimum_points: Number(minimumPoints),
            num_scenes: Number(numScenes),
            questions,
        };

        const questionsBlob = new Blob([JSON.stringify(gameData)], { type: "application/json" });
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
                setModalMessage("No se pudo subir el archivo JSON. Por favor intenta de nuevo.");
                setModalType("error");
                setShowModal(true);
                return;
            }

            // Construir el objeto `gameDetail` con los campos necesarios
            const gameDetail = {
                gameTypeId: Number(gameTypeId),
                gameId: Number(gameId),
                json_url: data.secure_url,
            };

            // Hacer la solicitud al backend
            const gameResponse = await fetch("http://localhost:3001/api/gamecomponent/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(gameDetail),
            });

            if (gameResponse.ok) {
                setModalMessage("¡Juego creado exitosamente!");
                setModalType("success");
                setShowModal(true);
            } else {
                setModalMessage("Error al crear el juego: " + gameResponse.statusText);
                setModalType("error");
                setShowModal(true);
            }
        } catch (error) {
            setModalMessage("Error al realizar la solicitud. Inténtalo nuevamente.");
            setModalType("error");
            setShowModal(true);
        }
    };

    return (
        <main className="bg-gray-50">
            <SeparadorMorado />
            <Volver href={`/niveles/nivel1/lenguaje/${gameId}/${gameId}/${gameId}/${gameId}`} />
            <form onSubmit={handleSubmit} className="bg-white shadow-md mx-auto my-10 p-6 rounded-xl max-w-3xl yagora">
                <h2 className="mb-6 font-bold text-2xl text-center text-purple-700">
                    <FiLayers className="inline-block mr-2" /> Crear Detalles del Juego
                </h2>

                {/* Pestañas de Navegación */}
                <div className="flex justify-center mb-6">
                    <button
                        type="button"
                        onClick={() => setCurrentTab("general")}
                        className={`px-4 py-2 mr-2 rounded-full transition-colors ${currentTab === "general" ? "bg-purple-600 text-white shadow-lg" : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        <FiFileText className="inline-block mr-1" /> Información General
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            // Validar que los campos de información general estén completos antes de ir a la pestaña de preguntas
                            if (!gameTypeId || !totalPoints || !minimumPoints || !numScenes) {
                                setModalMessage("Por favor complete todos los campos de información general antes de continuar.");
                                setModalType("error");
                                setShowModal(true);
                                return;
                            }
                            setCurrentTab("questions");
                        }}
                        className={`px-4 py-2 rounded-full transition-colors ${currentTab === "questions" ? "bg-purple-600 text-white shadow-lg" : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        <FiPlusCircle className="inline-block mr-1" /> Preguntas del Juego
                    </button>
                </div>

                {currentTab === "general" && (
                    <div className="tab-content">
                        {/* Selector de Tipo de Juego */}
                        <div className="mb-4">
                            <label htmlFor="gameType" className="block mb-2 font-semibold text-purple-700">Tipo de Juego</label>
                            <select
                                id="gameType"
                                value={gameTypeId}
                                onChange={(e) => setGameTypeId(e.target.value)}
                                className="p-3 border rounded w-full"
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

                        {/* Contenedor de Inputs para Puntaje Total, Puntaje Mínimo y Número de Escenas */}
                        <div className="flex flex-wrap -mx-2">
                            <div className="mb-4 px-2 w-full md:w-1/3">
                                <label htmlFor="totalPoints" className="block mb-2 font-semibold text-purple-700">Puntaje Total</label>
                                <input
                                    type="number"
                                    id="totalPoints"
                                    value={totalPoints}
                                    onChange={(e) => setTotalPoints(e.target.value)}
                                    className="p-3 border rounded w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4 px-2 w-full md:w-1/3">
                                <label htmlFor="minimumPoints" className="block mb-2 font-semibold text-purple-700">Puntaje Mínimo</label>
                                <input
                                    type="number"
                                    id="minimumPoints"
                                    value={minimumPoints}
                                    onChange={(e) => setMinimumPoints(e.target.value)}
                                    className="p-3 border rounded w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4 px-2 w-full md:w-1/3">
                                <label htmlFor="numScenes" className="block mb-2 font-semibold text-purple-700">Número de Escenas</label>
                                <input
                                    type="number"
                                    id="numScenes"
                                    value={numScenes}
                                    onChange={(e) => setNumScenes(e.target.value)}
                                    className="p-3 border rounded w-full"
                                    required
                                />
                            </div>
                        </div>

                        <div className="text-right mt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    if (!gameTypeId || !totalPoints || !minimumPoints || !numScenes) {
                                        setModalMessage("Por favor complete todos los campos de información general antes de continuar.");
                                        setModalType("error");
                                        setShowModal(true);
                                        return;
                                    }
                                    setCurrentTab("questions");
                                }}
                                className="bg-purple-600 hover:bg-purple-700 shadow-lg px-6 py-2 rounded-full text-white transition"
                            >
                                Siguiente <FiArrowRight className="inline-block ml-1" />
                            </button>
                        </div>
                    </div>
                )}

                {currentTab === "questions" && (
                    <div className="tab-content">
                        <h3 className="mb-4 font-semibold text-purple-700 text-xl">Preguntas del Juego</h3>
                        {questions.map((question, index) => (
                            <div key={index} className="bg-gray-50 shadow-sm mb-6 p-4 border rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold">Pregunta {index + 1}</h4>
                                    <button
                                        type="button"
                                        onClick={() => deleteQuestion(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                                {/* Texto de la Pregunta */}
                                <input
                                    type="text"
                                    placeholder="Texto de la Pregunta"
                                    value={question.text}
                                    onChange={(e) => updateQuestion(index, "text", e.target.value)}
                                    className="mb-2 p-3 border rounded w-full"
                                    required
                                />
                                {/* Puntos de la Pregunta */}
                                <input
                                    type="number"
                                    placeholder="Puntos para esta pregunta"
                                    value={question.points}
                                    onChange={(e) => updateQuestion(index, "points", e.target.value)}
                                    className="mb-2 p-3 border rounded w-full"
                                    required
                                />
                                <div className="mb-4">
                                    <h4 className="font-semibold text-purple-700">Opciones</h4>
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center mb-2">
                                            <input
                                                type="text"
                                                placeholder={`Opción ${optionIndex + 1}`}
                                                value={option}
                                                onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                                                className="mr-2 p-3 border rounded w-full"
                                                required
                                            />
                                            <input
                                                type="radio"
                                                name={`correctOption-${index}`}
                                                checked={question.correct === optionIndex}
                                                onChange={() => selectCorrectOption(index, optionIndex)}
                                                className="ml-2"
                                            />
                                            {question.options.length > 2 && (
                                                <button
                                                    type="button"
                                                    onClick={() => deleteOption(index, optionIndex)}
                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {question.options.length < 4 && (
                                        <button
                                            type="button"
                                            onClick={() => addOption(index)}
                                            className="bg-purple-600 hover:bg-purple-700 shadow mt-2 px-4 py-2 rounded-full text-white transition"
                                        >
                                            <FiPlusCircle className="inline-block mr-1" /> Agregar Opción
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {questions.length < Number(numScenes) && (
                            <button
                                type="button"
                                onClick={addQuestion}
                                className="bg-purple-600 hover:bg-purple-700 shadow mt-2 px-6 py-2 rounded-full text-white transition"
                            >
                                <FiPlusCircle className="inline-block mr-1" /> Agregar Pregunta
                            </button>
                        )}

                        {/* Botón para enviar el formulario */}
                        <div className="mt-8 text-center">
                            <button type="submit" className="bg-green-600 hover:bg-green-700 shadow px-6 py-3 rounded-full font-bold text-white transition">
                                <FiSave className="inline-block mr-2" /> Crear Juego
                            </button>
                        </div>
                    </div>
                )}

                {/* Modal para mostrar mensajes */}
                {showModal && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <div className={`bg-white p-6 rounded-lg max-w-sm w-full shadow-lg text-center ${modalType === "success" ? "border-green-500" : "border-red-500"}`}>
                            <div className="flex flex-col items-center">
                                {modalType === "success" ? (
                                    <FiCheckCircle className="mb-4 text-5xl text-green-500" />
                                ) : (
                                    <FiXCircle className="mb-4 text-5xl text-red-500" />
                                )}
                                <p className="font-semibold text-lg">{modalMessage}</p>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-purple-600 hover:bg-purple-700 shadow-lg mt-4 px-6 py-2 rounded-full text-white transition"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </form>
            <SeparadorMorado />
        </main>
    );
};

export default ConfigurationPage;
