import React, { useState } from 'react';
import { FiTrash2, FiXCircle } from 'react-icons/fi'; // Usar iconos

export default function ModalEliminarUsuario({ onClose, usuario }) {
  const [mensaje, setMensaje] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

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
        setIsSuccess(true);
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
    <>
      {/* Mensaje de confirmación */}
      {mensaje && isSuccess && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300">
          <div className="relative bg-white shadow-2xl p-6 rounded-lg w-full max-w-sm text-center">
            <FiTrash2 className="mx-auto mb-4 text-green-500" size={40} />
            <p className="mb-4 font-semibold text-center text-green-500">
              {mensaje}
            </p>
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded w-full font-bold text-white transition-all duration-200"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {/* Modal principal */}
      <div
        className={`z-40 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300 ${
          mensaje && isSuccess ? 'hidden' : ''
        }`}
      >
        <div className="relative bg-white shadow-2xl p-8 rounded-lg w-full max-w-md text-center">
          <FiTrash2 className="mx-auto mb-4 text-red-600" size={50} />
          <h2 className="mb-4 font-bold text-2xl text-red-600">
            Eliminar Cuenta de {usuario?.name}
          </h2>
          <p className="mb-6 text-gray-600">
            ¿Estás seguro de que deseas eliminar a{' '}
            <span className="font-bold">{usuario?.name}</span>? <br/>Esta acción no se
            puede deshacer
          </p>
          {mensaje && !isSuccess && (
            <div
              className={`p-3 mb-4 rounded text-center font-semibold text-white transition-all duration-300 ${
                mensaje.includes('exitosamente') ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {mensaje}
            </div>
          )}
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-full font-bold text-gray-700 transform transition-transform hover:-translate-y-1 duration-200"
              onClick={onClose}
            >
              <FiXCircle /> Cancelar
            </button>
            <button
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full font-bold text-white transform transition-transform hover:-translate-y-1 duration-200"
              onClick={handleEliminar}
            >
              <FiTrash2 /> Eliminar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
