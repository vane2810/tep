"use client";
import React, { useState, useEffect } from 'react';
import useSession from '@/hooks/useSession';
import DeleteModal from '@/components/modals/admin/contenido/deleteModal';
import Volver from '@/components/elements/botonVolver';
import { SeparadorMorado } from '@/components/separador';
import PrivateRoute from '@/components/PrivateRoute';
import { FiPlus, FiTrash2, FiEye } from "react-icons/fi";

const AddRelationshipForm = () => {
  const { session } = useSession(); // Obtener la sesión del tutor/padre autenticado
  const [formData, setFormData] = useState({
    studentEmail: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [relationships, setRelationships] = useState([]); // Estado para almacenar las relaciones
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const [showMessageModal, setShowMessageModal] = useState(false); // Estado para el minimodal de mensajes
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para el modal de eliminar
  const [selectedStudentId, setSelectedStudentId] = useState(null); // Estado para almacenar el ID del estudiante seleccionado para eliminar

  // Verificar el contenido de la sesión
  useEffect(() => {
    if (session?.user) {
      fetchRelationships(session.user); // Llamar a la función para obtener relaciones
    }
  }, [session]);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setFormData({ studentEmail: '' }); // Limpiar el campo del correo
    setMessage({ type: '', text: '' }); // Limpiar el mensaje al cerrar el modal
  };

  const closeMessageModal = () => {
    if (message.type === 'success') {
      closeModal();
    }
    setShowMessageModal(false);
    setMessage({ type: '', text: '' }); // Limpiar el mensaje al cerrar el minimodal
  };

  const openDeleteModal = (studentId) => {
    setSelectedStudentId(studentId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedStudentId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si el tutor tiene una sesión activa y contiene el `id`
    if (!session || !session.user) {
      setMessage({ type: 'error', text: 'No se pudo obtener la información del tutor. Por favor, inicie sesión.' });
      setShowMessageModal(true);
      return;
    }

    // Validar el formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.studentEmail)) {
      setMessage({ type: 'error', text: 'Por favor, ingrese un correo electrónico válido.' });
      setShowMessageModal(true);
      return;
    }

    // Verificar si la relación ya existe
    const existingRelationship = relationships.find(
      (relationship) => relationship.studentInfo.email === formData.studentEmail
    );
    if (existingRelationship) {
      setMessage({ type: 'error', text: 'La relación con este estudiante ya existe.' });
      setShowMessageModal(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/userRelations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentEmail: formData.studentEmail,
          guardianId: session.user, // Utiliza el id del tutor desde la sesión
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la relación');
      }

      setMessage({ type: 'success', text: 'Relación creada con éxito' });
      setShowMessageModal(true);
      fetchRelationships(session.user); // Actualizar la lista de relaciones
    } catch (error) {
      console.error('Error al crear la relación:', error);
      setMessage({ type: 'error', text: 'Hubo un error al crear la relación. Por favor, verifique los datos.' });
      setShowMessageModal(true);
    }
  };

  const fetchRelationships = async (guardianId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/userRelations/${guardianId}`);
      if (!response.ok) {
        throw new Error('Error al obtener las relaciones');
      }

      const data = await response.json();
      setRelationships(data.data); // Asignar las relaciones al estado
    } catch (error) {
      console.error('Error al obtener las relaciones:', error);
    }
  };

  const handleDelete = async () => {
    if (!session || !session.user || !selectedStudentId) {
      setMessage({ type: 'error', text: 'No se pudo obtener la información del tutor o del estudiante. Por favor, intente nuevamente.' });
      setShowMessageModal(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/userRelations/${session.user}/${selectedStudentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la relación');
      }

      setMessage({ type: 'success', text: 'Relación eliminada con éxito' });
      setShowMessageModal(true);
      fetchRelationships(session.user); // Actualizar la lista de relaciones
    } catch (error) {
      console.error('Error al eliminar la relación:', error);
      setMessage({ type: 'error', text: 'Hubo un error al eliminar la relación.' });
      setShowMessageModal(true);
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <PrivateRoute>
      <main>
        <SeparadorMorado />
        <div className="bg-white shadow-md mx-auto my-20 mt-8 py-10 p-6 rounded-lg w-full max-w-4xl yagora">
          <div className="flex flex-col items-center mb-10">
            <div className="flex justify-between items-center w-full">
              <Volver img='/img/home/regresar/morado.webp' href='/' className="mb-4" />
              <h2 className="flex-grow font-bold text-3xl text-center text-purple-800 super">BIENVENIDO A CONTROLES PARENTALES</h2>
            </div>
            <img src="/img/personajes/starly/starly_corona.webp" alt="Estudiante" className="mb-4 w-24 h-24 object-contain" />
            <p className="mb-8 text-cente text-xl">Aquí podrás añadir y ver el progreso de tus estudiantes a cargo</p>
            <button
              onClick={openModal}
              className="flex items-center bg-blue-500 hover:bg-blue-700 mt-4 px-6 py-2 rounded-full font-bold text-lg text-white transition duration-200"
            >
              <FiPlus className="mr-2 text-xl" /> Agregar Estudiante
            </button>
          </div>

          {message.text && !showModal && !showDeleteModal && (
            <div className={`mb-4 p-4 border rounded ${message.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'}`}>
              {message.text}
            </div>
          )}

          {/* Listado de Relaciones */}
          <div className="mt-14 text-xl">
            {relationships.length > 0 ? (
              <ul className="gap-6 grid grid-cols-1 md:grid-cols-2">
                {relationships.map((relationship) => (
                  <li key={relationship.studentInfo.id} className="flex flex-col items-center bg-gray-100 shadow-md p-4 rounded-lg">
                    <h3 className="mb-2 font-bold text-center text-xl">{relationship.studentInfo.name} {relationship.studentInfo.lastname}</h3>
                    <img
                      src={relationship.studentInfo.character?.image || "/img/personajes/starly/starly_corona.webp"}
                      alt="Estudiante"
                      className="mb-4 w-24 h-24 object-contain"
                    />
                    <p className="mb-1"> <span className='font-bold'>Correo:</span> {relationship.studentInfo.email}</p>
                    <p className="mb-4"> <span className='font-bold'>Nivel: </span>{relationship.studentInfo.level?.name || 'No especificado'}</p>
                    <div className="flex space-x-4">
                      <button className="flex items-center bg-purple-500 hover:bg-purple-600 px-3 py-2 rounded-full text-white transition duration-200">
                        <FiEye className="text-xl" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(relationship.studentInfo.id)}
                        className="flex items-center bg-red-500 hover:bg-red-600 px-3 py-2 rounded-full text-white transition duration-200"
                      >
                        <FiTrash2 className="text-xl" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No se encontraron relaciones con estudiantes.</p>
            )}
          </div>

          {/* Modal para agregar estudiante */}
          {showModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 yagora">
              <div className="relative bg-white shadow-lg mx-auto mt-20 p-8 rounded-lg w-full max-w-lg outline-none">
                <h2 className="mb-6 font-bold text-2xl text-center text-purple-800">Agregar Relación (Tutor-Estudiante)</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="studentEmail" className="block mb-1 font-medium text-gray-700">Correo del Estudiante</label>
                    <input
                      type="email"
                      id="studentEmail"
                      name="studentEmail"
                      value={formData.studentEmail}
                      onChange={handleChange}
                      required
                      className="block border-gray-400 focus:ring-opacity-50 shadow-sm form-control mt-1 px-4 py-2 focus:border-blue-400 rounded-lg focus:ring focus:ring-blue-300 w-full text-lg"
                    />
                  </div>
                  <div className="flex justify-end mt-8">
                    <button type="button" onClick={closeModal} className="bg-gray-400 hover:bg-gray-600 mr-4 px-6 py-2 rounded-full font-bold text-lg text-white transition duration-200">
                      Cancelar
                    </button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 px-6 py-2 rounded-full font-bold text-lg text-white transition duration-200">
                      Crear Relación
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Minimodal para mensajes de éxito o error */}
          {showMessageModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 yagora">
              <div className="bg-white shadow-lg mx-auto p-6 rounded-lg w-full max-w-sm text-center">
                <p className={`mb-4 ${message.type === 'success' ? 'text-green-700' : 'text-red-700'} font-bold text-lg`}>{message.text}</p>
                <button
                  onClick={closeMessageModal}
                  className="bg-blue-500 hover:bg-blue-700 px-6 py-2 rounded-full font-bold text-lg text-white transition duration-200"
                >
                  Aceptar
                </button>
              </div>
            </div>
          )}

          {/* Modal para confirmar eliminación */}
          {showDeleteModal && (
            <DeleteModal
              isOpen={showDeleteModal}
              onClose={closeDeleteModal}
              onConfirm={handleDelete}
            />
          )}
        </div>
        <SeparadorMorado />
      </main>
    </PrivateRoute>
  );
};

export default AddRelationshipForm;
