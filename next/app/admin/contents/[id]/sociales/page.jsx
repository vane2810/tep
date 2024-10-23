"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DetalleArchivoPage() {
  const [archivos, setArchivos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchArchivos = async () => {
      try {
        // Cargar el archivo índice con la lista de archivos
        const res = await fetch("/assets/archivos/index.json");
        if (!res.ok) throw new Error("Error al cargar el índice de archivos.");
        const data = await res.json();
        setArchivos(data.archivos);
      } catch (error) {
        console.error("Error al cargar el índice:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArchivos();
  }, []);

  const handleFileClick = (archivo) => {
    // Redirigir a la página de detalle del archivo
    router.push(`/archivos/${archivo}`);
  };

  if (isLoading) {
    return <div>Cargando archivos...</div>;
  }

  return (
    <div className="mx-auto p-8 container">
      <h1 className="mb-8 font-bold text-2xl">Archivos Disponibles</h1>

      {/* Listado de archivos */}
      <div className="mb-8">
        {archivos.length === 0 ? (
          <div>No hay archivos disponibles.</div>
        ) : (
          <ul>
            {archivos.map((archivo, index) => (
              <li key={index} className="mb-2">
                <button
                  onClick={() => handleFileClick(archivo)}
                  className="text-blue-500 hover:underline"
                >
                  {archivo}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
