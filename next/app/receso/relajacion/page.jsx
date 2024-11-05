// components/ActivityGallery.js
import React from 'react';

const ActivityGallery = () => {
  // Lista de actividades, cada una con título y descripción
  const activities = [
    { title: "Pinta y Crea", description: "Explora el arte con una actividad de pintura digital.", imgSrc: "/img/actividades/pintar.png" },
    { title: "Reto de Origami", description: "Aprende a hacer figuras de origami paso a paso.", imgSrc: "/img/actividades/origami.png" },
    { title: "Jardinería en Casa", description: "Descubre cómo plantar y cuidar tus propias plantas.", imgSrc: "/img/actividades/jardineria.png" },
    { title: "Cocina Fácil", description: "Prueba recetas sencillas y deliciosas para hacer en casa.", imgSrc: "/img/actividades/cocina.png" },
    { title: "Manualidades Recicladas", description: "Crea arte usando materiales reciclados.", imgSrc: "/img/actividades/manualidades.png" },
  ];

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-green-700 mb-8" style={{ fontFamily: 'Super Happy, sans-serif' }}>
        Actividades Divertidas
      </h1>
      <p className="text-gray-600 mb-6 text-center" style={{ fontFamily: 'Wondercity, sans-serif' }}>
        Elige una actividad y diviértete mientras aprendes algo nuevo.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {activities.map((activity, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform">
            <img
              src={activity.imgSrc}
              alt={activity.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-green-700">{activity.title}</h2>
              <p className="text-gray-600 mt-2">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityGallery;
