// Expiración de la sesión 
"use client"
import React, { useEffect, useState } from 'react';

const SessionWarning = ({ onRenew }) => {
  const [timeLeft, setTimeLeft] = useState(0); // Tiempo restante en segundos
  const [isVisible, setIsVisible] = useState(false); // Para mostrar u ocultar la advertencia

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt.decode(token);
      if (decoded && decoded.exp) {
        const expirationTime = decoded.exp * 1000; // Convertir a milisegundos
        const currentTime = Date.now();
        const timeRemaining = expirationTime - currentTime;

        if (timeRemaining <= 0) {
          setIsVisible(false);
          return; // El token ya ha expirado, no mostrar el mensaje
        }

        // Mostrar el mensaje si el tiempo restante es menor a 15 minutos
        if (timeRemaining <= 15 * 60 * 1000) {
          setIsVisible(true);
          setTimeLeft(Math.floor(timeRemaining / 1000)); // Mostrar el tiempo en segundos
        }

        // Actualizamos el tiempo restante cada segundo
        const timer = setInterval(() => {
          const timeRemaining = expirationTime - Date.now();
          if (timeRemaining <= 0) {
            setIsVisible(false);
            clearInterval(timer); // Limpiamos el timer si el tiempo se acabó
          } else {
            setTimeLeft(Math.floor(timeRemaining / 1000)); // Actualizamos los segundos restantes
          }
        }, 1000);

        return () => clearInterval(timer); // Limpiar el intervalo al desmontar el componente
      }
    }
  }, []);

  return (
    isVisible && (
      <div className="top-0 left-0 z-50 fixed bg-yellow-500 p-4 w-full text-white">
        <div className="flex justify-between items-center">
          <span>Tu sesión expirará en {Math.floor(timeLeft / 60)} minutos.</span>
          <button 
            onClick={onRenew}
            className="bg-purple-600 hover:bg-purple-700 p-2 rounded-md text-white"
          >
            Renovar sesión
          </button>
        </div>
      </div>
    )
  );
};

export default SessionWarning;
