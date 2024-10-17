"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function DetalleArchivoPage() {
  const [contenido, setContenido] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const { id } = params; // Obtener el id del archivo desde la URL

  useEffect(() => {
    const fetchContenido = async () => {
      try {
        const res = await fetch(`/api/contenidos/nivel1/contenido${id}`); // Cargar el archivo específico desde la API
        if (!res.ok) throw new Error('Error al cargar el contenido del archivo');
        const data = await res.json();
        setContenido(data);
      } catch (error) {
        console.error('Error al cargar el archivo:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContenido();
  }, [id]);

  if (isLoading) {
    return <div>Cargando archivo...</div>;
  }

  if (!contenido) {
    return <div>No se encontró el contenido del archivo.</div>;
  }

  return (
    <div className="mx-auto p-8 container">
      <h1 className="mb-8 font-bold text-2xl">Detalle del Contenido - {archivo}</h1>

      <div className="mb-4">
        <strong>Título General:</strong> {contenido.tituloGeneral || 'No disponible'}
      </div>

      {contenido.lecciones && (
        <>
          <h2 className="mt-8 mb-4 font-bold text-xl">Lecciones</h2>
          {contenido.lecciones.map((leccion, index) => (
            <div key={index} className="mb-4">
              <strong>Título de la Lección:</strong> {leccion.titulo}
              <p>{leccion.descripcion}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
