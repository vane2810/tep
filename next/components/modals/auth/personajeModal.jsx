// Modal de elección de personaje 
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PersonajeModal = ({ show, onCharacterSelected }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null); 

  if (!show) return null;

  const characters = [
    { id: 1, name: 'Peppa', imgSrc: '/img/personajes/estudiante/peppa.webp' },
    { id: 2, name: 'Matatabi', imgSrc: '/img/personajes/estudiante/matatabi.webp' },
    { id: 3, name: 'Maomao', imgSrc: '/img/personajes/estudiante/maomao.webp' },
    { id: 4, name: 'Estrella', imgSrc: '/img/personajes/estudiante/estrella.webp' },
    { id: 5, name: 'Kurama', imgSrc: '/img/personajes/estudiante/kurama.webp' },
    { id: 6, name: 'Ternura', imgSrc: '/img/personajes/estudiante/ternura.webp' },
    { id: 7, name: 'Lala', imgSrc: '/img/personajes/estudiante/lala.webp' },
    { id: 8, name: 'Leen', imgSrc: '/img/personajes/estudiante/leen.webp' },
    { id: 9, name: 'Yarichi', imgSrc: '/img/personajes/estudiante/yarichi.webp' },
    { id: 10, name: 'Tify', imgSrc: '/img/personajes/estudiante/tify.webp' },
    { id: 11, name: 'Fifi', imgSrc: '/img/personajes/estudiante/fifi.webp' },
    { id: 12, name: 'Pandita', imgSrc: '/img/personajes/estudiante/pandita.webp' }
  ];

  const handleSelectCharacter = (characterId) => {
    setSelectedCharacter(characterId); 
  };

  const handleConfirmSelection = () => {
    if (selectedCharacter !== null) {
      onCharacterSelected(selectedCharacter); 
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4 sm:p-8 yagora">
      <div className="bg-white shadow-2xl my-4 p-6 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="mb-6 font-semibold text-2xl text-black text-center sm:text-3xl">Selecciona tu personaje</h2>
        <div className="gap-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {characters.map((character) => (
            <div
              key={character.id}
              onClick={() => handleSelectCharacter(character.id)}
              className={`cursor-pointer transform hover:scale-105 transition duration-300 ${selectedCharacter === character.id ? 'ring-4 ring-blue-500 rounded-full' : ''}`}
            >
              <img
                src={character.imgSrc}
                alt={character.name}
                className="shadow-lg mx-auto rounded-full w-20 sm:w-24 h-20 sm:h-24 object-contain"
              />
              <p className="mt-2 font-bold text-center text-lg sm:text-xl">{character.name}</p>
            </div>
          ))}
        </div>

        {/* Botón de confirmación - Solo aparece si se ha seleccionado un personaje */}
        {selectedCharacter && (
          <div className="mt-8 text-center text-xl">
            <button
              onClick={handleConfirmSelection}
              className="bg-blue-500 hover:bg-green-500 px-6 py-3 rounded font-bold text-white"
            >
              Confirmar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Definición de PropTypes
PersonajeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onCharacterSelected: PropTypes.func.isRequired,
};

export default PersonajeModal;
