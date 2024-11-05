// components/VideoGallery.js
import React from 'react';

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
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-8" style={{ fontFamily: 'super, sans-serif' }}>
        GALERÍA DE VIDEOS
      </h1>
      <p className="text-gray-600 mb-6 text-center" style={{ fontFamily: 'wonder, sans-serif' }}>
        Disfruta de una selección de videos divertidos y educativos para tu receso.
      </p>
      {/* Imagen Central */}
      <div className="mb-10">
        <img
          src="/img/receso/videosr.png"
          alt="Zona de Juegos"
          className="w-40 md:w-60 lg:w-72 mx-auto"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
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
              <h2 className="text-lg font-semibold text-blue-700">{video.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;

