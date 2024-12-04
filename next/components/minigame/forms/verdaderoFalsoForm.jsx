import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FaPlus,
  FaTrashAlt,
  FaArrowRight,
  FaSave,
  FaTimes,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

const VerdaderoFalsoForm = ({ isOpen, onClose, gameData, onSave, isEditing, existingConfig }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [questions, setQuestions] = useState([]);
  const [pointsTotal, setPointsTotal] = useState(0);
  const [pointsPerQuestion, setPointsPerQuestion] = useState(0);
  const [pointsMin, setPointsMin] = useState(0);
  const [errors, setErrors] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (isEditing && existingConfig) {
      try {
        const config = typeof existingConfig === "string" ? JSON.parse(existingConfig) : existingConfig;
        setQuestions(config.questions || []);
        setPointsTotal(config.points_total || 0);
        setPointsPerQuestion(config.points_per_question || 0);
        setPointsMin(config.points_min || 0);
      } catch (error) {
        console.error("Error al analizar la configuración existente:", error);
      }
    }
  }, [isEditing, existingConfig]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { texto: "", respuesta: "verdadero" }]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const validateForm = () => {
    const newErrors = [];

    if (pointsTotal <= 0) newErrors.push("Puntos totales deben ser mayores que 0.");
    if (pointsPerQuestion <= 0) newErrors.push("Puntos por pregunta deben ser mayores que 0.");
    if (pointsMin <= 0) newErrors.push("Puntos mínimos para aprobar deben ser mayores que 0.");
    if (questions.length === 0) newErrors.push("Debe agregar al menos una pregunta.");

    setErrors(newErrors);
    setShowErrorModal(newErrors.length > 0);
    return newErrors.length === 0;
  };

  const handleSaveConfig = () => {
    if (validateForm()) {
      const configData = {
        questions,
        points_total: pointsTotal,
        points_per_question: pointsPerQuestion,
        points_min: pointsMin,
      };
      console.log("Datos de configuración guardados:", configData);
      onSave(configData);
      setShowSuccessModal(true);
    }
  };

  const isGeneralConfigComplete = () => {
    return pointsTotal > 0 && pointsPerQuestion > 0 && pointsMin > 0;
  };

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 yagora">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-3xl max-h-screen text-black overflow-auto">
        <h2 className="mb-4 font-bold text-2xl text-center">
          {isEditing ? "Editar Verdadero/Falso" : "Configurar Verdadero/Falso"}
        </h2>

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
              activeTab === "questions"
                ? "border-b-4 border-purple-500 font-bold text-purple-700"
                : "text-gray-600 hover:text-purple-500"
            } transition-colors duration-200`}
            onClick={() => setActiveTab("questions")}
            disabled={!isGeneralConfigComplete()}
          >
            Preguntas
          </button>
        </div>

        {/* Contenido de la pestaña Configuración General */}
        {activeTab === "general" && (
          <div>
            <div className="relative mb-4">
              <label className="block mb-1 font-bold">Puntos Totales del Juego:</label>
              <input
                type="number"
                value={pointsTotal === 0 ? "" : pointsTotal}
                onChange={(e) => setPointsTotal(Number(e.target.value) || 0)}
                className="border-gray-300 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="relative mb-4">
              <label className="block mb-1 font-bold">Puntos por Pregunta:</label>
              <input
                type="number"
                value={pointsPerQuestion === 0 ? "" : pointsPerQuestion}
                onChange={(e) => setPointsPerQuestion(Number(e.target.value) || 0)}
                className="border-gray-300 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="relative mb-4">
              <label className="block mb-1 font-bold">Puntos Mínimos para Aprobar:</label>
              <input
                type="number"
                value={pointsMin === 0 ? "" : pointsMin}
                onChange={(e) => setPointsMin(Number(e.target.value) || 0)}
                className="border-gray-300 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

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
                  onClick={() => setActiveTab("questions")}
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
        {activeTab === "questions" && (
          <div>
            <h3 className="mb-4 font-bold">Preguntas</h3>
            {questions.map((question, index) => (
              <div key={index} className="border-gray-300 shadow-sm mb-6 p-4 border rounded-lg">
                <label className="block mb-1 font-bold">Pregunta:</label>
                <input
                  type="text"
                  value={question.texto}
                  onChange={(e) => handleQuestionChange(index, "texto", e.target.value)}
                  className="border-gray-300 mb-2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 w-full focus:outline-none"
                />

                <label className="block mb-1 font-bold">Respuesta:</label>
                <select
                  value={question.respuesta}
                  onChange={(e) => handleQuestionChange(index, "respuesta", e.target.value)}
                  className="border-gray-300 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 w-full focus:outline-none"
                >
                  <option value="verdadero">Verdadero</option>
                  <option value="falso">Falso</option>
                </select>

                <button
                  onClick={() => handleRemoveQuestion(index)}
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

VerdaderoFalsoForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  gameData: PropTypes.shape({
    config: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  existingConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default VerdaderoFalsoForm;
