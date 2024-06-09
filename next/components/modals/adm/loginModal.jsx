import React from 'react';
import '@/styles/modals/modalLogin.css';

const LoginModal = ({ show, message, type, onClose }) => {
  const handleContinue = () => {
    if (type === 'success') {
      // Redirigir al usuario a la página de inicio
      window.location.href = '/';
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${type === 'success' ? 'modal-success' : 'modal-error'}`}>
        <h2>{type === 'success' ? 'Éxito' : 'Error'}</h2>
        <p>{message}</p>
        <button onClick={handleContinue} className="modal-close-button">
          {type === 'success' ? 'Continuar' : 'Intentar de nuevo'}
        </button>
      </div>
    </div>
  );
};

export default LoginModal;


