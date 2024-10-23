"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiFileText } from "react-icons/fi";
import Volver from "@/components/botonVolver";

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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-4 border-gray-200 border-t-4 rounded-full w-12 h-12 ease-linear loader"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-8 max-w-3xl container">
      <Volver href='/admin/contents'/>

      <h1 className="mb-8 font-bold text-3xl text-center text-gray-800">Archivos Disponibles</h1>

      {/* Listado de archivos */}
      <div className="bg-white shadow-md mb-8 p-6 rounded-lg">
        {archivos.length === 0 ? (
          <div className="text-center text-gray-600">No hay archivos disponibles.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {archivos.map((archivo, index) => (
              <li key={index} className="flex items-center py-4">
                <FiFileText className="mr-4 text-gray-500" size={24} />
                <button
                  onClick={() => handleFileClick(archivo)}
                  className="text-blue-600 text-lg hover:underline"
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
