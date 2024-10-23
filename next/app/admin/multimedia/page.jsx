"use client";
import React, { useState, useEffect } from "react";

export default function AdminMultimediaPage() {
  const [temas, setTemas] = useState([]);
  const [newTema, setNewTema] = useState({ title: "", img: "", videoUrl: "" });

  useEffect(() => {
    // Cargar los temas actuales (Simulación de llamada a API o base de datos)
    const temasGuardados = localStorage.getItem("temas");
    if (temasGuardados) {
      setTemas(JSON.parse(temasGuardados));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTema({ ...newTema, [name]: value });
  };

  const handleAddTema = () => {
    const updatedTemas = [...temas, { ...newTema, id: temas.length + 1 }];
    setTemas(updatedTemas);
    localStorage.setItem("temas", JSON.stringify(updatedTemas));
    setNewTema({ title: "", img: "", videoUrl: "" });
  };

  const handleDeleteTema = (id) => {
    const updatedTemas = temas.filter((tema) => tema.id !== id);
    setTemas(updatedTemas);
    localStorage.setItem("temas", JSON.stringify(updatedTemas));
  };

  return (
    <div className="mx-auto p-8 container">
      <h1 className="mb-8 font-bold text-2xl">Administrar Contenido Multimedia</h1>

      {/* Formulario para añadir o editar tema */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl">Añadir Nuevo Tema</h2>
        <input
          type="text"
          name="title"
          placeholder="Título del Tema"
          value={newTema.title}
          onChange={handleChange}
          className="mr-2 mb-2 p-2 border"
        />
        <input
          type="text"
          name="img"
          placeholder="URL de la Imagen"
          value={newTema.img}
          onChange={handleChange}
          className="mr-2 mb-2 p-2 border"
        />
        <input
          type="text"
          name="videoUrl"
          placeholder="URL del Video"
          value={newTema.videoUrl}
          onChange={handleChange}
          className="mr-2 mb-2 p-2 border"
        />
        <button onClick={handleAddTema} className="bg-blue-500 px-4 py-2 rounded text-white">
          Añadir Tema
        </button>
      </div>

      {/* Lista de temas actuales */}
      <div>
        <h2 className="mb-4 text-xl">Temas Actuales</h2>
        {temas.length === 0 ? (
          <p>No hay temas añadidos.</p>
        ) : (
          <ul>
            {temas.map((tema) => (
              <li key={tema.id} className="bg-white shadow mb-4 p-4 border rounded">
                <h3 className="font-bold text-lg">{tema.title}</h3>
                <img src={tema.img} alt={tema.title} className="mb-2 w-32 h-auto" />
                <p>Video URL: {tema.videoUrl}</p>
                <button
                  onClick={() => handleDeleteTema(tema.id)}
                  className="bg-red-500 mt-2 px-2 py-1 rounded text-white"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
