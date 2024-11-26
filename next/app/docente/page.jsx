"use client";
import React, { useState, useContext } from "react";
import { useRouter } from 'next/navigation'; // Importar useRouter
import { SessionContext } from '@/context/session';
import Volver from "@/components/elements/botonVolver";
import { MdDelete, MdVisibility, MdPersonAdd } from 'react-icons/md';

export default function GestionEstudiantesSimuladaPage() {
    const { session } = useContext(SessionContext);
    const router = useRouter(); // Instanciar el router
    const [estudiantes, setEstudiantes] = useState([
        { id: 1, email: 'prueba1@gmail.com' },
    ]);
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);

    // Lista de correos permitidos
    const correosPermitidos = [
        'prueba001@gmail.com',
        'prueba002@gmail.com',
        'prueba003@gmail.com',
    ];

    // Simulación de agregar un nuevo estudiante
    const handleAgregarEstudiante = () => {
        if (!email) {
            setMensaje('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        // Validar si el correo tiene un formato válido
        // Expresión regular optimizada para evitar backtracking excesivo
        const emailRegex = /^[\w\.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            setMensaje('El formato del correo no es válido.');
            return;
        }

        // Verificar si el correo está en la lista de correos permitidos
        if (!correosPermitidos.includes(email)) {
            setMensaje('El correo ingresado no está autorizado.');
            return;
        }

        // Verificar si el estudiante ya está agregado
        if (estudiantes.some(est => est.email === email)) {
            setMensaje('Este estudiante ya está agregado.');
            return;
        }

        const nuevoEstudiante = {
            id: estudiantes.length + 1,
            email,
        };

        setEstudiantes([...estudiantes, nuevoEstudiante]);
        setMensaje('Estudiante agregado con éxito.');
        setEmail('');
        setMostrarModal(false); // Cerrar el modal después de guardar

        // Limpiar el mensaje después de unos segundos
        setTimeout(() => setMensaje(''), 3000);
    };

    // Eliminar un estudiante de la lista simulada
    const handleEliminarEstudiante = (estudianteId) => {
        setEstudiantes(estudiantes.filter(est => est.id !== estudianteId));
        setMensaje('Estudiante eliminado con éxito.');
        setTimeout(() => setMensaje(''), 3000);
    };

    // Redirigir a la página específica del estudiante
    const handleVerEstudiante = (estudianteId) => {
        router.push(`/estudiantes/${estudianteId}`); // Aquí redirige a la página específica del estudiante
    };

    return (
        <main className="relative flex flex-col items-center bg-gray-50 p-6 w-full min-h-screen">
            {/* Botón Volver en la esquina superior izquierda */}
            <div className="top-4 left-4 absolute">
                <Volver href='/' />
            </div>

            {/* Título de la página */}
            <h2 className="mt-16 mb-4 font-bold text-4xl text-blue-800 text-center story">
                Supervisión de estudiantes
            </h2>

            {/* Contenedor principal */}
            <div className="bg-white shadow-lg mt-4 p-6 rounded-lg w-full max-w-4xl">
                {mensaje && !mostrarModal && (
                    <div className="relative border-green-400 bg-green-100 mb-4 px-4 py-3 border rounded text-green-700">
                        {mensaje}
                    </div>
                )}

                {/* Botón para abrir el modal de agregar estudiante */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setMostrarModal(true)}
                        className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 p-3 rounded-md text-white transition duration-300"
                    >
                        <MdPersonAdd size={24} />
                        <span>Agregar Estudiante</span>
                    </button>
                </div>

                {/* Lista de estudiantes */}
                {estudiantes.length > 0 ? (
                    <table className="border-collapse bg-white shadow-md mt-4 rounded-md w-full table-auto">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left">ID</th>
                                <th className="px-6 py-3 text-left">Correo Electrónico</th>
                                <th className="px-6 py-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estudiantes.map((estudiante) => (
                                <tr
                                    key={estudiante.id}
                                    className="hover:bg-blue-50 even:bg-gray-100 transition duration-200"
                                >
                                    <td className="px-6 py-4 border-t">{estudiante.id}</td>
                                    <td className="px-6 py-4 border-t font-semibold">{estudiante.email}</td>
                                    <td className="px-6 py-4 border-t text-center">
                                        <div className="flex justify-center space-x-4">
                                            <button
                                                onClick={() => handleEliminarEstudiante(estudiante.id)}
                                                className="text-red-500 hover:text-red-700 transition duration-200"
                                            >
                                                <MdDelete size={24} />
                                            </button>
                                            <button
                                                onClick={() => router.push(`/docente/${estudiante.id}`)}
                                                className="text-blue-500 hover:text-blue-700 transition duration-200"
                                            >
                                                <MdVisibility size={24} />
                                            </button>


                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="mt-6 text-gray-600">No hay estudiantes agregados aún.</p>
                )}

                {/* Modal para agregar estudiante */}
                {mostrarModal && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
                            <h3 className="mb-4 font-semibold text-blue-800 text-center text-xl">Agregar Estudiante</h3>
                            {mensaje && (
                                <div className="relative bg-red-100 mb-4 px-4 py-3 border border-red-400 rounded text-red-700">
                                    {mensaje}
                                </div>
                            )}
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Correo Electrónico del Estudiante"
                                className="border-gray-300 mb-4 p-2 border focus:border-blue-500 rounded-md w-full focus:outline-none"
                            />
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => {
                                        setMensaje('');
                                        setMostrarModal(false);
                                    }}
                                    className="bg-gray-500 hover:bg-gray-700 p-2 rounded-md text-white transition duration-300"
                                >
                                    Cerrar
                                </button>
                                <button
                                    onClick={handleAgregarEstudiante}
                                    className="bg-blue-500 hover:bg-blue-700 p-2 rounded-md text-white transition duration-300"
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
