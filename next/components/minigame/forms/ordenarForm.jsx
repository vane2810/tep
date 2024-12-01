// Formulario para insertar datos Juego - Ordenar Elementos
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaTrashAlt, FaArrowRight, FaSave, FaTimes, FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from "react-icons/fa";

const OrdenarElementosForm = ({ isOpen, onClose, gameData, onSave, isEditing, existingConfig }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [elements, setElements] = useState([]);
  const [points, setPoints] = useState(0);
  const [pointsMin, setPointsMin] = useState(0);
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, message: "", position: { x: 0, y: 0 } });

  useEffect(() => {
    if (isEditing && existingConfig) {
      try {
        const config = typeof existingConfig === 'string' ? JSON.parse(existingConfig) : existingConfig;
        setElements(config.elements || []);
        setPoints(config.points || 0);
        setPointsMin(config.points_min || 0);
        setInstructions(config.instructions || "");
      } catch (error) {
        console.error("Error al analizar la configuración existente:", error);
      }
    }
  }, [isEditing, existingConfig]);

  const handleAddElement = () => {
    setElements([...elements, ""]);
  };

  const handleRemoveElement = (index) => {
    const updatedElements = elements.filter((_, i) => i !== index);
    setElements(updatedElements);
  };

  const handleElementChange = (index, value) => {
    const updatedElements = [...elements];
    updatedElements[index] = value;
    setElements(updatedElements);
  };

  const validateForm = () => {
    const newErrors = [];

    if (points <= 0) newErrors.push("Puntos totales deben ser mayores que 0.");
    if (pointsMin <= 0) newErrors.push("Puntos mínimos para aprobar deben ser mayores que 0.");
    if (elements.length < 2) newErrors.push("Debe agregar al menos dos elementos para ordenar.");
    if (instructions.trim() === "") newErrors.push("Debe proporcionar una indicación para la actividad.");

    setErrors(newErrors);
    setShowErrorModal(newErrors.length > 0);
    return newErrors.length === 0;
  };

  const handleSaveConfig = () => {
    if (validateForm()) {
      const configData = {
        elements,
        points,
        points_min: pointsMin,
        instructions,
      };
      console.log("Datos de configuración guardados:", configData);
      onSave(configData);
      setShowSuccessModal(true);
    }
  };

  const isGeneralConfigComplete = () => {
    // Verificar solo si puntos, puntos mínimos e instrucciones tienen valores correctos
    return points > 0 && pointsMin > 0 && instructions.trim() !== "";
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
        <h2 className="mb-4 font-bold text-2xl text-center">{isEditing ? "Editar Ordenar Elementos" : "Configurar Ordenar Elementos"}</h2>

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
              activeTab === "elements"
                ? "border-b-4 border-purple-500 font-bold text-purple-700"
                : "text-gray-600 hover:text-purple-500"
            } transition-colors duration-200`}
            onClick={() => setActiveTab("elements")}
            disabled={!isGeneralConfigComplete()}
          >
            Elementos
          </button>
        </div>

        {/* Contenido de la pestaña Configuración General */}
        {activeTab === "general" && (
          <div>
            <div className="relative mb-4">
              <label className="block mb-1 font-bold">
                Indicaciones de la Actividad:
                <FaInfoCircle
                  className="inline ml-2 text-purple-500 cursor-pointer"
                  onClick={(e) => handleTooltip(e, "Proporcione instrucciones claras sobre lo que se espera que hagan los jugadores en este juego.")}
                  onMouseLeave={hideTooltip}
                />
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="border-gray-300 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
            </div>

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
                Puntos Mínimos para Aprobar:
                <FaInfoCircle
                  className="inline ml-2 text-purple-500 cursor-pointer"
                  onClick={(e) => handleTooltip(e, "Deben ser la misma cantidad de puntos mínimos configurados en las instrucciones")}
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
                  onClick={() => setActiveTab("elements")}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-bold text-white"
                >
                  <FaArrowRight className="mr-2" />
                  Siguiente
                </button>
              )}
            </div>
          </div>
        )}

        {/* Contenido de la pestaña Elementos */}
        {activeTab === "elements" && (
          <div>
            <h3 className="mb-4 font-bold">Elementos para Ordenar</h3>
            {elements.map((element, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  type="text"
                  value={element}
                  onChange={(e) => handleElementChange(index, e.target.value)}
                  className="border-gray-300 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 w-full focus:outline-none"
                />
                <button
                  onClick={() => handleRemoveElement(index)}
                  className="bg-red-500 hover:bg-red-600 ml-2 p-2 rounded text-white"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}

            <button
              onClick={handleAddElement}
              className="flex items-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
            >
              <FaPlus className="mr-2" />
              Añadir Elemento
            </button>

            {/* Botón de Guardar solo en la pestaña de Elementos */}
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

OrdenarElementosForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  gameData: PropTypes.shape({
    config: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  existingConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default OrdenarElementosForm;
