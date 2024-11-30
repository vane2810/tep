import React, { useState, useEffect } from 'react';

export default function ModalEditarUsuario({ onClose, usuario }) {
  // Inicializar los valores del usuario
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
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
      setLastname(usuario.lastname || '');
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
        body: JSON.stringify({ name, lastname, email, role, characterId, levelId }),
      });

      if (response.ok) {
        setMensaje('Usuario actualizado exitosamente');
      } else {
        const errorData = await response.json();
        setMensaje(`Error: ${errorData.error || 'No se pudo actualizar el usuario'}`);
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      setMensaje('Error al actualizar el usuario');
    } finally {
      setMostrarMinimodal(true);
    }
  };

  const handleAceptarMinimodal = () => {
    setMostrarMinimodal(false);
    onClose(); // Cerrar el modal principal también
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="relative z-60 bg-white shadow-lg mx-4 my-8 p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="mb-6 font-bold text-2xl text-center">Editar Datos de {usuario.name}</h2>

        {/* Minimodal de mensaje */}
        {mostrarMinimodal && (
          <div className="z-70 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white shadow-lg p-6 rounded-lg text-center">
              <p className={`mb-4 font-bold ${mensaje.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
                {mensaje}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-full font-bold text-white"
                onClick={handleAceptarMinimodal}
              >
                Aceptar
              </button>
            </div>
          </div>
        )}

        {/* Campo de Nombre */}
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-gray-300 p-2 border rounded w-full"
          />
        </div>

        {/* Campo de Apellido */}
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Apellido</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="border-gray-300 p-2 border rounded w-full"
          />
        </div>

        {/* Campo de Correo Electrónico */}
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-300 p-2 border rounded w-full"
          />
        </div>

        {/* Campo de Rol */}
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Rol</label>
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              if (e.target.value !== 'estudiante') {
                setCharacterId(''); // Limpiar characterId si no es estudiante
                setLevelId(''); // Limpiar levelId si no es estudiante
              }
            }}
            className="border-gray-300 p-2 border rounded w-full"
          >
            <option value="">Selecciona un rol</option>
            <option value="estudiante">Estudiante</option>
            <option value="docente">Docente</option>
            <option value="padre">Padre</option>
          </select>
        </div>

        {/* Campo de Nivel (solo para estudiantes) */}
        {role === 'estudiante' && (
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700">Nivel</label>
            <select
              value={levelId}
              onChange={(e) => setLevelId(e.target.value)}
              className="border-gray-300 p-2 border rounded w-full"
            >
              <option value="">Selecciona un nivel</option>
              <option value="1">Nivel 1</option>
              <option value="2">Nivel 2</option>
              <option value="3">Nivel 3</option>
            </select>
          </div>
        )}

        {/* Campo de Personaje (solo para estudiantes) */}
        {role === 'estudiante' && (
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700">Personaje</label>
            <select
              value={characterId}
              onChange={(e) => setCharacterId(e.target.value)}
              className="border-gray-300 p-2 border rounded w-full"
            >
              <option value="">Seleccione un personaje</option>
              <option value="1">Peppa - Cerdito</option>
              <option value="2">Matatabi - Tigre</option>
              <option value="3">Maomao - Gato</option>
              <option value="4">Estrella - Mono</option>
              <option value="5">Kurama - Zorro</option>
              <option value="6">Ternura - Vaca</option>
              <option value="7">Lala - Oveja</option>
              <option value="8">Leen - Conejo</option>
              <option value="9">Yarichi - Chita</option>
              <option value="10">Tify - Perro</option>
              <option value="11">Fify - Zebra</option>
              <option value="12">Pandita - Pingüino</option>
            </select>
          </div>
        )}

        {/* Botones de Guardar y Cancelar */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded-full font-bold text-white"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-full font-bold text-white"
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
