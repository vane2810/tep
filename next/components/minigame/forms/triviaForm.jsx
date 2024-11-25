import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaTrashAlt, FaArrowRight, FaSave, FaTimes, FaExclamationTriangle, FaInfoCircle, FaCheckCircle } from "react-icons/fa";

const TriviaForm = ({ isOpen, onClose, gameData, onSave }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [preguntas, setPreguntas] = useState([]);
  const [points, setPoints] = useState(0);
  const [pointsQuestions, setPointsQuestions] = useState(0);
  const [pointsMin, setPointsMin] = useState(0);
  const [errors, setErrors] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, message: "", position: { x: 0, y: 0 } });

  useEffect(() => {
    if (gameData?.config) {
      const config = JSON.parse(gameData.config);
      setPreguntas(config.preguntas || []);
      setPoints(config.points || 0);
      setPointsQuestions(config.points_questions || 0);
      setPointsMin(config.points_min || 0);
    }
  }, [gameData]);

  const handleAddQuestion = () => {
    setPreguntas([
      ...preguntas,
      { texto: "", opciones: ["", "", "", ""], respuestaCorrecta: "" },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedPreguntas = preguntas.filter((_, i) => i !== index);
    setPreguntas(updatedPreguntas);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedPreguntas = [...preguntas];
    if (field === "texto") {
      updatedPreguntas[index].texto = value;
    } else if (field === "respuestaCorrecta") {
      updatedPreguntas[index].respuestaCorrecta = value;
    }
    setPreguntas(updatedPreguntas);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedPreguntas = [...preguntas];
    updatedPreguntas[questionIndex].opciones[optionIndex] = value;
    setPreguntas(updatedPreguntas);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedPreguntas = [...preguntas];
    updatedPreguntas[questionIndex].opciones.splice(optionIndex, 1);
    setPreguntas(updatedPreguntas);
  };

  const handleAddOption = (questionIndex) => {
    const updatedPreguntas = [...preguntas];
    updatedPreguntas[questionIndex].opciones.push("");
    setPreguntas(updatedPreguntas);
  };

  const validateForm = () => {
    const newErrors = [];

    if (points <= 0) newErrors.push("Puntos totales deben ser mayores que 0.");
    if (pointsQuestions <= 0) newErrors.push("Puntos por pregunta correcta deben ser mayores que 0.");
    if (pointsMin <= 0) newErrors.push("Puntos mínimos para aprobar deben ser mayores que 0.");
    if (preguntas.length === 0) newErrors.push("Debe agregar al menos una pregunta.");

    const maxQuestions = Math.floor(points / pointsQuestions);
    if (preguntas.length > maxQuestions) {
      newErrors.push(`El número máximo de preguntas permitido es ${maxQuestions}, dado el puntaje total y el puntaje por pregunta.`);
    }

    preguntas.forEach((pregunta, index) => {
      if (!pregunta.texto) newErrors.push(`La pregunta #${index + 1} no tiene texto.`);
      if (pregunta.opciones.some((opcion) => opcion.trim() === "")) {
        newErrors.push(`La pregunta #${index + 1} tiene opciones vacías.`);
      }
      if (!pregunta.respuestaCorrecta) newErrors.push(`La pregunta #${index + 1} no tiene respuesta correcta.`);
    });

    setErrors(newErrors);
    setShowErrorModal(newErrors.length > 0);
    return newErrors.length === 0;
  };

  const handleSaveConfig = () => {
    if (validateForm()) {
      const configData = {
        preguntas,
        points,
        points_questions: pointsQuestions,
        points_min: pointsMin,
      };
      console.log("Datos de configuración guardados:", configData);
      onSave(configData);
      setShowSuccessModal(true);
    }
  };

  const isGeneralConfigComplete = () => {
    return points > 0 && pointsQuestions > 0 && pointsMin > 0;
  };

  const handleTooltip = (event, message) => {
    const rect = event.target.getBoundingClientRect();
    setTooltip({
      visible: true,
      message,
      position: { x: rect.right + 10, y: rect.top },
    });
  };

  const hideTooltip = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 yagora">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-3xl max-h-screen text-black overflow-auto">
        <h2 className="mb-4 font-bold text-2xl text-center">Configurar Trivia</h2>

        {/* Minimodal para mostrar errores */}
        {showErrorModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-25">
            <div className="bg-white shadow-lg p-4 rounded-lg w-full max-w-sm">
              <h3 className="flex items-center mb-2 font-bold text-red-700">
                <FaExclamationTriangle className="mr-2" /> Errores de Validación
              </h3>
              <ul className="mb-4">
                {errors.map((error, index) => (
                  <li key={index} className="text-red-700">{error}</li>
                ))}
              </ul>
              <button
                onClick={() => setShowErrorModal(false)}
                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded font-bold text-white"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Minimodal para mostrar éxito al guardar */}
        {showSuccessModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-25">
            <div className="bg-white shadow-lg p-4 rounded-lg w-full max-w-sm text-center">
              <h3 className="flex justify-center items-center mb-2 font-bold text-green-700">
                <FaCheckCircle className="mr-2" /> Configuración Guardada con Éxito
              </h3>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  onClose();
                }}
                className="bg-gray-500 hover:bg-gray-600 mt-4 px-4 py-2 rounded font-bold text-white"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Barra de pestañas centrada */}
        <div className="flex justify-center mb-4 border-b">
          <button
            className={`mr-4 pb-2 ${
              activeTab === "general"
                ? "border-b-4 border-purple-500 font-bold text-purple-700"
                : "text-gray-600 hover:text-purple-500"
            } transition-colors duration-200`}
            onClick={() => setActiveTab("general")}
            disabled={!isGeneralConfigComplete()}
          >
            Configuración General
          </button>
          <button
            className={`pb-2 ${
              activeTab === "preguntas"
                ? "border-b-4 border-purple-500 font-bold text-purple-700"
                : "text-gray-600 hover:text-purple-500"
            } transition-colors duration-200`}
            onClick={() => setActiveTab("preguntas")}
            disabled={!isGeneralConfigComplete()}
          >
            Preguntas
          </button>
        </div>

        {/* Contenido de la pestaña Configuración General */}
        {activeTab === "general" && (
          <div>
            <div className="relative mb-4">
              <label className="block mb-1 font-bold">
                Puntos Totales:
                <FaInfoCircle
                  className="inline ml-2 text-purple-500 cursor-pointer"
                  onClick={(e) => handleTooltip(e, "Define el total de puntos para la trivia.")}
                  onMouseLeave={hideTooltip}
                />
              </label>
              <input
                type="number"
                value={points === 0 ? "" : points}
                onChange={(e) => setPoints(Number(e.target.value) || 0)}
                className="border-gray-300 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="relative mb-4">
              <label className="block mb-1 font-bold">
                Puntos por Pregunta Correcta:
                <FaInfoCircle
                  className="inline ml-2 text-purple-500 cursor-pointer"
                  onClick={(e) => handleTooltip(e, "Define cuántos puntos vale cada respuesta correcta.")}
                  onMouseLeave={hideTooltip}
                />
              </label>
              <input
                type="number"
                value={pointsQuestions === 0 ? "" : pointsQuestions}
                onChange={(e) => setPointsQuestions(Number(e.target.value) || 0)}
                className="border-gray-300 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="relative mb-4">
              <label className="block mb-1 font-bold">
                Puntos Mínimos para Aprobar:
                <FaInfoCircle
                  className="inline ml-2 text-purple-500 cursor-pointer"
                  onClick={(e) => handleTooltip(e, "Define el puntaje mínimo necesario para aprobar la trivia.")}
                  onMouseLeave={hideTooltip}
                />
              </label>
              <input
                type="number"
                value={pointsMin === 0 ? "" : pointsMin}
                onChange={(e) => setPointsMin(Number(e.target.value) || 0)}
                className="border-gray-300 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {tooltip.visible && (
              <div
                className="absolute border-purple-500 bg-purple-100 shadow-lg p-2 border-l-4 rounded text-purple-700"
                style={{ top: tooltip.position.y, left: tooltip.position.x }}
              >
                {tooltip.message}
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={onClose}
                className="flex items-center bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded font-bold text-white"
              >
                <FaTimes className="mr-2" />
                Cancelar
              </button>
              {isGeneralConfigComplete() && (
                <button
                  onClick={() => setActiveTab("preguntas")}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-bold text-white"
                >
                  <FaArrowRight className="mr-2" />
                  Siguiente
                </button>
              )}
            </div>
          </div>
        )}

        {/* Contenido de la pestaña Preguntas */}
        {activeTab === "preguntas" && (
          <div>
            <h3 className="mb-4 font-bold">Preguntas</h3>
            {preguntas.map((pregunta, questionIndex) => (
              <div key={questionIndex} className="border-gray-300 shadow-sm mb-6 p-4 border rounded-lg">
                <label className="block mb-1 font-bold">Texto de la Pregunta:</label>
                <input
                  type="text"
                  value={pregunta.texto}
                  onChange={(e) =>
                    handleQuestionChange(questionIndex, "texto", e.target.value)
                  }
                  className="border-gray-300 mb-2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 w-full focus:outline-none"
                />

                <label className="block mb-1 font-bold">Opciones:</label>
                {pregunta.opciones.map((opcion, optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={opcion}
                      onChange={(e) =>
                        handleOptionChange(questionIndex, optionIndex, e.target.value)
                      }
                      className="border-gray-300 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 w-full focus:outline-none"
                    />
                    <button
                      onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                      className="bg-red-500 hover:bg-red-600 ml-2 p-2 rounded text-white"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => handleAddOption(questionIndex)}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 mb-4 px-4 py-2 rounded text-white"
                >
                  <FaPlus /> Añadir Opción
                </button>

                <label className="block mb-1 font-bold">
                  Respuesta Correcta:
                </label>
                <input
                  type="text"
                  value={pregunta.respuestaCorrecta}
                  onChange={(e) =>
                    handleQuestionChange(
                      questionIndex,
                      "respuestaCorrecta",
                      e.target.value
                    )
                  }
                  className="border-gray-300 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <button
                  onClick={() => handleRemoveQuestion(questionIndex)}
                  className="bg-red-500 hover:bg-red-600 mt-4 p-2 rounded text-white"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}

            <button
              onClick={handleAddQuestion}
              className="flex items-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
            >
              <FaPlus className="mr-2" />
              Añadir Pregunta
            </button>

            {/* Botón de Guardar solo en la pestaña de Preguntas */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={onClose}
                className="flex items-center bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded font-bold text-white"
              >
                <FaTimes className="mr-2" />
                Cancelar
              </button>
              <button
                onClick={handleSaveConfig}
                className="flex items-center bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded font-bold text-white"
              >
                <FaSave className="mr-2" />
                Guardar Configuración
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

TriviaForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  gameData: PropTypes.shape({
    config: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
};

export default TriviaForm;
