import React from 'react';

const PersonajeModal = ({ show, onClose, onCharacterSelected }) => {
  if (!show) return null;

  const handleSelectCharacter = (characterId) => {
    onCharacterSelected(characterId);
    onClose(); // Cierra el modal después de seleccionar el personaje
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Selecciona tu personaje</h2>
        <div className="flex justify-around space-x-4">
          <div onClick={() => handleSelectCharacter(1)} className="cursor-pointer">
            <img
              src="\img\personajes\estudiante\saula.png" // Ruta de la imagen del personaje 1
              alt="Personaje 1"
              className="w-24 h-24 object-contain rounded-full hover:shadow-lg transition"
            />
            <p className="text-center mt-2">Personaje 1</p>
          </div>
          <div onClick={() => handleSelectCharacter(2)} className="cursor-pointer">
            <img
              src="\img\personajes\estudiante\matatabi.png" // Ruta de la imagen del personaje 2
              alt="Personaje 2"
              className="w-24 h-24 object-contain rounded-full hover:shadow-lg transition"
            />
            <p className="text-center mt-2">Personaje 2</p>
          </div>
          <div onClick={() => handleSelectCharacter(3)} className="cursor-pointer">
            <img
              src="/img/personajes/personaje3.png" // Ruta de la imagen del personaje 3
              alt="Personaje 3"
              className="w-24 h-24 object-contain rounded-full hover:shadow-lg transition"
            />
            <p className="text-center mt-2">Personaje 3</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 text-red-500 hover:text-red-700 text-center w-full"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default PersonajeModal;
