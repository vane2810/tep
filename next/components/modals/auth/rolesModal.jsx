// Modal de roles
import React, { useState } from 'react';

const RolModal = ({ show, onClose, onRoleSelected }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  if (!show) return null;

  const handleSelectRole = (role) => {
    setSelectedRole(role); 
  };

  const handleConfirmSelection = () => {
    if (selectedRole !== null) {
      onRoleSelected(selectedRole); 
      onClose(); 
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-2xl p-16 w-4/5 max-w-4xl">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 story">Selecciona tu rol</h2>
        <div className="flex justify-around story">
          <button
            onClick={() => handleSelectRole('estudiante')}
            className={`w-48 h-48 p-10 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-110 ${
              selectedRole === 'estudiante' ? 'ring-4 ring-black' : 'ring-2 ring-transparent'
            } bg-blue-500 text-white hover:bg-blue-600`}
          >
            <img src="/img/auth/roles/estudiante_rol.png" alt="Estudiante" className="h-24 w-24 mb-4" />
            <span className="text-2xl">Estudiante</span>
          </button>
          <button
            onClick={() => handleSelectRole('docente')}
            className={`w-48 h-48 p-10 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-110 ${
              selectedRole === 'docente' ? 'ring-4 ring-black' : 'ring-2 ring-transparent'
            } bg-green-500 text-white hover:bg-green-600`}
          >
            <img src="/img/auth/roles/docente_rol.png" alt="Docente" className="h-24 w-24 mb-4" />
            <span className="text-2xl">Docente</span>
          </button>
          <button
            onClick={() => handleSelectRole('padre')}
            className={`w-48 h-48 p-10 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-110 ${
              selectedRole === 'padre' ? 'ring-4 ring-black' : 'ring-2 ring-transparent'
            } bg-yellow-500 text-white hover:bg-yellow-600`}
          >
            <img src="/img/auth/roles/padre_rol.png" alt="Padre" className="h-24 w-24 mb-4" />
            <span className="text-2xl text-center">Padre de Familia</span>
          </button>
        </div>

        {selectedRole && (
          <div className="mt-12 flex justify-center text-2xl">
            <button
              onClick={handleConfirmSelection}
              className="bg-green-500 story text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105"
            >
              Confirmar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolModal;