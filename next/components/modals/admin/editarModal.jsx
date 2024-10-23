import React, { useState, useEffect } from 'react';
import characterImages from '@/utils/characterImages';
import levelData from '@/utils/levelData';

export default function ModalEditarUsuario({ onClose, usuario }) {
  // Inicializar los valores del usuario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [characterId, setCharacterId] = useState('');
  const [levelId, setLevelId] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mostrarMinimodal, setMostrarMinimodal] = useState(false);

  // Utiliza useEffect para inicializar los valores cuando `usuario` cambie
  useEffect(() => {
    if (usuario) {
      setName(usuario.name || '');
      setEmail(usuario.email || '');
      setRole(usuario.role || '');
      setCharacterId(usuario.character ? usuario.character.id : '');
      setLevelId(usuario.level ? usuario.level.id : '');
    }
  }, [usuario]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${usuario.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, role, characterId, levelId }),
      });

      if (response.ok) {
        setMensaje('Usuario actualizado exitosamente');
        setMostrarMinimodal(true);
        setTimeout(() => {
          setMostrarMinimodal(false);
          onClose(); // Cerrar el modal después de guardar con éxito
        }, 2000);
      } else {
        const errorData = await response.json();
        setMensaje(`Error: ${errorData.error || 'No se pudo actualizar el usuario'}`);
        setMostrarMinimodal(true);
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      setMensaje('Error al actualizar el usuario');
      setMostrarMinimodal(true);
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative z-60 bg-white shadow-lg p-6 rounded-lg w-96">
        <h2 className="mb-4 font-bold text-2xl">Editar Datos de {usuario.name}</h2>

        {/* Minimodal de mensaje */}
        {mostrarMinimodal && (
          <div className="z-70 fixed inset-0 flex justify-center items-center">
            <div className={`z-70 bg-white p-4 rounded-lg shadow-lg border ${mensaje.startsWith('Error') ? 'border-red-500' : 'border-green-500'} text-center`}>
              <p className={`${mensaje.startsWith('Error') ? 'text-red-500' : 'text-green-500'} font-bold`}>
                {mensaje}
              </p>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-gray-300 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-300 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Rol</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border-gray-300 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Personaje</label>
          <select
            value={characterId}
            onChange={(e) => setCharacterId(e.target.value)}
            className="border-gray-300 p-2 border rounded w-full"
          >
            <option value="">Selecciona un personaje</option>
            {Object.keys(characterImages).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Nivel</label>
          <select
            value={levelId}
            onChange={(e) => setLevelId(e.target.value)}
            className="border-gray-300 p-2 border rounded w-full"
          >
            <option value="">Selecciona un nivel</option>
            {levelData.map((level) => (
              <option key={level.id} value={level.id}>
                {level.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded font-bold text-white"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded font-bold text-white"
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
