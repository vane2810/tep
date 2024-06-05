import React from 'react';
import '@/styles/modalRegistro.css';
import Link from 'next/link';

export default function RegistroModal({ onClose, message, isError }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {isError ? (
          <div>
            <p>Error al registrar:</p>
            <p>{message}</p>
            <Link href="/">Volver al Inicio</Link>
            <button onClick={onClose}>Cerrar</button>
          </div>
          
        ) : (
          <div>
            <p>¡Registro exitoso!</p>
            <img src="/img/page/starly.png" alt="Registro exitoso" />
            <Link href="/adm/login">Continuar</Link>
          </div>
        )}
      </div>
    </div>
  );
}
