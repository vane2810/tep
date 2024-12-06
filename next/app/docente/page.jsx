"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSession from '@/hooks/useSession';
import DeleteModal from '@/components/modals/admin/contenido/deleteModal';
import Volver from '@/components/elements/botonVolver';
import { SeparadorAnaranjado } from '@/components/separador';
import PrivateRoute from '@/components/PrivateRoute';
import { FiPlus, FiTrash2, FiEye } from "react-icons/fi";
import Loading from '@/components/elements/loading';

const TeacherStudentManagement = () => {
    const router = useRouter();
    const { session } = useSession(); // Obtener la sesión del docente autenticado
    const [students, setStudents] = useState([]); // Estado para almacenar las relaciones (estudiantes)
    const [selectedLevel, setSelectedLevel] = useState(''); // Estado para el filtro de nivel
    const [filteredStudents, setFilteredStudents] = useState([]); // Estado para almacenar los estudiantes filtrados por nivel
    const [formData, setFormData] = useState({ studentEmail: '' }); // Estado para el formulario de agregar estudiante
    const [message, setMessage] = useState({ type: '', text: '' }); // Estado para los mensajes
    const [showModal, setShowModal] = useState(false); // Estado para el modal de agregar
    const [showMessageModal, setShowMessageModal] = useState(false); // Estado para el minimodal de mensajes
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para el modal de eliminar
    const [selectedStudentId, setSelectedStudentId] = useState(null); // Estado para almacenar el ID del estudiante seleccionado para eliminar
    const [loading, setLoading] = useState(true); // Estado para indicar si los datos están cargando

    // Niveles disponibles definidos manualmente
    const levels = [
        { id: 1, name: 'Nivel 1' },
        { id: 2, name: 'Nivel 2' },
        { id: 3, name: 'Nivel 3' },
    ];

    // Verificar el contenido de la sesión y obtener estudiantes
    useEffect(() => {
        if (session?.user) {
            fetchRelationships(session.user); // Obtener estudiantes (relaciones)
        }
    }, [session]);

    // Obtener las relaciones del docente
    const fetchRelationships = async (teacherId) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3001/api/userRelations/${teacherId}`);
            if (!response.ok) {
                throw new Error('Error al obtener las relaciones');
            }
            const data = await response.json();
            setStudents(data.data); // Asignar los estudiantes al estado
            setFilteredStudents(data.data); // Inicialmente, mostrar todos los estudiantes
        } catch (error) {
            console.error('Error al obtener las relaciones:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filtrar estudiantes por nivel
    const handleLevelChange = (e) => {
        const levelId = e.target.value;
        setSelectedLevel(levelId);
        if (levelId === '') {
            setFilteredStudents(students);
        } else {
            const filtered = students.filter(student => student.studentInfo.levelId === parseInt(levelId));
            setFilteredStudents(filtered);
        }
    };

    // Abrir el modal para agregar estudiante
    const openModal = () => setShowModal(true);

    // Cerrar el modal para agregar estudiante
    const closeModal = () => {
        setShowModal(false);
        setFormData({ studentEmail: '' }); 
        setMessage({ type: '', text: '' }); 
    };

    // Manejar el formulario para agregar estudiantes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!session || !session.user) {
            setMessage({ type: 'error', text: 'No se pudo obtener la información del docente. Por favor, inicie sesión.' });
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
        const existingRelationship = students.find(
            (student) => student.studentInfo.email === formData.studentEmail
        );
        if (existingRelationship) {
            setMessage({ type: 'error', text: 'El estudiante ya está agregado.' });
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
                    guardianId: session.user, // Utiliza el id del docente desde la sesión
                }),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el estudiante');
            }

            setMessage({ type: 'success', text: 'Estudiante agregado con éxito' });
            setShowMessageModal(true);
            fetchRelationships(session.user); // Actualizar la lista de estudiantes
        } catch (error) {
            console.error('Error al agregar el estudiante:', error);
            setMessage({ type: 'error', text: 'Hubo un error al agregar el estudiante. Por favor, verifique los datos.' });
            setShowMessageModal(true);
        }
    };

    // Abrir el modal para confirmar la eliminación
    const openDeleteModal = (studentId) => {
        setSelectedStudentId(studentId);
        setShowDeleteModal(true);
    };

    // Cerrar el modal de eliminación
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedStudentId(null);
    };

    // Manejar la eliminación de un estudiante
    const handleDelete = async () => {
        if (!session || !session.user || !selectedStudentId) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/userRelations/${session.user}/${selectedStudentId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el estudiante');
            }

            setMessage({ type: 'success', text: 'Estudiante eliminado con éxito' });
            setShowMessageModal(true);
            fetchRelationships(session.user); // Actualizar la lista de relaciones
        } catch (error) {
            console.error('Error al eliminar el estudiante:', error);
            setMessage({ type: 'error', text: 'Hubo un error al eliminar el estudiante.' });
            setShowMessageModal(true);
        } finally {
            closeDeleteModal();
        }
    };

    // Redirigir a la página de progreso del estudiante
    const handleViewProgress = (studentId) => {
        router.push(`/docente/${studentId}`);
    };

    // Manejar el cierre del minimodal de mensajes
    const closeMessageModal = () => {
        if (message.type === 'success') {
            closeModal(); // Cerrar también el modal principal de agregar estudiante si fue exitoso
        }
        setShowMessageModal(false);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <PrivateRoute>
            <main>
                <SeparadorAnaranjado />
                <div className="bg-white shadow-md mx-auto my-20 mt-8 py-10 p-6 rounded-lg w-full max-w-6xl yagora">
                    <div className="flex flex-col items-center mb-10">
                        <div className="flex justify-between items-center w-full">
                            <Volver img='/img/home/regresar/naranja.webp' href='/' className="mb-4" />
                            <h2 className="flex-grow font-bold text-3xl text-center text-orange-800 super">GESTIÓN DE ESTUDIANTES</h2>
                        </div>
                        <img src="/img/progreso/docente.webp" alt="Docente" className="mb-4 w-60 h-60 object-contain" />
                        <p className="mb-8 text-center text-xl">Aquí podrás ver y gestionar el progreso de tus estudiantes</p>
                        <button
                            onClick={openModal}
                            className="flex items-center bg-orange-400 hover:bg-orange-600 mt-4 px-6 py-2 rounded-full font-bold text-lg text-white transition duration-200"
                        >
                            <FiPlus className="mr-2 text-xl" /> Agregar Estudiante
                        </button>
                    </div>

                    {/* Filtro por nivel */}
                    <div className="mb-8 w-full">
                        <label htmlFor="levelFilter" className="block mb-2 font-bold text-gray-700">Filtrar por Nivel</label>
                        <select
                            id="levelFilter"
                            value={selectedLevel}
                            onChange={handleLevelChange}
                            className="block border-orange-400 p-2 rounded-lg w-60"
                        >
                            <option value="">Todos los Niveles</option>
                            {levels.map((level) => (
                                <option key={level.id} value={level.id}>{level.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tabla de Estudiantes */}
                    <div className="w-full overflow-x-auto">
                        <table className="border-collapse w-full table-auto">
                            <thead>
                                <tr className="bg-orange-400 text-white">
                                    <th className="border-gray-300 p-3 border">Nombre</th>
                                    <th className="border-gray-300 p-3 border">Correo</th>
                                    <th className="border-gray-300 p-3 border">Nivel</th>
                                    <th className="border-gray-300 p-3 border">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student) => (
                                        <tr key={student.studentInfo.id} className="bg-gray-100 hover:bg-orange-50 text-center transition duration-200">
                                            <td className="border-gray-300 p-3 border">{student.studentInfo.name} {student.studentInfo.lastname}</td>
                                            <td className="border-gray-300 p-3 border">{student.studentInfo.email}</td>
                                            <td className="border-gray-300 p-3 border">{student.studentInfo.level?.name || 'No especificado'}</td>
                                            <td className="border-gray-300 p-3 border">
                                                <div className="flex justify-center space-x-4">
                                                    <button
                                                        onClick={() => handleViewProgress(student.studentInfo.id)}
                                                        className="flex justify-center items-center bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full text-white transition duration-200"
                                                    >
                                                        <FiEye className="text-xl" />
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(student.studentInfo.id)}
                                                        className="flex justify-center items-center bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white transition duration-200"
                                                    >
                                                        <FiTrash2 className="text-xl" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="p-3 text-gray-600">No se encontraron estudiantes para el nivel seleccionado</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal para agregar estudiante */}
                    {showModal && (
                        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 yagora">
                            <div className="relative bg-white shadow-lg mx-auto mt-20 p-8 rounded-lg w-full max-w-lg outline-none">
                                <h2 className="mb-6 font-bold text-2xl text-center text-orange-800">Agregar Estudiante</h2>
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
                                            className="block border-orange-400 focus:border-orange-400 focus:ring-opacity-50 shadow-sm form-control mt-1 px-4 py-2 rounded-lg focus:ring focus:ring-orange-300 w-full text-lg"
                                        />
                                    </div>
                                    <div className="flex justify-end mt-8">
                                        <button type="button" onClick={closeModal} className="bg-gray-400 hover:bg-gray-600 mr-4 px-6 py-2 rounded-full font-bold text-lg text-white transition duration-200">
                                            Cancelar
                                        </button>
                                        <button type="submit" className="bg-orange-500 hover:bg-orange-700 px-6 py-2 rounded-full font-bold text-lg text-white transition duration-200">
                                            Agregar
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
                                    className="bg-orange-500 hover:bg-orange-700 px-6 py-2 rounded-full font-bold text-lg text-white transition duration-200"
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

                <SeparadorAnaranjado />
            </main>
        </PrivateRoute>
    );
};

export default TeacherStudentManagement;
