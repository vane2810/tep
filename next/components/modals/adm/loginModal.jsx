import React from 'react';
import '@/styles/modals/modalLogin.css';

const LoginModal = ({ show, message, type, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${type === 'success' ? 'modal-success' : 'modal-error'}`}>
        <h2>{type === 'success' ? 'Éxito' : 'Error'}</h2>
        <p>{message}</p>
        <button onClick={onClose} className="modal-close-button">
          {type === 'success' ? 'Continuar' : 'Intentar de nuevo'}
        </button>
      </div>
    </div>
  );
};

export default LoginModal;

