// Info por usuario
"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '@/components/elements/loading';
import { FaUserEdit, FaCalendarAlt, FaChild, FaChalkboardTeacher, FaExclamationTriangle, FaEnvelope, FaUserCircle, FaLayerGroup, FaUserAstronaut, FaUserTie } from 'react-icons/fa';
import characterImages from '@/utils/characterImages';
import ModalEditarUsuario from '@/components/modals/admin/editarModal';
import Volver from '@/components/elements/botonVolver';
import { SeparadorAzul } from '@/components/separador';
import useSession from '@/hooks/useSession';
import MensajePermiso from '@/components/menssages/mensajePermiso';

export default function PaginaPerfilUsuario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalEditar, setModalEditar] = useState(false);

  const { session } = useSession();

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
    return <Loading />;
  }

  // Verificar si el usuario tiene permiso para acceder
  if (!session || session.role !== 'admin') {
    return <MensajePermiso />;
  }

  if (!usuario) {
    return (
      <div className="py-8 font-bold text-center text-red-500">
        <FaExclamationTriangle className="inline-block mr-2 text-2xl" />
        No se encontraron usuarios
      </div>
    );
  }

  const abrirModalEditar = () => {
    setModalEditar(true);
  };

  const handleCloseModal = () => {
    setModalEditar(false);
  };

  const characterImage = usuario.characterId
    ? characterImages[usuario.characterId]
    : '/img/personajes/starly/starly2.webp';

  return (
    <main>
      <SeparadorAzul />
      <div className="bg-white shadow-lg mx-auto my-4 p-10 rounded-lg max-w-4xl container yagora">
        {/* Botón de Volver */}
        <div className="flex items-start">
          <Volver href='/admin/users' />
        </div>

        {/* Título de la Página */}
        <h1 className="mb-10 font-bold text-4xl text-blue-800 text-center">
          Información del Usuario
        </h1>

        {/* Sección de Imagen de Perfil y Nombre */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="relative mb-4 w-32 h-32">
            <div className="border-4 border-gray-300 rounded-lg w-full h-full overflow-hidden">
              <img
                src={characterImage}
                alt={`Foto de perfil de ${usuario.name}`}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <FaUserEdit
              className="right-[-10px] bottom-[-10px] absolute border-2 border-gray-300 bg-white shadow-lg p-2 rounded-full text-white text-yellow-500 cursor-pointer hover:scale-110 transition-transform"
              size={40} // Aumenta el tamaño del ícono para hacerlo más visible
              onClick={abrirModalEditar}
            />
          </div>
          <h2 className="font-bold text-4xl text-gray-800">
            {usuario.name}
          </h2>
          <p className="flex items-center mt-2 text-gray-600">
            <FaEnvelope className="mr-2" /> {usuario.email}
          </p>
        </div>

        {/* Información del Usuario */}
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
          <div className="bg-blue-50 shadow-inner p-6 rounded-lg text-left">
            <h3 className="flex items-center mb-4 font-semibold text-blue-700 text-xl">
              <FaUserCircle className="mr-2" /> Información Personal
            </h3>
            <p className="mb-2"><strong>Nombre:</strong> {usuario.name}</p>
            <p className="mb-2"><strong>Apellido:</strong> {usuario.lastname ? usuario.lastname : '-'}</p>
            <p className="mb-2"><strong>Correo electrónico:</strong> {usuario.email}</p>
            <p className="mb-2"><strong>Rol:</strong> {usuario.role ? usuario.role.charAt(0).toUpperCase() + usuario.role.slice(1) : '-'}</p>
          </div>

          {usuario.level && (
            <div className="bg-green-50 shadow-inner p-6 rounded-lg text-left">
              <h3 className="flex items-center mb-4 font-semibold text-green-700 text-xl">
                <FaLayerGroup className="mr-2" /> Nivel
              </h3>
              <p className="mb-2"><strong>Nivel:</strong> {usuario.level.name}</p>
              <p className="mb-2"><strong>Descripción del Nivel:</strong> {usuario.level.description}</p>
            </div>
          )}

          {usuario.character && usuario.role === 'estudiante' && (
            <div className="bg-yellow-50 shadow-inner p-6 rounded-lg text-left">
              <h3 className="flex items-center mb-4 font-semibold text-xl text-yellow-700">
                <FaUserAstronaut className="mr-2" /> Personaje
              </h3>
              <p className="mb-2"><strong>Personaje:</strong> {usuario.character.name}</p>
              <p className="mb-2"><strong>Descripción del Personaje:</strong> {usuario.character.description}</p>
            </div>
          )}

          {usuario.numeroHijos && (
            <div className="bg-purple-50 shadow-inner p-6 rounded-lg text-left">
              <h3 className="flex items-center mb-4 font-semibold text-purple-700 text-xl">
                <FaChild className="mr-2" /> Familia
              </h3>
              <p className="mb-2"><strong>Número de Hijos:</strong> {usuario.numeroHijos}</p>
            </div>
          )}

          {usuario.numeroEstudiantes && (
            <div className="bg-pink-50 shadow-inner p-6 rounded-lg text-left">
              <h3 className="flex items-center mb-4 font-semibold text-pink-700 text-xl">
                <FaChalkboardTeacher className="mr-2" /> Docencia
              </h3>
              <p className="mb-2"><strong>Número de Estudiantes:</strong> {usuario.numeroEstudiantes}</p>
            </div>
          )}

          {usuario.createdAt && (
            <div className="bg-gray-50 shadow-inner p-6 rounded-lg text-left">
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
      <SeparadorAzul />
    </main>
  );
}
