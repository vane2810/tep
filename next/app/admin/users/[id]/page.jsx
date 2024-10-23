"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaUserEdit, FaCalendarAlt, FaChild, FaChalkboardTeacher, FaEnvelope, FaUserCircle, FaLayerGroup, FaUserAstronaut } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
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
    <div className="bg-white shadow-lg mx-auto my-10 p-6 rounded-lg max-w-4xl container">
      <div className="flex items-center mb-8">
        <button onClick={() => window.history.back()} className="flex items-center text-blue-500 hover:text-blue-700">
          <BiArrowBack className="mr-2" /> Volver
        </button>
      </div>

      <div className="flex items-center mb-8">
        <img
          src={characterImage}
          alt={`Foto de perfil de ${usuario.name}`}
          className="border-2 border-gray-300 mr-6 rounded-full w-36 h-36 cursor-pointer object-cover"
        />
        <div>
          <h2 className="flex items-center font-bold text-4xl text-gray-800">
            {usuario.name} <FaUserEdit className="ml-4 text-yellow-500 cursor-pointer" onClick={abrirModalEditar} />
          </h2>
          <p className="flex items-center mt-2 text-gray-600">
            <FaEnvelope className="mr-2" /> {usuario.email}
          </p>
        </div>
      </div>

      <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
        <div className="bg-blue-50 shadow-inner p-6 rounded-lg">
          <h3 className="flex items-center mb-4 font-semibold text-blue-700 text-xl">
            <FaUserCircle className="mr-2" /> Información Personal
          </h3>
          <p className="mb-2"><strong>Nombre:</strong> {usuario.name}</p>
          <p className="mb-2"><strong>Correo electrónico:</strong> {usuario.email}</p>
        </div>

        {usuario.level && (
          <div className="bg-green-50 shadow-inner p-6 rounded-lg">
            <h3 className="flex items-center mb-4 font-semibold text-green-700 text-xl">
              <FaLayerGroup className="mr-2" /> Nivel
            </h3>
            <p className="mb-2"><strong>Nivel:</strong> {usuario.level.nombre}</p>
            <p className="mb-2"><strong>Descripción del Nivel:</strong> {usuario.level.descripcion}</p>
          </div>
        )}

        {usuario.character && (
          <div className="bg-yellow-50 shadow-inner p-6 rounded-lg">
            <h3 className="flex items-center mb-4 font-semibold text-xl text-yellow-700">
              <FaUserAstronaut className="mr-2" /> Personaje
            </h3>
            <p className="mb-2"><strong>Personaje:</strong> {usuario.character.nombre}</p>
            <p className="mb-2"><strong>Descripción del Personaje:</strong> {usuario.character.descripcion}</p>
          </div>
        )}

        {usuario.numeroHijos && (
          <div className="bg-purple-50 shadow-inner p-6 rounded-lg">
            <h3 className="flex items-center mb-4 font-semibold text-purple-700 text-xl">
              <FaChild className="mr-2" /> Familia
            </h3>
            <p className="mb-2"><strong>Número de Hijos:</strong> {usuario.numeroHijos}</p>
          </div>
        )}

        {usuario.numeroEstudiantes && (
          <div className="bg-pink-50 shadow-inner p-6 rounded-lg">
            <h3 className="flex items-center mb-4 font-semibold text-pink-700 text-xl">
              <FaChalkboardTeacher className="mr-2" /> Docencia
            </h3>
            <p className="mb-2"><strong>Número de Estudiantes:</strong> {usuario.numeroEstudiantes}</p>
          </div>
        )}

        {usuario.createdAt && (
          <div className="bg-gray-50 shadow-inner p-6 rounded-lg">
            <h3 className="flex items-center mb-4 font-semibold text-gray-700 text-xl">
              <FaCalendarAlt className="mr-2" /> Registro
            </h3>
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