"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaCalculator, FaBook, FaGlobe, FaLanguage } from "react-icons/fa";

export default function AsignaturasPorNivelPage() {
  const params = useParams(); // Obtenemos los parámetros de la URL
  const id = params?.id; // Obtenemos el 'id' del nivel desde los parámetros

  // Validar si el 'id' es válido
  if (!id) {
    return <div>Error: No se ha encontrado el nivel especificado.</div>;
  }

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {/* Título centrado */}
      <div className="flex flex-col items-center mt-10 mb-10">
        <h1 className="font-semibold text-4xl text-black story">
          Asignaturas para el Nivel {id}
        </h1>
      </div>

      {/* Contenedor de asignaturas */}
      <div className="gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-10 mb-8 story">
        {/* Matemáticas */}
        <Link
          href={`/admin/contents/${id}/matematicas`}
          className="flex flex-col items-center group"
        >
          <FaCalculator className="group-hover:scale-110 mb-6 text-9xl text-blue-500 transition duration-300" />
          <span className="group-hover:text-blue-700 font-semibold text-2xl text-black transition duration-300">
            Matemáticas
          </span>
        </Link>

        {/* Lenguaje */}
        <Link
          href={`/admin/contents/${id}/lenguaje`}
          className="flex flex-col items-center group"
        >
          <FaLanguage className="group-hover:scale-110 mb-6 text-9xl text-green-500 transition duration-300" />
          <span className="group-hover:text-green-700 font-semibold text-2xl text-black transition duration-300">
            Lenguaje
          </span>
        </Link>

        {/* Sociales */}
        <Link
          href={`/admin/contents/${id}/sociales`}
          className="flex flex-col items-center group"
        >
          <FaGlobe className="group-hover:scale-110 mb-6 text-9xl text-yellow-500 transition duration-300" />
          <span className="group-hover:text-yellow-700 font-semibold text-2xl text-black transition duration-300">
            Sociales
          </span>
        </Link>

        {/* Inglés */}
        <Link
          href={`/admin/contents/${id}/ingles`}
          className="flex flex-col items-center group"
        >
          <FaBook className="group-hover:scale-110 mb-6 text-9xl text-red-500 transition duration-300" />
          <span className="group-hover:text-red-700 font-semibold text-2xl text-black transition duration-300">
            Inglés
          </span>
        </Link>
      </div>
    </div>
  );
}
