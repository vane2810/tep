// components/VideoGallery.js
import React from 'react';
import Volver from '@/components/elements/botonVolver';

const VideoGallery = () => {
  // Lista de videos, cada uno con título y enlace
  const videos = [
    { title: "Las aventuras de Starly", url: "https://www.youtube.com/embed/6NFLyjp6TGg" },
    { title: "Starly comienza su viaje", url: "https://www.youtube.com/embed/dcvOpuxy6fw" },
    { title: "Starly visita el planeta Celestia", url: "https://www.youtube.com/embed/KIvGUk-0H9w" },
    { title: "Starly llega al planeta Kaory", url: "https://www.youtube.com/embed/6J7PfzhAskA" },
    { title: "Starly llega al planeta Cosmo", url: "https://www.youtube.com/embed/ZOhmOj7jUwg" },
    { title: "La tierra del tesoro", url: "https://www.youtube.com/embed/yY4E8qAtn8Q" },
  ];

  return (
    <div className="relative flex flex-col justify-center items-center bg-blue-50 p-4 min-h-screen yagora">
      {/* Botón Volver en la esquina superior izquierda */}
      <div className="top-4 left-4 absolute">
        <Volver href="/receso" />
      </div>

      <h1 className="my-8 font-bold text-3xl text-blue-700" style={{ fontFamily: 'super, sans-serif' }}>
        GALERÍA DE VIDEOS
      </h1>
      <p className="mb-6 text-center text-gray-600" style={{ fontFamily: 'wonder, sans-serif' }}>
        Disfruta de una selección de videos divertidos y educativos para tu receso
      </p>

      {/* Imagen Central */}
      <div className="mb-10">
        <img
          src="/img/receso/videosr.png"
          alt="Zona de Juegos"
          className="mx-auto w-40 md:w-60 lg:w-72"
        />
      </div>

      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 w-full max-w-6xl">
        {videos.map((video, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <iframe
              title={video.title}
              src={video.url}
              className="w-full h-48 sm:h-64 md:h-80"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="p-4">
              <h2 className="font-semibold text-blue-700 text-lg">{video.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
