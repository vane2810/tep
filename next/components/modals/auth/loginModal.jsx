// Modal de alerta de inicio de sesión
import React from 'react';
import PropTypes from 'prop-types';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const LoginModal = ({ show, message, type, onClose, redirectTo }) => {
  if (!show) return null;

  const isError = type === 'error';
  const icon = isError ? <FiAlertCircle className="mr-2" size={24} /> : <FiCheckCircle className="mr-2" size={24} />;
  const title = isError ? 'Error al iniciar sesión' : '¡Inicio de sesión exitoso!';
  const titleColor = isError ? 'text-red-600' : 'text-green-600';
  const buttonColor = isError ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600';
  const imageSrc = isError ? '/img/personajes/starly/starly_triste.webp' : '/img/personajes/starly/starly2.webp';
  const buttonText = isError ? 'Intentar de nuevo' : 'Continuar';

  const handleContinue = () => {
    if (!isError && redirectTo) {
      window.location.href = redirectTo;
    }
    onClose();
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 text-2xl transition-opacity duration-300 yagora">
      <div className="relative bg-white shadow-xl p-6 rounded-lg w-full max-w-md text-center transform transition-transform duration-300 scale-100">
        <p className={`flex justify-center items-center mb-4 font-bold text-lg ${titleColor}`}>
          {icon} {title}
        </p>
        <img src={imageSrc} alt={title} className="mx-auto mb-4 w-auto h-36" />
        {isError && <p className="mb-6 text-gray-700">{message}</p>}
        <button
          onClick={handleContinue}
          className={`${buttonColor} px-4 py-2 rounded-full text-base text-white transition duration-200`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
};

export default LoginModal;
