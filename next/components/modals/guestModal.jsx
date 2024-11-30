import React from "react";
import { AiOutlineClose } from "react-icons/ai";

// Componente reutilizable para botones de acción
const ActionButton = ({ href, label, bgColor, hoverColor, ringColor }) => (
  <a
    href={href}
    className={`${bgColor} hover:${hoverColor} shadow-md px-8 py-3 rounded-full focus:ring-2 ${ringColor} text-lg text-white md:text-xl transition duration-200 focus:outline-none transform hover:scale-105`}
  >
    {label}
  </a>
);

const GuestModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <>
      {/* Overlay para cerrar el modal al hacer clic fuera del cuadro */}
      <div
        className="z-50 fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75"
        onClick={onClose} // Cerrar modal al hacer clic fuera del cuadro
      >
        {/* Contenido del Modal */}
        <div
          className="relative bg-white shadow-lg p-8 rounded-lg w-full max-w-lg text-center yagora"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar (X) */}
          <button
            onClick={onClose}
            className="top-2 right-2 absolute focus:ring-gray-500 text-gray-500 hover:text-gray-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            aria-label="Cerrar"
          >
            <AiOutlineClose className="w-6 h-6" />
          </button>

          {/* Título */}
          <h2 className="mb-4 font-bold text-3xl md:text-4xl">¡Hola!</h2>

          {/* Imagen del Personaje */}
          <img
            src="/img/personajes/starly/starly_gorro.webp"
            className="mx-auto mb-6 w-28 md:w-36 h-28 md:h-36"
            alt="Starly"
          />

          {/* Mensaje */}
          <p className="mb-6 text-lg md:text-xl">
            Para acceder a esta funcionalidad, por favor inicia sesión o regístrate.
          </p>

          {/* Botones de Iniciar sesión y Registro */}
          <div className="flex justify-around mt-6 font-bold">
            <ActionButton
              href="/auth/login"
              label="Iniciar sesión"
              bgColor="bg-blue-500"
              hoverColor="bg-blue-700"
              ringColor="focus:ring-blue-500"
            />
            <ActionButton
              href="/auth/register"
              label="Registrarse"
              bgColor="bg-green-500"
              hoverColor="bg-green-700"
              ringColor="focus:ring-green-500"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestModal;
