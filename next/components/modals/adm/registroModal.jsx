import React from 'react';
import Link from 'next/link';

export default function RegistroModal({ onClose, message, isError }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative text-center">
        <button 
          className="absolute top-2 right-2 text-gray-600 text-xl focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        {isError ? (
          <div>
            <p className="text-lg font-bold text-red-600 mb-4">Error al registrar:</p>
            <img 
              src="/img/page/starly.png" 
              alt="Error" 
              className="h-56 w-auto mx-auto mb-4"
            />
            <p className="mb-4">{message}</p>
            <Link href="/" className="text-blue-500 font-semibold hover:underline mb-4 block">
              Volver al Inicio
            </Link>
            <button 
              onClick={onClose} 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <div>
            <p className="text-lg font-bold text-green-600 mb-4">¡Registro exitoso!</p>
            <img 
              src="/img/page/starly.png" 
              alt="Registro exitoso" 
              className="h-30 w-auto mx-auto mb-4"
            />
            <Link href="/adm/login" className="text-blue-500 font-semibold hover:underline mb-4 block">
              Continuar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
