// Modal para eliminar cuentas
import React, { useState } from 'react';

export default function ModalEliminarUsuario({ onClose, usuario }) {
  const [mensaje, setMensaje] = useState('');

  const handleEliminar = async () => {
    if (!usuario || !usuario.id) {
      setMensaje('Error: Usuario no válido');
      return;
    }
    console.log('Usuario a eliminar:', usuario);
    try {
      const response = await fetch(`http://localhost:3001/api/users/${usuario.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setMensaje('Usuario eliminado exitosamente');
        setTimeout(() => {
          onClose();
        }, 2000);
      } else if (response.status === 404) {
        setMensaje('Error: Usuario no encontrado');
      } else {
        const errorData = await response.text();
        setMensaje(`Error: ${errorData || 'No se pudo eliminar el usuario'}`);
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setMensaje('Error al eliminar el usuario');
    }
  };
  

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white shadow-xl p-6 rounded-lg w-full max-w-md">
        <h2 className="mb-4 font-bold text-2xl text-red-600">Eliminar Cuenta de {usuario?.name}</h2>
        <div>
          <p className="mb-4 text-gray-700">¿Estás seguro de que deseas eliminar a <span className="font-bold">{usuario?.name}</span>? Esta acción no se puede deshacer.</p>
        </div>
        {mensaje && <div className="bg-red-500 mb-4 p-2 rounded text-center text-white">{mensaje}</div>}
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded font-bold text-white"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold text-white"
            onClick={handleEliminar}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
