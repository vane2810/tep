// Modal reutilizable para el avance del contenido a los juegos
import React from 'react';
import Link from 'next/link';

const Modal = ({ isOpen, onClose, subjectName, continueLink }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      {/* Contenedor del modal */}
      <div className="relative w-auto max-w-lg mx-auto my-6 bg-white rounded-lg shadow-lg">
        <div className="relative flex flex-col w-full p-6 bg-white border-0 rounded-lg outline-none focus:outline-none">
          <div className="flex items-center justify-center border-b border-solid border-gray-200 rounded-t">
            <h3 className="text-xl font-semibold text-center w-full">
              ¡Felicidades! Has completado la lección de: {subjectName}
            </h3>
          </div>
          <div className="relative p-6 flex-auto text-center">
            {/* Imagen ade starly */}
            <img 
              src='/img/personajes/starly/leccioncompleta.png'
              alt='Personaje de felicitación'
              className='w-22 h-auto mx-auto mb-4'
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
