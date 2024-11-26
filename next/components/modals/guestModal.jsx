import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const GuestModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-md text-center">
        {/* Botón cerrar (X) */}
        <button
          onClick={onClose}
          className="top-2 right-2 absolute text-gray-500 hover:text-gray-800 transition duration-200"
          aria-label="Cerrar"
        >
          <AiOutlineClose className="w-6 h-6" />
        </button>

        <h2 className="mb-4 font-semibold text-3xl">¡Hola!</h2>
        <img src="/img/personajes/starly/starly.png" className="mx-auto mb-4 w-20 h-18" alt="Starly" />

        <p className="mb-6">Para acceder a esta funcionalidad, por favor inicia sesión o regístrate.</p>

        {/* Botones de Iniciar sesión y Registro */}
        <div className="flex justify-around">
          <a
            href="/auth/login"
            className="bg-blue-500 hover:bg-blue-700 px-6 py-2 rounded text-white transition duration-200"
          >
            Iniciar sesión
          </a>
          <a
            href="/auth/register"
            className="bg-green-500 hover:bg-green-700 px-6 py-2 rounded text-white transition duration-200"
          >
            Registrarse
          </a>
        </div>
      </div>
    </div>
  );
};

export default GuestModal;
