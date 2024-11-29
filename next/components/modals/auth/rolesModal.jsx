// Modal de selección de roles
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RolModal = ({ show, onClose, onRoleSelected }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  if (!show) return null;

  const roles = [
    { id: 'estudiante', label: 'Estudiante', color: 'bg-blue-500 hover:bg-blue-600', img: '/img/auth/roles/estudiante_rol.webp', confirmColor: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'docente', label: 'Docente', color: 'bg-green-500 hover:bg-green-600', img: '/img/auth/roles/docente_rol_1.webp', confirmColor: 'bg-green-500 hover:bg-green-600' },
    { id: 'padre', label: 'Padre de Familia', color: 'bg-yellow-500 hover:bg-yellow-600', img: '/img/auth/roles/padre_rol_1.webp', confirmColor: 'bg-yellow-500 hover:bg-yellow-600' },
  ];

  const handleSelectRole = (role) => setSelectedRole(role);

  const handleConfirmSelection = () => {
    if (selectedRole) {
      onRoleSelected(selectedRole);
      onClose();
    }
  };

  // Obtener el color del botón "Confirmar" según el rol seleccionado
  const confirmButtonColor = selectedRole
    ? roles.find((role) => role.id === selectedRole)?.confirmColor
    : 'bg-purple-500 hover:bg-purple-600';

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 yagora">
      <div className="bg-white shadow-2xl p-8 sm:p-12 rounded-lg w-11/12 max-w-3xl text-center">
        <h2 className="mb-8 font-bold text-2xl text-gray-800 sm:text-4xl">Selecciona tu rol</h2>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleSelectRole(role.id)}
              className={`w-32 h-32 sm:w-48 sm:h-48 p-4 sm:p-6 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-105 ${role.color} text-white ${
                selectedRole === role.id ? 'ring-4 ring-black' : 'ring-2 ring-transparent'
              }`}
            >
              <img src={role.img} alt={role.label} className="mb-2 sm:mb-4 w-16 sm:w-24 h-16 sm:h-24" />
              <span className="text-base sm:text-2xl">{role.label}</span>
            </button>
          ))}
        </div>

        {selectedRole && (
          <div className="mt-8 sm:mt-12">
            <button
              onClick={handleConfirmSelection}
              className={`${confirmButtonColor} px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-2xl text-white transform transition-transform hover:scale-105`}
            >
              Confirmar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

RolModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRoleSelected: PropTypes.func.isRequired,
};

export default RolModal;
