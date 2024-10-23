// Navigación con tabs para materias
"use client"
import { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("Matematicas");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <h2 className="mb-4 font-bold text-2xl story">Ejemplo de Pestañas</h2>
      {/* Botones de pestañas */}
      <div className="flex space-x-4 mb-6 border-b story">
        <button
          className={`py-2 px-4 text-gray-600 border-b-2 ${
            activeTab === "Matematicas"
              ? "border-blue-500 text-blue-500"
              : "border-transparent hover:border-gray-400"
          }`}
          onClick={() => handleTabClick("Matematicas")}
        >
          Matemáticas
        </button>
        <button
          className={`py-2 px-4 text-gray-600 border-b-2 ${
            activeTab === "Lenguaje"
              ? "border-blue-500 text-blue-500"
              : "border-transparent hover:border-gray-400"
          }`}
          onClick={() => handleTabClick("Lenguaje")}
        >
          Lenguaje
        </button>
        <button
          className={`py-2 px-4 text-gray-600 border-b-2 ${
            activeTab === "Sociales"
              ? "border-blue-500 text-blue-500"
              : "border-transparent hover:border-gray-400"
          }`}
          onClick={() => handleTabClick("Sociales")}
        >
          Sociales
        </button>
        <button
          className={`py-2 px-4 text-gray-600 border-b-2 ${
            activeTab === "Ingles"
              ? "border-blue-500 text-blue-500"
              : "border-transparent hover:border-gray-400"
          }`}
          onClick={() => handleTabClick("Ingles")}
        >
          Inglés
        </button>
      </div>

      {/* Contenido de las secciones */}
      {activeTab === "Matematicas" && (
        <div>
          <h3 className="font-semibold text-xl">Matemáticas</h3>
          <p className="mt-2">Contenido de la sección de matemáticas.</p>
        </div>
      )}
      {activeTab === "Lenguaje" && (
        <div>
          <h3 className="font-semibold text-xl">Lenguaje</h3>
          <p className="mt-2">Contenido de la sección de lenguaje.</p>
        </div>
      )}
      {activeTab === "Sociales" && (
        <div>
          <h3 className="font-semibold text-xl">Sociales</h3>
          <p className="mt-2">Contenido de la sección de sociales.</p>
        </div>
      )}
      {activeTab === "Ingles" && (
        <div>
          <h3 className="font-semibold text-xl">Inglés</h3>
          <p className="mt-2">Contenido de la sección de inglés.</p>
        </div>
      )}
    </div>
  );
}
