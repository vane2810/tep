// components/MapLenguaje.js
import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const MapIngles = ({ segmentos, fondoUrl, planetaImg, nivel }) => {
  // Elementos decorativos específicos de Lenguaje (excepto el planeta)
  const decorativos = [
    { id: "avion", img: "/img/materias/ingles/avion.png", alt: "Avion", className: "absolute top-[5%] left-[5%] w-[10vw] rocket-animation" },
    { id: "globo",img: "/img/materias/ingles/globo.png", alt: "Globo", className: "absolute right-[5%] bottom-[3%] w-[8vw] comet-animation" },
  ];

  return (
    <section
      className="relative flex justify-center items-center bg-cover bg-center mx-auto px-8 rounded-lg w-full h-[100vh]"
      style={{ backgroundImage: `url(${fondoUrl})` }}
    >
      {/* Personaje principal al inicio */}
      <div className="bottom-[3%] left-[3%] absolute">
        <img src="/img/materias/ingles/avioneta.png" alt="Personaje" className="w-[14vw] h-auto" />
      </div>

      {/* Segmentos del mapa en un camino curvo */}
      {segmentos.map((segmento, index) => {
        const positionClasses = [
          "absolute top-[25%] left-[15%]",
          "absolute top-[25%] left-[40%]",
          "absolute top-[25%] left-[65%]",
        ];
        const positionClass = positionClasses[index % positionClasses.length];

        return (
          <Link href={`/niveles/${nivel}/lenguaje/${segmento.id}`} key={segmento.id}>
            <img
              src={segmento.imgSrc}
              alt={segmento.alt}
              className={`${positionClass} w-64 lg:w-72 h-auto transform transition-transform hover:scale-110`}
              title={segmento.name}
            />
          </Link>
        );
      })}

      {/* Decorativo específico del planeta */}
      <img src={planetaImg} alt="Planeta" className="top-[9%] left-[86%] absolute w-[12vw] planet-animation" />

      {/* Otros elementos decorativos específicos de Lenguaje */}
      {decorativos.map((item) => (
        <img key={item.id} src={item.img} alt={item.alt} className={item.className} />
      ))}
    </section>
  );
};

MapIngles.propTypes = {
  segmentos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  fondoUrl: PropTypes.string.isRequired,
  planetaImg: PropTypes.string.isRequired,
  nivel: PropTypes.string.isRequired,
};

export default MapIngles;