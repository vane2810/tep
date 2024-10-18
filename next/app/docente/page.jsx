// Página de Gestión de Estudiantes Simulada
"use client"
import React, { useState, useContext } from "react";
import { SessionContext } from '@/context/session';

export default function GestionEstudiantesSimuladaPage() {
  const { session } = useContext(SessionContext);
  const [estudiantes, setEstudiantes] = useState([
    { id: 1, nombre: 'Estudiante Simulado 1', email: 'estudiante1@example.com' },
    { id: 2, nombre: 'Estudiante Simulado 2', email: 'estudiante2@example.com' },
  ]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Simulación de agregar un nuevo estudiante
  const handleAgregarEstudiante = () => {
    if (!nombre || !email) {
      setMensaje('Por favor, ingrese un nombre y correo electrónico válidos.');
      return;
    }

    const nuevoEstudiante = {
      id: estudiantes.length + 1,
      nombre,
      email,
    };

    setEstudiantes([...estudiantes, nuevoEstudiante]);
    setMensaje('Estudiante agregado con éxito.');
    setNombre('');
    setEmail('');

    // Limpiar el mensaje después de unos segundos
    setTimeout(() => setMensaje(''), 3000);
  };

  // Eliminar un estudiante de la lista simulada
  const handleEliminarEstudiante = (estudianteId) => {
    setEstudiantes(estudiantes.filter(est => est.id !== estudianteId));
    setMensaje('Estudiante eliminado con éxito.');
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <main className="flex flex-col items-center bg-gray-50 p-6 min-h-screen">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-4xl">
        <h2 className="mb-4 font-bold text-2xl text-blue-800 text-center">
          Gestión de Estudiantes (Simulada)
        </h2>

        {mensaje && (
          <div className="relative border-green-400 bg-green-100 mb-4 px-4 py-3 border rounded text-green-700">
            {mensaje}
          </div>
        )}

        {/* Formulario para agregar un nuevo estudiante */}
        <div className="mb-6">
          <h3 className="mb-2 font-semibold">Agregar Estudiante</h3>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del Estudiante"
            className="border-gray-300 mb-2 p-2 border focus:border-blue-500 rounded-md w-full focus:outline-none"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo Electrónico del Estudiante"
            className="border-gray-300 mb-4 p-2 border focus:border-blue-500 rounded-md w-full focus:outline-none"
          />
          <button
            onClick={handleAgregarEstudiante}
            className="bg-blue-500 hover:bg-blue-700 p-3 rounded-md w-full text-white transition duration-300"
          >
            Agregar Estudiante
          </button>
        </div>

        {/* Lista de estudiantes */}
        {estudiantes.length > 0 ? (
          <table className="border-collapse bg-white shadow-md mt-4 rounded-md w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Nombre</th>
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
                  <td className="px-6 py-4 border-t font-semibold">{estudiante.nombre}</td>
                  <td className="px-6 py-4 border-t">{estudiante.email}</td>
                  <td className="px-6 py-4 border-t text-center">
                    <button
                      onClick={() => handleEliminarEstudiante(estudiante.id)}
                      className="text-red-500 hover:text-red-700 transition duration-200"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-6 text-gray-600">No hay estudiantes agregados aún.</p>
        )}
      </div>
    </main>
  );
}
