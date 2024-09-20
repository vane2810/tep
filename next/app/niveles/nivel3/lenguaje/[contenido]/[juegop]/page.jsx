import React from "react";
import Link from 'next/link';

export default function MinijuegosPage({ id }) {
  const minijuegos = [
    {
      id: 1,
      title: 'Mini Juego 1',
      description: 'Un divertido mini juego sobre lenguaje.',
    },
    {
      id: 2,
      title: 'Mini Juego 2',
      description: 'Desafía tus conocimientos con este juego.',
    },
    {
      id: 3,
      title: 'Mini Juego 3',
      description: 'Pon a prueba tu memoria en este minijuego.',
    },
  ];

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="mx-auto py-12 container"> {/* Asegúrate de que "container" esté bien aplicado */}
        <h1 className="mb-8 font-bold text-4xl text-center">Selecciona un Mini Juego para la Lección {id}</h1>
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {minijuegos.map((minijuego) => (
            <div key={minijuego.id} className="bg-white shadow-lg p-6 rounded-lg">
              <h2 className="font-semibold text-xl">{minijuego.title}</h2>
              <p className="mb-4 text-gray-600">{minijuego.description}</p>
              <Link 
                href={`/niveles/nivel3/lenguaje/${id}/${id}/${minijuego.id}`}
                className="bg-purple-600 hover:bg-purple-800 px-4 py-2 rounded text-white transition"
              >
                Jugar {minijuego.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
