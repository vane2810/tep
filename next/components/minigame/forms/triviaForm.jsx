"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiX, FiSave, FiPlusCircle } from "react-icons/fi";

const TriviaForm = ({ isOpen, onClose, gameData }) => {
    const [questions, setQuestions] = useState(gameData.questions || []);
    const [points, setPoints] = useState(gameData.points || "");
    const [pointsQuestions, setPointsQuestions] = useState(gameData.points_questions || "");
    const [pointsMin, setPointsMin] = useState(gameData.points_min || "");
    const [newQuestion, setNewQuestion] = useState({ text: "", options: ["", "", "", ""], correctAnswer: "" });
    const [errors, setErrors] = useState({});

    // Manejar los cambios en los campos de preguntas
    const handleQuestionChange = (e) => {
        setNewQuestion((prev) => ({ ...prev, text: e.target.value }));
    };

    // Manejar los cambios en las opciones de las preguntas
    const handleOptionChange = (index, value) => {
        const updatedOptions = [...newQuestion.options];
        updatedOptions[index] = value;
        setNewQuestion((prev) => ({ ...prev, options: updatedOptions }));
    };

    // Manejar cambios en la respuesta correcta
    const handleCorrectAnswerChange = (value) => {
        setNewQuestion((prev) => ({ ...prev, correctAnswer: value }));
    };

    // Añadir una nueva pregunta
    const handleAddQuestion = () => {
        if (!newQuestion.text.trim() || newQuestion.options.some((opt) => !opt.trim()) || !newQuestion.correctAnswer.trim()) {
            setErrors((prev) => ({ ...prev, question: "Por favor completa todos los campos de la pregunta." }));
            return;
        }
        setQuestions((prev) => [...prev, newQuestion]);
        setNewQuestion({ text: "", options: ["", "", "", ""], correctAnswer: "" });
        setErrors({});
    };

    // Guardar los datos de configuración del juego
    const handleSave = () => {
        if (!points || !pointsQuestions || !pointsMin) {
            setErrors((prev) => ({ ...prev, points: "Los campos de puntos son obligatorios." }));
            return;
        }

        // Aquí deberías realizar el guardado en la base de datos, llamar al API de guardado, etc.
        // Ejemplo: onSave({ questions, points, pointsQuestions, pointsMin });

        // Limpiar errores y cerrar el modal
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-70">
            <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-2xl">
                <button
                    className="top-4 right-4 absolute text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    <FiX className="text-2xl" />
                </button>

                <h2 className="mb-6 font-semibold text-3xl text-center text-purple-700">
                    Configuración del Juego de Trivia
                </h2>

                {/* Campo de puntos */}
                <div className="mb-4">
                    <input
                        type="number"
                        placeholder="Puntuación total *"
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        className={`border p-3 rounded-lg focus:ring-2 w-full focus:outline-none ${errors.points ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                            }`}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        placeholder="Puntos por pregunta *"
                        value={pointsQuestions}
                        onChange={(e) => setPointsQuestions(e.target.value)}
                        className={`border p-3 rounded-lg focus:ring-2 w-full focus:outline-none ${errors.points ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                            }`}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        placeholder="Puntos mínimos *"
                        value={pointsMin}
                        onChange={(e) => setPointsMin(e.target.value)}
                        className={`border p-3 rounded-lg focus:ring-2 w-full focus:outline-none ${errors.points ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                            }`}
                    />
                </div>

                {/* Añadir nueva pregunta */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Texto de la pregunta *"
                        value={newQuestion.text}
                        onChange={handleQuestionChange}
                        className="border-gray-300 mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 w-full focus:outline-none"
                    />
                    {newQuestion.options.map((option, index) => (
                        <input
                            key={`option-${index}`}
                            type="text"
                            placeholder={`Opción ${index + 1} *`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="border-gray-300 mb-2 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 w-full focus:outline-none"
                        />
                    ))}
                    <input
                        type="text"
                        placeholder="Respuesta Correcta *"
                        value={newQuestion.correctAnswer}
                        onChange={(e) => handleCorrectAnswerChange(e.target.value)}
                        className="border-gray-300 mb-2 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 w-full focus:outline-none"
                    />
                    {errors.question && <p className="text-red-500 text-sm">{errors.question}</p>}
                    <button
                        className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 mt-4 px-4 py-2 rounded-lg font-semibold text-white transform transition-transform hover:scale-105"
                        onClick={handleAddQuestion}
                    >
                        <FiPlusCircle className="text-xl" />
                        <span>Añadir Pregunta</span>
                    </button>
                </div>

                {/* Mostrar preguntas añadidas */}
                <div className="mb-6">
                    <h3 className="mb-2 font-bold text-lg text-purple-700">Preguntas Añadidas:</h3>
                    {questions.length > 0 ? (
                        questions.map((question, index) => (
                            <div key={`added-question-${index}`} className="bg-gray-100 mb-4 p-4 border rounded-lg">
                                <p className="font-semibold">{question.text}</p>
                                <ul className="list-disc list-inside">
                                    {question.options.map((option, optIndex) => (
                                        <li key={`added-option-${index}-${optIndex}`}>{option}</li>
                                    ))}
                                </ul>
                                <p className="font-semibold text-green-600">
                                    Respuesta Correcta: {question.correctAnswer}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No hay preguntas añadidas aún.</p>
                    )}
                </div>

                {/* Botones de guardar y cancelar */}
                <div className="flex justify-end space-x-4">
                    <button
                        className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded-lg font-semibold text-white transform transition-transform hover:scale-105"
                        onClick={onClose}
                    >
                        <FiX className="text-xl" />
                        <span>Cancelar</span>
                    </button>
                    <button
                        className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-semibold text-white transform transition-transform hover:scale-105"
                        onClick={handleSave}
                    >
                        <FiSave className="text-xl" />
                        <span>Guardar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

TriviaForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    gameData: PropTypes.shape({
        questions: PropTypes.arrayOf(
            PropTypes.shape({
                text: PropTypes.string.isRequired,
                options: PropTypes.arrayOf(PropTypes.string).isRequired,
                correctAnswer: PropTypes.string.isRequired,
            })
        ),
        points: PropTypes.string,
        points_questions: PropTypes.string,
        points_min: PropTypes.string,
    }),
};

export default TriviaForm;