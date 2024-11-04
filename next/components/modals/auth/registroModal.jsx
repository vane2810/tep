// Modal para el registro
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function RegistroModal({ onClose, message, isError }) {
  const title = isError ? 'Error al registrar:' : '¡Registro exitoso!';
  const icon = isError ? <FiAlertCircle className="mr-2" size={24} /> : <FiCheckCircle className="mr-2" size={24} />;
  const titleColor = isError ? 'text-red-600' : 'text-green-600';
  const imageSrc = isError ? '/img/personajes/starly/starly_triste.png' : '/img/personajes/starly/starly2.png';
  const buttonColor = isError ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600';

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 text-2xl">
      <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-md text-center transform transition-transform duration-300 scale-100">
        <p className={`flex justify-center items-center mb-4 font-bold text-lg ${titleColor}`}>
          {icon} {title}
        </p>
        <img src={imageSrc} alt={title} className="mx-auto mb-4 w-auto h-36" />
        {isError ? (
          <>
            <p className="mb-4 text-gray-700">{message}</p>
            <Link href="/" className="block mb-4 font-semibold text-blue-500 hover:underline">
              Volver al Inicio
            </Link>
            <button
              onClick={onClose}
              className={`${buttonColor} px-4 py-2 rounded text-white transition duration-200`}
            >
              Cerrar
            </button>
          </>
        ) : (
          <Link href="/auth/login">
            <button className={`${buttonColor} px-4 py-2 rounded-lg text-white transition duration-200`}>
              Continuar
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

RegistroModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
};
