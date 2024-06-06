import React from 'react';
import './Modal.css'; 

const GuestModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>¡Hola!</h2>
        <p>Para tener acceso a esta funcionalidad, debes crear una cuenta o iniciar sesión.</p>
        <div className="modal-buttons">
          <button onClick={onClose} className="modal-close-button">Cerrar</button>
          <a href="/login" className="modal-link">Iniciar sesión</a>
          <a href="/registro" className="modal-link">Registrarse</a>
        </div>
      </div>
    </div>
  );
};

export default GuestModal;
