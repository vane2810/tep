"use client";
import React, { useState } from "react";
import Loading from "@/components/elements/loading"; // Importar el componente de carga

const LogoutModal = ({ show, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleConfirm = () => {
    setLoading(true);
    onConfirm(); // Llamar a la función de confirmación para cerrar sesión
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 yagora" onClick={onClose}>
      <div
        className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()} 
      >
        {loading ? (
          // Mostrar el componente de carga si loading 
          <Loading />
        ) : (
          <>
            <h2 className="mb-4 font-semibold text-3xl text-center wonder">¿Cerrar sesión?</h2>

            {/* Imagen en el centro del modal */}
            <div className="flex justify-center mb-6">
              <img src="/img/personajes/starly/starly_ve.webp" alt="Cerrar sesión" className="w-38 h-32" />
            </div>

            <p className="mb-6 text-center">
              ¿Estás seguro de que quieres cerrar la sesión?
            </p>

            {/* Botones de confirmación y cancelación */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirm}
                className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded-full font-bold text-white focus:outline-none"
              >
                Sí, cerrar sesión
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-full font-bold text-gray-700 focus:outline-none"
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LogoutModal;
