"use client";
import React, { useState } from 'react';
import NivelModal from '@/components/modals/adm/nivelModal'; 
import RolesModal from '@/components/modals/adm/rolesModal'; 

const ModalTestComponent = () => {
  const [isNivelModalOpen, setIsNivelModalOpen] = useState(false);
  const [isRolesModalOpen, setIsRolesModalOpen] = useState(false);

  const openNivelModal = () => {
    setIsNivelModalOpen(true);
  };

  const closeNivelModal = () => {
    setIsNivelModalOpen(false);
  };

  const openRolesModal = () => {
    setIsRolesModalOpen(true);
  };

  const closeRolesModal = () => {
    setIsRolesModalOpen(false);
  };

  const handleLevelSelected = (levelId) => {
    console.log(`Nivel seleccionado: ${levelId}`);
    setIsNivelModalOpen(false); 
  };

  const handleRoleSelected = (roleId) => {
    console.log(`Rol seleccionado: ${roleId}`);
    setIsRolesModalOpen(false); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="space-x-4">
        <button
          onClick={openNivelModal}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          Abrir Modal de Nivel
        </button>
        <button
          onClick={openRolesModal}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105"
        >
          Abrir Modal de Roles
        </button>
      </div>

      {/* Nivel Modal */}
      <NivelModal show={isNivelModalOpen} onClose={closeNivelModal} onLevelSelected={handleLevelSelected} />

      {/* Roles Modal */}
      <RolesModal show={isRolesModalOpen} onClose={closeRolesModal} onRoleSelected={handleRoleSelected} />
    </div>
  );
};

export default ModalTestComponent;
