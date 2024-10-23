// Modal de Elección de Nivel
import React, { useState } from 'react';

const NivelModal = ({ show, onClose, onLevelSelected }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  if (!show) return null;

  const handleSelectLevel = (levelId) => {
    setSelectedLevel(levelId); 
  };

  const handleConfirmSelection = () => {
    if (selectedLevel !== null) {
      onLevelSelected(selectedLevel); 
      onClose(); 
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-2xl p-12 w-3/5 max-w-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 story">Selecciona tu nivel</h2>
        <div className="flex justify-around story">
          <button
            onClick={() => handleSelectLevel('1')}
            className={`p-6 rounded-full flex flex-col items-center transition-transform transform hover:scale-110 ${
              selectedLevel === '1' ? 'ring-4 ring-blue-500' : ''
            } bg-purple-500 text-white hover:bg-purple-600`}
          >
            <img src="/img/personajes/niveles/tierran1.png" alt="Nivel 1" className="h-16 w-16 mb-2" />
            <span className="text-xl">Nivel 1 <br/> 4° Grado</span>
          </button>
          <button
            onClick={() => handleSelectLevel('2')}
            className={`p-6 rounded-full flex flex-col items-center transition-transform transform hover:scale-110 ${
              selectedLevel === '2' ? 'ring-4 ring-blue-500' : ''
            } bg-indigo-500 text-white hover:bg-indigo-600`}
          >
            <img src="/img/personajes/niveles/marten2.png" alt="Nivel 2" className="h-16 w-16 mb-2" />
            <span className="text-xl">Nivel 2 <br/> 5° Grado</span>
          </button>
          <button
            onClick={() => handleSelectLevel('3')}
            className={`p-6 rounded-full flex flex-col items-center transition-transform transform hover:scale-110 ${
              selectedLevel === '3' ? 'ring-4 ring-blue-500' : ''
            } bg-teal-500 text-white hover:bg-teal-600`}
          >
            <img src="/img/personajes/niveles/jupitern3.png" alt="Nivel 3" className="h-16 w-16 mb-2" />
            <span className="text-xl">Nivel 3 <br/> 6° Grado</span>
          </button>
        </div>

        {selectedLevel && (
          <div className="mt-8 flex justify-center story text-xl">
            <button
              onClick={handleConfirmSelection}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105"
            >
              Confirmar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NivelModal;
