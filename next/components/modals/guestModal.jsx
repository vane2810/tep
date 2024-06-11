import React from 'react';

const GuestModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-4">¡Hola!</h2>
        <p className="mb-6">Para tener acceso a esta funcionalidad, debes crear una cuenta o iniciar sesión.</p>
        <div className="flex justify-around">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-200">
            Cerrar
          </button>
          <a 
            href="/adm/login" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200">
            Iniciar sesión
          </a>
          <a 
            href="/adm/registro" 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-200">
            Registrarse
          </a>
        </div>
      </div>
    </div>
  );
};

export default GuestModal;

