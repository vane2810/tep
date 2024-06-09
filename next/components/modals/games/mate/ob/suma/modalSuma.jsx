import React from 'react';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      {/* Contenedor del modal */}
      <div className="relative w-auto max-w-lg mx-auto my-6 bg-white rounded-lg shadow-lg">
        <div className="relative flex flex-col w-full p-6 bg-white border-0 rounded-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-xl font-semibold text-center w-full">SUMA</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
              aria-label="Cerrar"
            >
              <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
            </button>
          </div>
          <div className="relative p-6 flex-auto text-center">
            {children}
          </div>
        </div>
      </div>
      {/* Capa de fondo */}
      <div onClick={onClose}></div>
    </div>
  );
}
