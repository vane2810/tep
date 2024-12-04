"use client"
import React, { useState, useEffect } from 'react';
import useSession from '@/hooks/useSession';

// Asegúrate de que `session` contiene el `id`
const AddRelationshipForm = () => {
  const { session } = useSession(); // Obtener la sesión del tutor/padre autenticado
  const [formData, setFormData] = useState({
    studentEmail: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  // Verificar el contenido de la sesión
  useEffect(() => {
    console.log('Sesión actual: Éxito');
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si el tutor tiene una sesión activa y contiene el `id`
    if (!session || !session.user) {
      setMessage({ type: 'error', text: 'No se pudo obtener la información del tutor. Por favor, inicie sesión.' });
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
      setFormData({ studentEmail: '' }); // Limpiar el campo de correo del estudiante
    } catch (error) {
      console.error('Error al crear la relación:', error);
      setMessage({ type: 'error', text: 'Hubo un error al crear la relación. Por favor, verifique los datos.' });
    }

    setTimeout(() => setMessage({ type: '', text: '' }), 5000); // Limpiar el mensaje después de 5 segundos
  };

  return (
    <div className="bg-white shadow-md mx-auto mt-8 p-6 rounded-lg w-full max-w-md">
      <h2 className="mb-6 font-bold text-2xl text-center text-purple-800">Agregar Relación (Tutor-Estudiante)</h2>

      {message.text && (
        <div className={`mb-4 p-4 border rounded ${message.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'}`}>
          {message.text}
        </div>
      )}

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

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 px-6 py-2 rounded-full font-bold text-lg text-white transition duration-200">
            Crear Relación
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRelationshipForm;
