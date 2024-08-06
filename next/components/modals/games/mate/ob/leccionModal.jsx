import React from 'react';
import Link from 'next/link';

const Modal = ({ isOpen, onClose, subjectName, continueLink }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      {/* Contenedor del modal */}
      <div className="relative w-auto max-w-lg mx-auto my-6 bg-white rounded-lg shadow-lg">
        <div className="relative flex flex-col w-full p-6 bg-white border-0 rounded-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between border-b border-solid border-gray-200 rounded-t">
            <h3 className="text-xl font-semibold text-center w-full">
              ¡Felicidades! Has completado la lección de: {subjectName}
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
              aria-label="Cerrar"
            >
              <span className="text-black h-6 w-6 text-3xl block outline-none focus:outline-none">×</span>
            </button>
          </div>
          <div className="relative p-6 flex-auto text-center">
            {/* Imagen ajustada */}
            <img 
              src='/img/personajes/donkey/leccioncompleta.png'
              alt='Personaje de felicitación'
              className='w-34 h-auto mx-auto mb-4'
            />
            <p>Ahora puedes continuar o revisar la lección de nuevo</p>
          </div>
          <div className="flex space-x-4 justify-center">
            <button 
              className="bg-blue-500 text-white text-xl py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              onClick={onClose}
            >
              Cerrar
            </button>
            <Link href={continueLink}>
              <button 
                className="bg-green-500 text-white text-xl py-2 px-4 rounded hover:bg-green-700 transition duration-300"
              >
                Continuar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
