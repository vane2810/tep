import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FaPlus,
  FaTrashAlt,
  FaArrowRight,
  FaSave,
  FaTimes,
  FaExclamationTriangle,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";

const EmparejarForm = ({ isOpen, onClose, gameData, onSave, isEditing, existingConfig }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [pares, setPares] = useState([]);
  const [points, setPoints] = useState(0);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, message: "", position: { x: 0, y: 0 } });

  useEffect(() => {
    if (isEditing && existingConfig) {
      try {
        const config = typeof existingConfig === "string" ? JSON.parse(existingConfig) : existingConfig;
        setPares(config.pares || []);
        setPoints(config.points || 0);
        setDescription(config.description || "");
      } catch (error) {
        console.error("Error al analizar la configuración existente:", error);
      }
    }
  }, [isEditing, existingConfig]);

  const handleAddPair = () => {
    setPares([...pares, { elemento1: "", elemento2: "" }]);
  };

  const handleRemovePair = (index) => {
    const updatedPares = pares.filter((_, i) => i !== index);
    setPares(updatedPares);
  };

  const handlePairChange = (index, field, value) => {
    const updatedPares = [...pares];
    if (field === "elemento1") {
      updatedPares[index].elemento1 = value;
    } else if (field === "elemento2") {
      updatedPares[index].elemento2 = value;
    }
    setPares(updatedPares);
  };

  const validateForm = () => {
    const newErrors = [];

    if (points <= 0) newErrors.push("Puntos totales deben ser mayores que 0.");
    if (pares.length === 0) newErrors.push("Debe agregar al menos un par.");
    if (!description.trim()) newErrors.push("Debe proporcionar una descripción del juego.");

    setErrors(newErrors);
    setShowErrorModal(newErrors.length > 0);
    return newErrors.length === 0;
  };

  const handleSaveConfig = () => {
    if (validateForm()) {
      const configData = {
        pares,
        points,
        description,
      };
      console.log("Datos de configuración guardados:", configData);
      onSave(configData);
      setShowSuccessModal(true);
    }
  };

  const isGeneralConfigComplete = () => {
    return points > 0 && description.trim().length > 0;
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
        <h2 className="mb-4 font-bold text-2xl text-center">{isEditing ? "Editar Emparejar" : "Configurar Emparejar"}</h2>

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
              activeTab === "pares"
                ? "border-b-4 border-purple-500 font-bold text-purple-700"
                : "text-gray-600 hover:text-purple-500"
            } transition-colors duration-200`}
            onClick={() => setActiveTab("pares")}
            disabled={!isGeneralConfigComplete()}
          >
            Pares
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
                  onClick={(e) => handleTooltip(e, "Deben ser la misma cantidad de puntos totales configurados en las instrucciones")}
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
                Descripción:
                <FaInfoCircle
                  className="inline ml-2 text-purple-500 cursor-pointer"
                  onClick={(e) => handleTooltip(e, "Descripción que explique qué es lo que se debe emparejar")}
                  onMouseLeave={hideTooltip}
                />
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-gray-300 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="3"
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
                  onClick={() => setActiveTab("pares")}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-bold text-white"
                >
                  <FaArrowRight className="mr-2" />
                  Siguiente
                </button>
              )}
            </div>
          </div>
        )}

        {/* Contenido de la pestaña Pares */}
        {activeTab === "pares" && (
          <div>
            <h3 className="mb-4 font-bold">Pares</h3>
            {pares.map((par, index) => (
              <div key={index} className="border-gray-300 shadow-sm mb-6 p-4 border rounded-lg">
                <label className="block mb-1 font-bold">Elemento 1:</label>
                <input
                  type="text"
                  value={par.elemento1}
                  onChange={(e) => handlePairChange(index, "elemento1", e.target.value)}
                  className="border-gray-300 mb-2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 w-full focus:outline-none"
                />

                <label className="block mb-1 font-bold">Elemento 2:</label>
                <input
                  type="text"
                  value={par.elemento2}
                  onChange={(e) => handlePairChange(index, "elemento2", e.target.value)}
                  className="border-gray-300 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 w-full focus:outline-none"
                />

                <button
                  onClick={() => handleRemovePair(index)}
                  className="bg-red-500 hover:bg-red-600 mt-4 p-2 rounded text-white"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}

            <button
              onClick={handleAddPair}
              className="flex items-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
            >
              <FaPlus className="mr-2" />
              Añadir Par
            </button>

            {/* Botón de Guardar solo en la pestaña de Pares */}
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

EmparejarForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  gameData: PropTypes.shape({
    config: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  existingConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default EmparejarForm;
