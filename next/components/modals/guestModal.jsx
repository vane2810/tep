import React from 'react';

const GuestModal = ({ show }) => {
  if (!show) return null;

  const handleClose = () => {
    window.location.href = '/'; 
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 story">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md text-center">
        <h2 className="mb-4 font-semibold text-3xl">¡Hola!</h2>
        <img src="/img/personajes/starly/starly.png" className="mx-auto mb-4 w-20 h-18" alt="Starly" />

        <p className="mb-6">Para tener acceso a esta funcionalidad, debes crear una cuenta o iniciar sesión.</p>
        <div className="flex justify-around">
          <button 
            onClick={handleClose} 
            className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded text-white transition duration-200">
            Cerrar
          </button>
          <a 
            href="/auth/login" 
            className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white transition duration-200">
            Iniciar sesión
          </a>
          <a 
            href="/auth/register" 
            className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded text-white transition duration-200">
            Registrarse
          </a>
        </div>
      </div>
    </div>
  );
};

export default GuestModal;
