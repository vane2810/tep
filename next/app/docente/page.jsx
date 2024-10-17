// Página de Gestión de Estudiantes para Docentes
"use client"
import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from '@/context/session';
import Link from 'next/link';

export default function GestionEstudiantesPage() {
  const { session } = useContext(SessionContext);
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);

  // Obtener la lista de estudiantes asociados al docente
  useEffect(() => {
    const obtenerEstudiantes = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/docentes/estudiantes/${session.user.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEstudiantes(data);
        } else {
          console.error('Error al obtener los estudiantes:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener los estudiantes:', error);
      }
    };

    if (session?.user?.role === 'docente') {
      obtenerEstudiantes();
    }
  }, [session]);

  // Agregar un estudiante por correo electrónico
  const handleAgregarEstudiante = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/docentes/agregar-estudiante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const nuevoEstudiante = await response.json();
        setEstudiantes([...estudiantes, nuevoEstudiante]);
        setMensaje('Estudiante agregado con éxito');
      } else {
        const data = await response.json();
        setMensaje(data.error || 'No se pudo agregar al estudiante');
      }
    } catch (error) {
      setMensaje('Error al conectar con el servidor');
    }
  };

  // Eliminar un estudiante
  const handleEliminarEstudiante = async (estudianteId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/docentes/eliminar-estudiante/${estudianteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setEstudiantes(estudiantes.filter(est => est.id !== estudianteId));
        setMensaje('Estudiante eliminado con éxito');
      } else {
        const data = await response.json();
        setMensaje(data.error || 'No se pudo eliminar al estudiante');
      }
    } catch (error) {
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <main className="p-4">
      <h2 className="mb-4 font-bold text-2xl">Gestión de Estudiantes</h2>
      {/* Formulario para agregar estudiante */}
      <div className="my-4">
        <label className="block mb-2">Correo electrónico del estudiante:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border w-full"
        />
        <button
          onClick={handleAgregarEstudiante}
          className="bg-blue-500 hover:bg-blue-700 p-2 rounded text-white transition duration-300"
        >
          Agregar Estudiante
        </button>
      </div>
      {mensaje && <p>{mensaje}</p>}

      {/* Tabla de estudiantes */}
      {estudiantes.length > 0 ? (
        <table className="border-collapse bg-white shadow-lg mt-8 rounded-lg w-full">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Correo Electrónico</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((estudiante, index) => (
              <tr key={index} className="odd:bg-gray-100 even:bg-white text-center">
                <td className="px-4 py-2 border">{estudiante.nombre}</td>
                <td className="px-4 py-2 border">{estudiante.email}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleEliminarEstudiante(estudiante.id)}
                    className="bg-red-500 hover:bg-red-700 mr-2 px-3 py-1 rounded text-white transition duration-300"
                  >
                    Eliminar
                  </button>
                  <Link href={`/perfil-estudiante/${estudiante.id}`}>
                    <button className="bg-green-500 hover:bg-green-700 px-3 py-1 rounded text-white transition duration-300">
                      Ver Perfil
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay estudiantes agregados aún.</p>
      )}
    </main>
  );
}
