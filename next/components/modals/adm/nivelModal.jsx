import React from 'react';

const NivelModal = ({ show, onClose, onLevelSelected }) => {
  if (!show) return null;

  const handleSelectLevel = (levelId) => {
    onLevelSelected(levelId);
    onClose(); // Cierra el modal después de seleccionar el nivel
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Selecciona tu nivel</h2>
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => handleSelectLevel('1')}
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
          >
            Nivel 1
          </button>
          <button
            onClick={() => handleSelectLevel('2')}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
          >
            Nivel 2
          </button>
          <button
            onClick={() => handleSelectLevel('3')}
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
          >
            Nivel 3
          </button>
        </div>
      </div>
    </div>
  );
};

export default NivelModal;
