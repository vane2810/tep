// components/RelaxationSection.js
"use client";

import React, { useState } from 'react';
import Modal from '/components/modals/receso/relajacion';

const RelaxationSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalImage, setModalImage] = useState("");

  const openModal = async (topic) => {
    let content;
    let imageSrc = "";

    try {
      if (topic === 'Sonidos de la Naturaleza') {
        content = await import('/components/receso/sonidos.json');
        imageSrc = "/img/receso/sonidos.png";
      } else if (topic === 'Ejercicio de Respiración') {
        content = await import('/components/receso/respiracion.json');
        imageSrc = "/img/receso/respiracion.png";
      } else if (topic === 'Meditación Guiada') {
        content = await import('/components/receso/meditacion.json');
        imageSrc = "/img/receso/meditacion.png";
      }

      setModalContent(content.default);
      setModalImage(imageSrc);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al cargar el contenido:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setModalImage("");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 super">ZONA DE RELAJACIÓN</h1>
      <p className="text-gray-600 mb-6 text-center wonder">Elige una actividad para relajarte y encontrar la calma.</p>

      {/* Imagen Central */}
      <div className="mb-10">
        <img
          src="/img/receso/relajacion2.png"
          alt="Zona de Juegos"
          className="w-40 md:w-40 lg:w-70 mx-auto"
        />
      </div>

      {/* Contenedor de tarjetas centradas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl justify-center">
        
        <div className="bg-pink-200 shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform p-4 flex flex-col items-center">
          <img src="/img/receso/sonidos.png" alt="Sonidos de la Naturaleza" className="w-20 h-20 object-cover rounded-full mb-4" />
          <h2 className="text-lg font-semibold text-blue-700 mb-2 text-center">Sonidos de la Naturaleza</h2>
          <button
            onClick={() => openModal('Sonidos de la Naturaleza')}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            Jugar
          </button>
        </div>

        <div className="bg-pink-200 shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform p-4 flex flex-col items-center">
          <img src="/img/receso/respiracion.png" alt="Ejercicio de Respiración" className="w-20 h-20 object-cover rounded-full mb-4" />
          <h2 className="text-lg font-semibold text-blue-700 mb-2 text-center">Ejercicio de Respiración</h2>
          <button
            onClick={() => openModal('Ejercicio de Respiración')}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            Jugar
          </button>
        </div>

        <div className="bg-pink-200 shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform p-4 flex flex-col items-center">
          <img src="/img/receso/meditacion.png" alt="Meditación Guiada" className="w-20 h-20 object-cover rounded-full mb-4" />
          <h2 className="text-lg font-semibold text-blue-700 mb-2 text-center">Meditación Guiada</h2>
          <button
            onClick={() => openModal('Meditación Guiada')}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            Jugar
          </button>
        </div>
      </div>

      {/* Modal dinámico, pasando las propiedades necesarias */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
        imageSrc={modalImage}
      />
    </div>
  );
};

export default RelaxationSection;

