// Modal de elección de personaje 
import React, { useState } from 'react';

const PersonajeModal = ({ show, onCharacterSelected }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Estado para la selección actual

  if (!show) return null;

  const handleSelectCharacter = (characterId) => {
    setSelectedCharacter(characterId); // Almacena la selección del personaje
  };

  const handleConfirmSelection = () => {
    if (selectedCharacter !== null) {
      onCharacterSelected(selectedCharacter); // Confirma la selección
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-4xl story">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-700">Selecciona tu personaje</h2>
        <div className="grid grid-cols-4 gap-6">

          {/* PERSONAJE 1 - PEPPA */}
          <div 
            onClick={() => handleSelectCharacter(1)} 
            className={`cursor-pointer transform hover:scale-105 transition duration-300 ${selectedCharacter === 1 ? 'ring-4 ring-blue-500 rounded-full' : ''}`}
          >
            <img
              src="/img/personajes/estudiante/peppa.png" 
              alt="Peppa"
              className="w-24 h-24 mx-auto object-contain rounded-full shadow-lg"
            />
            <p className="text-center mt-2 font-bold text-xl">Peppa</p>
          </div>

          {/* PERSONAJE 2 - MATATABI */}
          <div 
            onClick={() => handleSelectCharacter(2)} 
            className={`cursor-pointer transform hover:scale-105 transition duration-300 ${selectedCharacter === 2 ? 'ring-4 ring-blue-500 rounded-full' : ''}`}
          >
            <img
              src="/img/personajes/estudiante/matatabi.png" 
              alt="Matatabi"
              className="w-24 h-24 mx-auto object-contain rounded-full shadow-lg"
            />
            <p className="text-center mt-2 font-bold text-xl">Matatabi</p>
          </div>

          {/* PERSONAJE 3 - MAOMAO */}
          <div 
            onClick={() => handleSelectCharacter(3)} 
            className={`cursor-pointer transform hover:scale-105 transition duration-300 ${selectedCharacter === 3 ? 'ring-4 ring-blue-500 rounded-full' : ''}`}
          >
            <img
              src="/img/personajes/estudiante/maomao.png" 
              alt="Maomao"
              className="w-24 h-24 mx-auto object-contain rounded-full shadow-lg"
            />
            <p className="text-center mt-2 font-bold text-xl">Maomao</p>
          </div>

          {/* PERSONAJE 4 - ESTRELLA */}
          <div 
            onClick={() => handleSelectCharacter(4)} 
            className={`cursor-pointer transform hover:scale-105 transition duration-300 ${selectedCharacter === 4 ? 'ring-4 ring-blue-500 rounded-full' : ''}`}
          >
            <img
              src="/img/personajes/estudiante/estrella.png" 
              alt="Estrella"
              className="w-24 h-24 mx-auto object-contain rounded-full shadow-lg"
            />
            <p className="text-center mt-2 font-bold text-xl">Estrella</p>
          </div>

          {/* PERSONAJE 5 - KURAMA */}
          <div 
            onClick={() => handleSelectCharacter(5)} 
            className={`cursor-pointer transform hover:scale-105 transition duration-300 ${selectedCharacter === 5 ? 'ring-4 ring-blue-500 rounded-full' : ''}`}
          >
            <img
              src="/img/personajes/estudiante/kurama.png" 
              alt="Kurama"
              className="w-24 h-24 mx-auto object-contain rounded-full shadow-lg"
            />
            <p className="text-center mt-2 font-bold text-xl">Kurama</p>
          </div>

          {/* PERSONAJE 6 - TERNURA */}
          <div 
            onClick={() => handleSelectCharacter(6)} 
            className={`cursor-pointer transform hover:scale-105 transition duration-300 ${selectedCharacter === 6 ? 'ring-4 ring-blue-500 rounded-full' : ''}`}
          >
            <img
              src="/img/personajes/estudiante/ternura.png" 
              alt="Ternura"
              className="w-24 h-24 mx-auto object-contain rounded-full shadow-lg"
            />
            <p className="text-center mt-2 font-bold text-xl">Ternura</p>
          </div>

          {/* PERSONAJE 7 - LALA */}
          <div 
            onClick={() => handleSelectCharacter(7)} 
            className={`cursor-pointer transform hover:scale-105 transition duration-300 ${selectedCharacter === 7 ? 'ring-4 ring-blue-500 rounded-full' : ''}`}
          >
            <img
              src="/img/personajes/estudiante/lala.png" 
              alt="Lala"
              className="w-24 h-24 mx-auto object-contain rounded-full shadow-lg"
            />
            <p className="text-center mt-2 font-bold text-xl">Lala</p>
          </div>

          {/* PERSONAJE 8 - LEEN */}
          <div 
            onClick={() => handleSelectCharacter(8)} 
            className={`cursor-pointer transform hover:scale-105 transition duration-300 ${selectedCharacter === 8 ? 'ring-4 ring-blue-500 rounded-full'  : ''}`}
          >
            <img
              src="/img/personajes/estudiante/leen.png" 
              alt="Leen"
              className="w-24 h-24 mx-auto object-contain rounded-full shadow-lg"
            />
            <p className="text-center mt-2 font-bold text-xl">Leen</p>
          </div>

          {/* PERSONAJE 9 - YARICHI */}
          <div 
            onClick={() => handleSelectCharacter(9)} 
            className={`cursor-pointer transform hover:scale-105 transition duration-300 ${selectedCharacter === 9 ? 'ring-4 ring-blue-500 rounded-full' : ''}`}
          >
            <img
              src="/img/personajes/estudiante/yarichi.png" 
              alt="Yarichi"
              className="w-24 h-24 mx-auto object-contain rounded-full shadow-lg"
            />
            <p className="text-center mt-2 font-bold text-xl">Yarichi</p>
          </div>

          {/* PERSONAJE 10 - TIFY */}
          <div 
            onClick={() => handleSelectCharacter(10)} 
            className={`cursor-pointer transform hover:scale-105 transition duration-300 ${selectedCharacter === 10 ? 'ring-4 ring-blue-500 rounded-full' : ''}`}
          >
            <img
              src="/img/personajes/estudiante/tify.png" 
              alt="Tify"
              className="w-24 h-24 mx-auto object-contain rounded-full shadow-lg"
            />
            <p className="text-center mt-2 font-bold text-xl">Tify</p>
          </div>

          {/* PERSONAJE 11 - FIFI */}
          <div 
            onClick={() => handleSelectCharacter(11)} 
            className={`cursor-pointer transform hover:scale-105 transition duration-300 ${selectedCharacter === 11 ? 'ring-4 ring-blue-500 rounded-full' : ''}`}
          >
            <img
              src="/img/personajes/estudiante/fifi.png" 
              alt="Fifi"
              className="w-24 h-24 mx-auto object-contain rounded-full shadow-lg"
            />
            <p className="text-center mt-2 font-bold text-xl">Fifi</p>
          </div>

          {/* PERSONAJE 12 - PANDITA */}
          <div 
            onClick={() => handleSelectCharacter(12)} 
            className={`cursor-pointer transform hover:scale-105 transition duration-300 ${selectedCharacter === 12 ? 'ring-4 ring-blue-500 rounded-full' : ''}`}
          >
            <img
              src="/img/personajes/estudiante/pandita.png" 
              alt="Pandita"
              className="w-24 h-24 mx-auto object-contain rounded-full shadow-lg"
            />
            <p className="text-center mt-2 font-bold text-xl">Pandita</p>
          </div>
        </div>

        {/* Botón de confirmación */}
        <div className="mt-10 text-center text-2xl">
          <button
            onClick={handleConfirmSelection}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-green-500"
            disabled={selectedCharacter === null} // Deshabilitar si no hay selección
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonajeModal;

