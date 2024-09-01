"use client";
import React, { useState } from 'react';
import NivelModal from '@/components/modals/adm/nivelModal'; // Asegúrate de ajustar la ruta al componente modal

const ModalTestComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLevelSelected = (levelId) => {
    console.log(`Nivel seleccionado: ${levelId}`);
    setIsModalOpen(false); // Cierra el modal después de seleccionar el nivel
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
      >
        Abrir Modal para Pruebas
      </button>

      {/* Modal */}
      <NivelModal show={isModalOpen} onClose={closeModal} onLevelSelected={handleLevelSelected} />
    </div>
  );
};

export default ModalTestComponent;
