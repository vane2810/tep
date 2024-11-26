// components/Modal.js
import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, content, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md yagora">
      <div className="relative z-10 border-4 bg-gradient-to-r from-purple-200 to-blue-200 shadow-2xl p-6 border-black rounded-2xl w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">

        {/* Botón de cierre estilizado */}
        <button
          onClick={onClose}
          className="top-4 right-4 absolute font-bold text-2xl text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          &times;
        </button>

        <div className="text-center">
          {/* Título y contenido del modal */}
          {content && (
            <>
              <h2 className="mb-4 font-bold text-2xl text-blue-900">{content.title}</h2>

              {/* Imagen dinámica */}
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={content.title}
                  className="mx-auto mb-4 rounded-full w-16 h-16"
                />
              )}

              <p>{content.description}</p>

              {content.sounds && (
                <ul className="mt-4">
                  {content.sounds.map((sound, index) => (
                    <li key={index} className="mb-4">
                      <h3 className="font-bold text-lg">{sound.name}</h3>
                      <p>{sound.description}</p>
                      <audio controls className="mt-2 w-full">
                        <source src={sound.audioUrl} type="audio/mpeg" />
                        Tu navegador no soporta la reproducción de audio.
                      </audio>
                    </li>
                  ))}
                </ul>
              )}
              
              {content.steps && (
                <ul className="mt-4 list-decimal list-inside">
                  {content.steps.map((step, index) => (
                    <li key={index} className="text-gray-600">{step}</li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Definición de PropTypes para Modal
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    sounds: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        audioUrl: PropTypes.string,
      })
    ),
    steps: PropTypes.arrayOf(PropTypes.string),
  }),
  imageSrc: PropTypes.string,
};

export default Modal;
