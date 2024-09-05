"use client";
import React, { useState } from 'react';
import NivelModal from '@/components/modals/adm/nivelModal'; 
import RolesModal from '@/components/modals/adm/rolesModal'; 
import RegistroModal from '@/components/modals/adm/registroModal'; 
import LoginModal from '@/components/modals/adm/loginModal'; 
import GuestModal from '@/components/modals/guestModal'; // Importa el GuestModal

const ModalTestComponent = () => {
  const [isNivelModalOpen, setIsNivelModalOpen] = useState(false);
  const [isRolesModalOpen, setIsRolesModalOpen] = useState(false);
  const [isRegistroModalOpen, setIsRegistroModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false); // Estado para GuestModal

  const [registroMessage, setRegistroMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [isError, setIsError] = useState(false);

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

  const openRegistroModal = (message, error = false) => {
    setRegistroMessage(message);
    setIsError(error);
    setIsRegistroModalOpen(true);
  };

  const closeRegistroModal = () => {
    setIsRegistroModalOpen(false);
  };

  const openLoginModal = (message, type) => {
    setLoginMessage(message);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openGuestModal = () => {
    setIsGuestModalOpen(true);
  };

  const closeGuestModal = () => {
    setIsGuestModalOpen(false);
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
        <button
          onClick={() => openRegistroModal('¡Registro exitoso!', false)}
          className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-transform transform hover:scale-105"
        >
          Abrir Registro Modal
        </button>
        <button
          onClick={() => openLoginModal('Inicio de sesión exitoso', 'success')}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
        >
          Abrir Login Modal
        </button>
        <button
          onClick={openGuestModal}
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-transform transform hover:scale-105"
        >
          Abrir Guest Modal
        </button>
      </div>

      {/* Nivel Modal */}
      <NivelModal show={isNivelModalOpen} onClose={closeNivelModal} />

      {/* Roles Modal */}
      <RolesModal show={isRolesModalOpen} onClose={closeRolesModal} />

      {/* Registro Modal */}
      {isRegistroModalOpen && (
        <RegistroModal 
          onClose={closeRegistroModal} 
          message={registroMessage} 
          isError={isError} 
        />
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal 
          show={isLoginModalOpen}
          message={loginMessage}
          type="success"
          onClose={closeLoginModal}
          redirectTo="/dashboard" // Ajusta la ruta según sea necesario
        />
      )}

      {/* Guest Modal */}
      {isGuestModalOpen && (
        <GuestModal show={isGuestModalOpen} />
      )}
    </div>
  );
};

export default ModalTestComponent;
