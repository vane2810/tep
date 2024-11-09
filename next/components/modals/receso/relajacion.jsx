// components/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, content, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-gradient-to-r from-purple-200 to-blue-200 rounded-2xl p-6 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 z-10 shadow-2xl border-4 border-black">
        
        {/* Botón de cierre estilizado */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold focus:outline-none"
        >
          &times;
        </button>
        
        <div className="text-center">
          {/* Título y contenido del modal */}
          {content && (
            <>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">{content.title}</h2>
              
              {/* Imagen dinámica */}
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={content.title}
                  className="w-16 h-16 mx-auto rounded-full mb-4"
                />
              )}
              
              <p>{content.description}</p>
              {content.sounds && (
                <ul className="mt-4">
                  {content.sounds.map((sound, index) => (
                    <li key={index} className="mb-4">
                      <h3 className="text-lg font-bold">{sound.name}</h3>
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
                <ul className="list-decimal list-inside mt-4">
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

export default Modal;
