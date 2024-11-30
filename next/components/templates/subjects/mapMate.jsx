// components/GusanoSeccion.js
import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

export default function MateMap({ mostrarCabeza, fondoUrl, cabezaSrc, segmentos, nivel, planetaImg}) {
  const decorativos = [
    { id: "pajaro", img: "/img/materias/mate/pajaro.webp", alt: "Pajaro", className: "absolute top-[5%] left-[5%] w-[8vw] rocket-animation" },
    { id: "caracol", img: "/img/materias/mate/caracol.webp", alt: "Caracol", className: "absolute right-[5%] bottom-[3%] w-[6vw] comet-animation" },
  ];

  return (
    <div className="bg-white shadow-lg mx-auto p-4 rounded-xl w-full">
      {/* Contenedor de Título */}
      <h1 className="my-4 font-bold text-center md:text-4xl yagora">Explora la Selva de las Matemáticas</h1>
      
      {/* Contenedor principal del mapa con imagen de fondo */}
      <section
        className="relative flex justify-center items-center bg-cover bg-center rounded-xl w-full h-[100vh]"
        style={{ backgroundImage: `url(${fondoUrl})` }}
      >
        {/* Personaje principal al inicio */}
        <div className="bottom-[1%] left-[1%] absolute">
          <img src="/img/materias/mate/exploradora.webp" alt="Personaje" className="w-[10vw] h-auto" />
        </div>

        <div className="flex justify-center mt-10 overflow-x-auto">
          {/* Cabeza del gusano, opcional */}
          {mostrarCabeza && (
            <div className="flex items-center mt-[-30px] md:mt-[-50px] lg:mt-[-80px]">
              <img
                src={cabezaSrc}
                alt="Cabeza del gusano"
                className="worm-segment mt-4 md:mr-2.5 w-40 lg:w-60 h-auto"
              />
            </div>
          )}

          {/* Segmentos del gusano */}
          {segmentos.map((segmento) => (
            <Link href={`/niveles/${nivel}/mate/${segmento.id}`} key={segmento.id}>
              <img
                src={segmento.imgSrc}
                alt={segmento.alt}
                className={`flex-auto worm-segment ${segmento.marginTop || "mt-8"} mb-4 w-40 lg:w-60 h-auto transform transition-transform hover:scale-90`}
                title={segmento.name}
              />
            </Link>
          ))}
        </div>

        {/* Decorativo específico del planeta */}
        <img src={planetaImg} alt="Planeta" className="top-[5%] left-[86%] absolute w-[12vw] planet-animation" />

        {/* Otros elementos decorativos */}
        {decorativos.map((item) => (
          <img key={item.id} src={item.img} alt={item.alt} className={item.className} />
        ))}
      </section>
    </div>
  );
}

// Definición de PropTypes para validación de props
MateMap.propTypes = {
  mostrarCabeza: PropTypes.bool,
  cabezaSrc: PropTypes.string,
  segmentos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      imgSrc: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      marginTop: PropTypes.string,
    })
  ).isRequired,
  fondoUrl: PropTypes.string.isRequired,
  nivel: PropTypes.string,
  planetaImg: PropTypes.string.isRequired,
};

// Valores predeterminados para props opcionales
MateMap.defaultProps = {
  mostrarCabeza: false,
  cabezaSrc: "",
};