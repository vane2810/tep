import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaYoutube, FaEdit, FaPlus } from "react-icons/fa"; // Importar íconos de react-icons
import InstructionsModal from "../admin/contenido/instrutionModal";

const InstruccionesModal = ({ isOpen, onClose, instructions, onPlay, isAdmin, onSave, defaultInstructions }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState({ id: null, points_max: "0", points_min: "0" });
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (instructions && instructions.length > 0) {
      setCurrentPoints({
        id: instructions[0].id || null,
        points_max: instructions[0].points_max || "0",
        points_min: instructions[0].points_min || "0",
      });
    }
  }, [instructions]);

  if (!isOpen) {
    return null;
  }

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
    setVideoUrl("");
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCreateClick = () => {
    setIsEditing(true);
    setCurrentPoints({ id: null, points_max: "0", points_min: "0" }); // Limpiar los valores para crear nuevos puntos
  };

  const handleSavePoints = () => {
    onSave(currentPoints);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPoints((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const convertToEmbedUrl = (url) => {
    try {
      const urlObject = new URL(url);
      if (urlObject.hostname === "www.youtube.com" || urlObject.hostname === "youtube.com") {
        const videoId = urlObject.searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      } else if (urlObject.hostname === "youtu.be") {
        const videoId = urlObject.pathname.slice(1);
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return ""; // Si no es una URL válida de YouTube
    } catch (error) {
      console.error("URL inválida para el video:", url);
      return "";
    }
  };

  const handleVideoClick = (url) => {
    const embedUrl = convertToEmbedUrl(url);
    if (embedUrl) {
      setVideoUrl(embedUrl);
      setIsVideoOpen(true);
    } else {
      console.error("URL inválida o no es de YouTube:", url);
    }
  };

  const parseInstructions = (instructionText) => {
    // Convertir el texto de instrucciones en una lista, separando por comas o nuevas líneas
    if (!instructionText) return [];
    return instructionText
      .split(/[,\n]/) // Divide por comas o saltos de línea
      .map((step) => step.trim()) // Quita los espacios alrededor de cada instrucción
      .filter((step) => step.length > 0); // Elimina pasos vacíos
  };

  const instructionsList = parseInstructions(
    instructions?.[0]?.instructions || defaultInstructions?.instructions || ""
  );

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-60">
      <div className="relative bg-white shadow-2xl p-6 rounded-2xl w-full max-w-md transform transition-all scale-100 md:scale-105">
        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose}
          className="top-3 right-3 absolute font-bold text-2xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <h2 className="mb-3 font-bold text-2xl text-center text-green-600 wonder">
          Instrucciones del Juego
        </h2>

        {/* Imagen decorativa */}
        <div className="flex justify-center mb-4">
          <img
            src="/img/personajes/starly/starly_corona.webp"
            alt="Instrucciones"
            className="w-24 h-auto"
          />
        </div>

        {/* Puntuación Total y Mínima Personalizadas */}
        <div className="mb-4 text-center">
          <h3 className="text-green-700 text-lg wonder">
            Puntuación Total: {currentPoints.points_max || "0"} Estrellas
          </h3>
          <h3 className="text-lg text-red-600 wonder">
            Puntuación Mínima: {currentPoints.points_min || "0"} Estrellas
          </h3>
        </div>

        {/* Contenedor gris con instrucciones */}
        <div className="bg-gray-100 shadow-md p-4 rounded-lg yagora">
          <ol className="pl-6 list-decimal">
            {instructionsList.map((step, index) => (
              <li key={`instruction-step-${index}`} className="mb-2">
                {step}
              </li>
            ))}
          </ol>

          {/* Video asociado a las instrucciones */}
          {(instructions?.[0]?.video_url || defaultInstructions?.video_url) && (
            <div className="flex justify-end mt-2">
              <button
                onClick={() =>
                  handleVideoClick(instructions?.[0]?.video_url || defaultInstructions?.video_url)
                }
                className="flex items-center space-x-1 text-red-600 hover:text-red-800"
              >
                <FaYoutube className="w-5 h-5" />
                <span className="font-medium text-xs">Ver Video</span>
              </button>
            </div>
          )}

          {/* Ícono de edición o creación, solo para el administrador */}
          {isAdmin && (
            <div className="flex justify-end mt-4">
              {instructions && instructions.length > 0 ? (
                <button
                  onClick={handleEditClick}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleCreateClick}
                  className="text-green-600 hover:text-green-800"
                >
                  <FaPlus className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex justify-center gap-4 mt-6 text-lg wonder">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 shadow-md px-4 py-2 rounded-full font-semibold text-gray-800 transform transition-transform hover:scale-105"
          >
            Cerrar
          </button>
          <button
            onClick={onPlay}
            className="bg-green-500 hover:bg-green-600 shadow-md px-4 py-2 rounded-full font-bold text-white transform transition-transform hover:scale-105"
          >
            Jugar
          </button>
        </div>
      </div>

      {/* Modal para editar o crear los puntos máximos y mínimos */}
      {isEditing && (
        <InstructionsModal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          onSave={handleSavePoints}
          newInstruction={currentPoints}
          onInputChange={handleInputChange}
        />
      )}

      {isVideoOpen && videoUrl && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
          <div className="relative bg-white shadow-lg p-4 rounded-xl w-full max-w-2xl">
            <button
              onClick={handleCloseVideo}
              className="top-2 right-2 absolute font-bold text-2xl text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`${videoUrl}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1`}
                title="YouTube Video"
                className="rounded-lg w-full h-56 md:h-80"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

InstruccionesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  instructions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      instructions: PropTypes.string,
      points_max: PropTypes.string,
      points_min: PropTypes.string,
      video_url: PropTypes.string,
    })
  ).isRequired,
  onPlay: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  defaultInstructions: PropTypes.shape({
    instructions: PropTypes.string,
    video_url: PropTypes.string,
  }),
};

export default InstruccionesModal;
