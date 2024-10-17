"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Volver from '@/components/botonVolver';
import characterImages from '@/utils/characterImages';
import ModalEditarUsuario from '@/components/modals/admin/editarModal';

export default function PaginaPerfilUsuario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalEditar, setModalEditar] = useState(false);

  useEffect(() => {
    if (id) {
      const obtenerUsuario = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/users/${id}`);
          if (!response.ok) {
            throw new Error('Error al obtener el usuario');
          }
          const data = await response.json();
          setUsuario(data);
        } catch (error) {
          console.error('Error al obtener el usuario:', error);
        } finally {
          setLoading(false);
        }
      };

      obtenerUsuario();
    }
  }, [id]);

  if (loading) {
    return <div>Cargando perfil...</div>;
  }

  if (!usuario) {
    return <div>No se encontró el usuario.</div>;
  }

  const abrirModalEditar = () => {
    setModalEditar(true);
  };

  const handleCloseModal = () => {
    setModalEditar(false);
  };

  const characterImage = usuario.characterId
    ? characterImages[usuario.characterId]
    : '/profile.png';

  return (
    <div className="bg-white shadow-lg mx-auto my-10 p-6 rounded-lg container">
      <Volver href='/admin/users' />

      {/* Sección de la imagen del perfil */}
      <div className="flex items-center mb-8">
        <img
          src={characterImage}
          alt={`Foto de perfil de ${usuario.name}`}
          className="border-2 border-black rounded-xl w-36 h-36 cursor-pointer object-cover"
        />
        <div>
          <h2 className="font-bold text-4xl text-gray-800">{usuario.name}</h2>
        </div>
      </div>

      <button
        className="bg-yellow-500 hover:bg-yellow-700 px-2 py-1 rounded font-bold text-white"
        onClick={abrirModalEditar}
      >
        Editar
      </button>

      {/* Información del usuario */}
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
        <div className="bg-blue-50 shadow-inner p-6 rounded-lg">
          <h3 className="mb-4 font-semibold text-blue-700 text-xl">Información Personal</h3>
          <p className="mb-2"><strong>Nombre:</strong> {usuario.name}</p>
          <p className="mb-2"><strong>Correo electrónico:</strong> {usuario.email}</p>
        </div>

        {/* Mostrar nivel si está disponible */}
        {usuario.level && (
          <div className="bg-green-50 shadow-inner p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-green-700 text-xl">Nivel</h3>
            <p className="mb-2"><strong>Nivel:</strong> {usuario.level.nombre}</p>
            <p className="mb-2"><strong>Descripción del Nivel:</strong> {usuario.level.descripcion}</p>
          </div>
        )}

        {/* Mostrar información adicional del character */}
        {usuario.character && (
          <div className="bg-yellow-50 shadow-inner p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-xl text-yellow-700">Personaje</h3>
            <p className="mb-2"><strong>Personaje:</strong> {usuario.character.nombre}</p>
            <p className="mb-2"><strong>Descripción del Personaje:</strong> {usuario.character.descripcion}</p>
          </div>
        )}

        {/* Mostrar número de hijos si es un padre */}
        {usuario.numeroHijos && (
          <div className="bg-purple-50 shadow-inner p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-purple-700 text-xl">Familia</h3>
            <p className="mb-2"><strong>Número de Hijos:</strong> {usuario.numeroHijos}</p>
          </div>
        )}

        {/* Mostrar número de estudiantes si es un docente */}
        {usuario.numeroEstudiantes && (
          <div className="bg-pink-50 shadow-inner p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-pink-700 text-xl">Docencia</h3>
            <p className="mb-2"><strong>Número de Estudiantes:</strong> {usuario.numeroEstudiantes}</p>
          </div>
        )}

        {/* Información sobre la fecha y hora de registro */}
        {usuario.createdAt && (
          <div className="bg-gray-50 shadow-inner p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-700 text-xl">Registro</h3>
            <p className="mb-2"><strong>Fecha de Registro:</strong> {new Date(usuario.createdAt).toLocaleDateString()}</p>
            <p className="mb-2"><strong>Hora de Registro:</strong> {new Date(usuario.createdAt).toLocaleTimeString('es-ES', { timeZone: 'America/El_Salvador' })}</p>
          </div>
        )}
      </div>

      {modalEditar && (
        <ModalEditarUsuario
          onClose={handleCloseModal}
          usuario={usuario}
          characters={[]} 
          levels={[]} 
        />
      )}
    </div>
  );
}
