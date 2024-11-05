// Modal de Elección de Nivel
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NivelModal = ({ show, onClose, onLevelSelected }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  if (!show) return null;

  const levels = [
    { id: '1', color: 'bg-purple-600', hoverColor: 'hover:bg-purple-500', imgSrc: '/img/personajes/niveles/tierran1.png', text: 'Nivel 1', grade: '4° Grado', confirmColor: 'bg-purple-600 hover:bg-purple-500' },
    { id: '2', color: 'bg-indigo-600', hoverColor: 'hover:bg-indigo-500', imgSrc: '/img/personajes/niveles/marten2.png', text: 'Nivel 2', grade: '5° Grado', confirmColor: 'bg-indigo-600 hover:bg-indigo-500' },
    { id: '3', color: 'bg-teal-600', hoverColor: 'hover:bg-teal-500', imgSrc: '/img/personajes/niveles/jupitern3.png', text: 'Nivel 3', grade: '6° Grado', confirmColor: 'bg-teal-600 hover:bg-teal-500' }
  ];

  const handleSelectLevel = (levelId) => {
    setSelectedLevel(levelId);
  };

  const handleConfirmSelection = () => {
    if (selectedLevel !== null) {
      onLevelSelected(selectedLevel);
      onClose();
    }
  };

  // Obtener el color del botón "Confirmar" según el nivel seleccionado
  const confirmButtonColor = selectedLevel
    ? levels.find((level) => level.id === selectedLevel)?.confirmColor
    : 'bg-blue-500 hover:bg-green-600';

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 yagora">
      <div className="bg-white shadow-2xl p-8 md:p-12 rounded-lg w-11/12 md:w-4/5 max-w-4xl">
        <h2 className="mb-6 md:mb-8 font-bold text-2xl text-center text-gray-800 md:text-3xl">Selecciona tu nivel</h2>
        <div className="gap-6 md:gap-8 grid grid-cols-1 md:grid-cols-3">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => handleSelectLevel(level.id)}
              className={`p-6 rounded-lg flex flex-col items-center transition-transform transform hover:scale-105 shadow-md ${
                selectedLevel === level.id ? 'ring-4 ring-black' : ''
              } ${level.color} text-white ${level.hoverColor}`}
            >
              <img src={level.imgSrc} alt={`Nivel ${level.id}`} className="mb-4 w-16 h-16" />
              <span className="font-semibold text-center text-xl">
                {level.text} <br /> {level.grade}
              </span>
            </button>
          ))}
        </div>

        {selectedLevel && (
          <div className="flex justify-center mt-8 text-2xl">
            <button
              onClick={handleConfirmSelection}
              className={`${confirmButtonColor} px-8 py-3 rounded-lg text-white transform transition-transform hover:scale-105 shadow-lg`}
            >
              Confirmar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

NivelModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLevelSelected: PropTypes.func.isRequired,
};

export default NivelModal;
