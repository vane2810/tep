// Modal de roles
import React from 'react';

const RolModal = ({ show, onClose, onRoleSelected }) => {
  if (!show) return null;

  const handleSelectRole = (role) => {
    onRoleSelected(role);
    onClose(); // Cierra el modal después de seleccionar el rol
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Selecciona tu rol</h2>
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => handleSelectRole('estudiante')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Estudiante
          </button>
          <button
            onClick={() => handleSelectRole('docente')}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Docente
          </button>
          <button
            onClick={() => handleSelectRole('padre')}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
          >
            Padre
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default RolModal;
