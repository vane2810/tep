// Página de Administración de Comentarios de Usuarios con Datos Simulados Mejorada
"use client"
import React, { useState } from "react";
import { MdDelete } from 'react-icons/md'; 
import Volver from "@/components/botonVolver";

export default function AdminFeedbackPage() {
  // Datos simulados para los comentarios
  const [comentarios, setComentarios] = useState([
    { id: 1, nombre: 'Juan Pérez', comentario: 'La aplicación es muy buena, pero podrían mejorar la navegación.' },
    { id: 2, nombre: 'Ana García', comentario: 'Me encanta el contenido educativo, es muy útil para mis hijos.' },
    { id: 3, nombre: 'Carlos López', comentario: 'Tuve algunos problemas técnicos al acceder a ciertos módulos.' },
    { id: 4, nombre: 'María Fernández', comentario: 'Excelente aplicación, muy interactiva y fácil de usar.' },
    { id: 5, nombre: 'Luis Martínez', comentario: 'Sería bueno agregar más niveles de dificultad en los juegos.' },
  ]);
  const [mensaje, setMensaje] = useState('');

  // Eliminar comentario
  const handleEliminarComentario = (comentarioId) => {
    setComentarios(comentarios.filter(comentario => comentario.id !== comentarioId));
    setMensaje('Comentario eliminado con éxito');
    setTimeout(() => setMensaje(''), 3000); // Limpiar el mensaje después de 3 segundos
  };

  return (
    <main className="relative flex flex-col items-center bg-gray-50 p-6 w-full min-h-screen">
      {/* Botón Volver en la esquina superior izquierda */}
      <div className="top-4 left-4 absolute">
        <Volver href='/admin'/>
      </div>
      
      <div className="bg-white shadow-lg mt-18 p-6 rounded-lg w-full max-w-6xl">
        <h2 className="mb-4 font-bold text-3xl text-blue-800 text-center">
          Administración de Feedback de Usuarios
        </h2>

        {mensaje && (
          <div className="relative border-green-400 bg-green-100 mb-4 px-4 py-3 border rounded text-green-700">
            {mensaje}
          </div>
        )}

        {/* Tabla de comentarios */}
        {comentarios.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="border-collapse bg-white shadow-md mt-4 rounded-md w-full table-auto">
              <thead className="bg-blue-600 rounded-lg text-white">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Nombre</th>
                  <th className="px-6 py-3 text-left">Comentario</th>
                  <th className="px-6 py-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {comentarios.map((comentario) => (
                  <tr
                    key={comentario.id}
                    className="hover:bg-blue-50 even:bg-gray-100 transition duration-200"
                  >
                    <td className="px-6 py-4 border-t">{comentario.id}</td>
                    <td className="px-6 py-4 border-t font-semibold">{comentario.nombre}</td>
                    <td className="px-6 py-4 border-t">{comentario.comentario}</td>
                    <td className="px-6 py-4 border-t text-center">
                      <button
                        onClick={() => handleEliminarComentario(comentario.id)}
                        className="text-red-500 hover:text-red-700 transition duration-200"
                      >
                        <MdDelete size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-6 text-gray-600">No hay comentarios aún.</p>
        )}
      </div>
    </main>
  );
}
