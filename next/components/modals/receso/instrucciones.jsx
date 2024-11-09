// components/modals/receso/instrucciones.jsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const InstruccionesModal = ({ isOpen, onClose, instructions, handleStartGame }) => {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-gradient-to-r from-purple-200 to-blue-200 rounded-2xl p-6 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 z-10 shadow-2xl border-4 border-black">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold focus:outline-none"
        >
          &times;
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">{instructions.title}</h2>
          <p className="mb-2 text-gray-700">{instructions.text}</p>
          {instructions.text2 && <p className="mb-2 text-gray-700">{instructions.text2}</p>}
          {instructions.text3 && <p className="mb-4 text-gray-700">{instructions.text3}</p>}
          {instructions.imageSrc && (
            <img src={instructions.imageSrc} alt="Instrucciones" className="w-32 h-32 mx-auto mb-4" />
          )}
          <button
            onClick={handleStartGame}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            Comenzar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstruccionesModal;


