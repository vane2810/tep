// Página de Inicio
"use client"
import React, { useState } from "react";
import NivelModal from "@/components/modals/auth/nivelModal";
import PersonajeModal from "@/components/modals/auth/personajeModal";
import RolModal from "@/components/modals/auth/rolesModal";

export default function HomePage() {
  const [showNivelModal, setShowNivelModal] = useState(false);
  const [showPersonajeModal, setShowPersonajeModal] = useState(false);
  const [showRolModal, setShowRolModal] = useState(false);

  const handleOpenNivelModal = () => setShowNivelModal(true);
  const handleCloseNivelModal = () => setShowNivelModal(false);

  const handleOpenPersonajeModal = () => setShowPersonajeModal(true);
  const handleClosePersonajeModal = () => setShowPersonajeModal(false);

  const handleOpenRolModal = () => setShowRolModal(true);
  const handleCloseRolModal = () => setShowRolModal(false);

  const handleLevelSelection = (level) => {
    console.log("Nivel seleccionado:", level); // Acción a tomar tras seleccionar el nivel
    handleCloseNivelModal();
  };

  const handleCharacterSelection = (character) => {
    console.log("Personaje seleccionado:", character); // Acción a tomar tras seleccionar el personaje
    handleClosePersonajeModal();
  };

  const handleRoleSelection = (role) => {
    console.log("Rol seleccionado:", role); // Acción a tomar tras seleccionar el rol
    handleCloseRolModal();
  };

  return (
    <main>
      <div className="flex justify-center items-center mb-10">
        {/* Botón para abrir el modal de selección de nivel */}
        <button
          onClick={handleOpenNivelModal}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold text-white text-xl transition duration-200"
        >
          Seleccionar Nivel
        </button>
      </div>

      <div className="flex justify-center items-center mb-10">
        {/* Botón para abrir el modal de selección de personaje */}
        <button
          onClick={handleOpenPersonajeModal}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold text-white text-xl transition duration-200"
        >
          Seleccionar Personaje
        </button>
      </div>

      <div className="flex justify-center items-center mb-10">
        {/* Botón para abrir el modal de selección de rol */}
        <button
          onClick={handleOpenRolModal}
          className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg font-semibold text-white text-xl transition duration-200"
        >
          Seleccionar Rol
        </button>
      </div>

      {/* Modal de Selección de Nivel */}
      <NivelModal
        show={showNivelModal}
        onClose={handleCloseNivelModal}
        onLevelSelected={handleLevelSelection}
      />

      {/* Modal de Selección de Personaje */}
      <PersonajeModal
        show={showPersonajeModal}
        onClose={handleClosePersonajeModal}
        onCharacterSelected={handleCharacterSelection}
      />

      {/* Modal de Selección de Rol */}
      <RolModal
        show={showRolModal}
        onClose={handleCloseRolModal}
        onRoleSelected={handleRoleSelection}
      />
    </main>
  );
}
