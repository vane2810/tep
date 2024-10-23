//Modal para el registro
import React from 'react';
import Link from 'next/link';

export default function RegistroModal({ onClose, message, isError }) {
  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 text-2xl">
      <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-md text-center story">
        {isError ? (
          <div>
            <p className="mb-4 font-bold text-lg text-red-600">Error al registrar:</p>
            <img
              src="/img/personajes/starly/starly.png"
              alt="Error"
              className="mx-auto mb-4 w-auto h-40"
            />
            <p className="mb-4">{message}</p>
            <Link href="/" className="block mb-4 font-semibold text-blue-500 hover:underline">
              Volver al Inicio
            </Link>
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white transition duration-200"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4 font-bold text-green-600 text-lg">¡Registro exitoso!</p>
            <img
              src="/img/personajes/starly/starly.png"
              alt="Registro exitoso"
              className="mx-auto mb-4 w-auto h-28"
            />
            <Link href="/auth/login">
              <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white transition duration-200">
                Continuar
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

