"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaCalculator, FaBook, FaGlobe, FaLanguage } from "react-icons/fa";
import Volver from "@/components/botonVolver";

export default function AsignaturasPorNivelPage() {
  const params = useParams();
  const id = params?.id;

  if (!id) {
    return <div className="mt-10 font-semibold text-center text-red-500">Error: No se ha encontrado el nivel especificado.</div>;
  }

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <Volver href="admin/contents"/>
      <div className="flex flex-col items-center mt-16 mb-12">
        <h1 className="font-semibold text-4xl text-gray-800 story">
          Asignaturas para el Nivel {id}
        </h1>
      </div>
      
      <div className="gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-10 mb-8">
        {/* Matemáticas */}
        <Link
          href={`/admin/contents/${id}/matematicas`}
          className="flex flex-col items-center bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl p-6 rounded-lg transform transition hover:-translate-y-2 duration-300 group"
        >
          <FaCalculator className="group-hover:rotate-3 mb-6 text-9xl text-blue-500 transition duration-300" />
          <span className="group-hover:text-blue-700 font-semibold text-2xl text-black md:text-xl lg:text-2xl transition duration-300">
            Matemáticas
          </span>
        </Link>

        {/* Lenguaje */}
        <Link
          href={`/admin/contents/${id}/lenguaje`}
          className="flex flex-col items-center bg-white hover:bg-green-50 shadow-lg hover:shadow-xl p-6 rounded-lg transform transition hover:-translate-y-2 duration-300 group"
        >
          <FaLanguage className="group-hover:rotate-3 mb-6 text-9xl text-green-500 transition duration-300" />
          <span className="group-hover:text-green-700 font-semibold text-2xl text-black md:text-xl lg:text-2xl transition duration-300">
            Lenguaje
          </span>
        </Link>

        {/* Sociales */}
        <Link
          href={`/admin/contents/${id}/sociales`}
          className="flex flex-col items-center bg-white hover:bg-yellow-50 shadow-lg hover:shadow-xl p-6 rounded-lg transform transition hover:-translate-y-2 duration-300 group"
        >
          <FaGlobe className="group-hover:rotate-3 mb-6 text-9xl text-yellow-500 transition duration-300" />
          <span className="group-hover:text-yellow-700 font-semibold text-2xl text-black md:text-xl lg:text-2xl transition duration-300">
            Sociales
          </span>
        </Link>

        {/* Inglés */}
        <Link
          href={`/admin/contents/${id}/ingles`}
          className="flex flex-col items-center bg-white hover:bg-red-50 shadow-lg hover:shadow-xl p-6 rounded-lg transform transition hover:-translate-y-2 duration-300 group"
        >
          <FaBook className="group-hover:rotate-3 mb-6 text-9xl text-red-500 transition duration-300" />
          <span className="group-hover:text-red-700 font-semibold text-2xl text-black md:text-xl lg:text-2xl transition duration-300">
            Inglés
          </span>
        </Link>
      </div>
    </div>
  );
}
