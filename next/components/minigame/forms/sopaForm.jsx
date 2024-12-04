import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaTrashAlt, FaArrowRight, FaSave, FaTimes, FaExclamationTriangle, FaInfoCircle, FaCheckCircle } from "react-icons/fa";

const SopaLetrasForm = ({ isOpen, onClose, gameData, onSave, isEditing, existingConfig }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [words, setWords] = useState([]);
  const [points, setPoints] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);
  const [errors, setErrors] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, message: "", position: { x: 0, y: 0 } });

  useEffect(() => {
    if (isEditing && existingConfig) {
      try {
        const config = typeof existingConfig === "string" ? JSON.parse(existingConfig) : existingConfig;
        setWords(config.words || []);
        setPoints(config.points || 0);
        setTimeLimit(config.time_limit || 0);
      } catch (error) {
        console.error("Error al analizar la configuración existente:", error);
      }
    }
  }, [isEditing, existingConfig]);

  const handleAddWord = () => {
    setWords([...words, ""]);
  };

  const handleRemoveWord = (index) => {
    const updatedWords = words.filter((_, i) => i !== index);
    setWords(updatedWords);
  };

  const handleWordChange = (index, value) => {
    const updatedWords = [...words];
    updatedWords[index] = value;
    setWords(updatedWords);
  };

  const validateForm = () => {
    const newErrors = [];

    if (points <= 0) newErrors.push("Puntos totales deben ser mayores que 0.");
    if (timeLimit <= 0) newErrors.push("Tiempo para completar el juego debe ser mayor que 0 minutos.");
    if (words.length === 0) newErrors.push("Debe agregar al menos una palabra.");

    words.forEach((word, index) => {
      if (!word.trim()) newErrors.push(`La palabra #${index + 1} no puede estar vacía.`);
    });

    setErrors(newErrors);
    setShowErrorModal(newErrors.length > 0);
    return newErrors.length === 0;
  };

  const handleSaveConfig = () => {
    if (validateForm()) {
      const configData = {
        words,
        points,
        time_limit: timeLimit,
      };
      console.log("Datos de configuración guardados:", configData);
      onSave(configData);
      setShowSuccessModal(true);
    }
  };

  const isGeneralConfigComplete = () => {
    return points > 0 && timeLimit > 0;
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
        <h2 className="mb-4 font-bold text-2xl text-center">{isEditing ? "Editar Juego Sopa de Letras" : "Configurar Juego Sopa de Letras"}</h2>

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
          >
            Configuración General
          </button>
          <button
            className={`pb-2 ${
              activeTab === "words"
                ? "border-b-4 border-purple-500 font-bold text-purple-700"
                : "text-gray-600 hover:text-purple-500"
            } transition-colors duration-200`}
            onClick={() => setActiveTab("words")}
            disabled={!isGeneralConfigComplete()}
          >
            Palabras
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
                  onClick={(e) => handleTooltip(e, "Puntos que el jugador puede obtener si encuentra todas las palabras")}
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
                Tiempo para Completar el Juego (minutos):
                <FaInfoCircle
                  className="inline ml-2 text-purple-500 cursor-pointer"
                  onClick={(e) => handleTooltip(e, "Tiempo límite que el jugador tiene para completar el juego")}
                  onMouseLeave={hideTooltip}
                />
              </label>
              <input
                type="number"
                value={timeLimit === 0 ? "" : timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value) || 0)}
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
                  onClick={() => setActiveTab("words")}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-bold text-white"
                >
                  <FaArrowRight className="mr-2" />
                  Siguiente
                </button>
              )}
            </div>
          </div>
        )}

        {/* Contenido de la pestaña Palabras */}
        {activeTab === "words" && (
          <div>
            <h3 className="mb-4 font-bold">Palabras</h3>
            {words.map((word, index) => (
              <div key={index} className="border-gray-300 shadow-sm mb-6 p-4 border rounded-lg">
                <label className="block mb-1 font-bold">Palabra #{index + 1}:</label>
                <input
                  type="text"
                  value={word}
                  onChange={(e) => handleWordChange(index, e.target.value)}
                  className="border-gray-300 mb-2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 w-full focus:outline-none"
                />
                <button
                  onClick={() => handleRemoveWord(index)}
                  className="bg-red-500 hover:bg-red-600 mt-4 p-2 rounded text-white"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}

            <button
              onClick={handleAddWord}
              className="flex items-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
            >
              <FaPlus className="mr-2" />
              Añadir Palabra
            </button>

            {/* Botón de Guardar solo en la pestaña de Palabras */}
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

SopaLetrasForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  gameData: PropTypes.shape({
    config: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  existingConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default SopaLetrasForm;
