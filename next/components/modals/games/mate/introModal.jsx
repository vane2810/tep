// Modal introductorio de cada juego
// El titulo y enlace se edita desde la página de juegos
// Util para todos los juegos de matemáticas
import React from "react";
import Link from "next/link";

const IntroModal = ({ show, onClose, title, continueLink }) => {

  if (!show) return null;
  const description = "Ayuda a mi trianguamigo a pasar este juego para obtener estrellas"

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 story">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-xl flex flex-col items-center text-center">
        <h2 className="text-3xl font-semibold mb-4">{title}</h2>
        <img src="/img/personajes/donkey/donkey.png" alt="Donkey" className="h-12 md:h-24 mt-4 mb-4" />
        <p className="mb-6 text-xl">{description}</p>
        <div className="flex space-x-4">
          <button 
            className="bg-blue-500 text-white text-xl py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            onClick={onClose}
          >
            Cerrar
          </button>
          <Link href={continueLink}>
            <button 
              className="bg-green-500 text-white text-xl py-2 px-4 rounded hover:bg-green-700 transition duration-300"
            >
              Continuar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroModal;
