// Modal de alerta de inicio de sesión
import React from 'react';

const LoginModal = ({ show, message, type, onClose, redirectTo }) => {
  const handleContinue = () => {
    if (type === 'success' && redirectTo) {
      window.location.href = redirectTo;
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-2xl">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative text-center story">
        {type === 'error' ? (
          <div>
            <p className="text-lg font-bold text-red-600 mb-4">Error al iniciar sesión:</p>
            <img
              src="/img/personajes/starly/starly.png"
              alt="Error"
              className="h-40 w-auto mx-auto mb-4"
            />
            <p className="mb-4">{message}</p>
            <button
              onClick={handleContinue}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Intentar de nuevo
            </button>
          </div>
        ) : (
          <div>
            <p className="text-lg font-bold text-green-600 mb-4">¡Inicio de sesión exitoso!</p>
            <img
              src="/img/personajes/starly/starly.png"
              alt="Inicio de sesión exitoso"
              className="h-28 w-auto mx-auto mb-4"
            />
            <button 
              onClick={handleContinue}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
