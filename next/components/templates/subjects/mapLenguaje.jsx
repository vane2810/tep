// components/MapLenguaje.js
import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const MapLenguaje = ({ segmentos, fondoUrl, planetaImg, nivel }) => {
    // Elementos decorativos específicos de Lenguaje (excepto el planeta)
    const decorativos = [
        { id: "cohete", img: "/img/materias/lenguaje/cohete.png", alt: "Cohete", className: "absolute top-[5%] left-[5%] w-[14vw] sm:w-[10vw] rocket-animation" },
        { id: "nave", img: "/img/materias/lenguaje/nave.png", alt: "Cometa", className: "absolute right-[5%] bottom-[3%] w-[12vw] sm:w-[8vw] comet-animation" },
    ];

    return (
        <div className="bg-white shadow-lg mx-auto p-4 rounded-xl w-full">
            {/* Contenedor de Título */}
            <h1 className="my-4 font-bold text-center text-2xl sm:text-3xl md:text-4xl yagora">
                Explora la Galaxia de Lenguaje y Literatura
            </h1>
            <section
                className="relative flex justify-center items-center bg-cover bg-center rounded-xl w-full h-[75vh] sm:h-[85vh] md:h-[100vh]"
                style={{ backgroundImage: `url(${fondoUrl})` }}
            >
                {/* Personaje principal al inicio, ajustado a un tamaño más pequeño */}
                <div className="bottom-[3%] left-[3%] absolute">
                    <img src="/img/materias/lenguaje/astronauta.png" alt="Personaje" className="w-[12vw] sm:w-[8vw] h-auto animate-tambaleo" />
                </div>

                {/* Segmentos del mapa en un camino curvo */}
                {segmentos.map((segmento, index) => {
                    const positionClasses = [
                        "absolute top-[52%] left-[8%]",
                        "absolute top-[15%] left-[25%]",
                        "absolute top-[52%] left-[41%]",
                        "absolute top-[15%] left-[59%]",
                        "absolute top-[52%] left-[72%]",
                    ];
                    const positionClass = positionClasses[index % positionClasses.length];

                    return (
                        <Link href={`/niveles/${nivel}/lenguaje/${segmento.id}`} key={segmento.id}>
                            <img
                                src={segmento.imgSrc}
                                alt={segmento.alt}
                                className={`${positionClass} w-36 sm:w-52 md:w-64 lg:w-72 h-auto transform transition-transform hover:scale-125`}
                                title={segmento.name}
                            />
                        </Link>
                    );
                })}

                {/* Decorativo específico del planeta */}
                <img src={planetaImg} alt="Planeta" className="top-[9%] left-[86%] absolute w-[20vw] sm:w-[14vw] planet-animation" />

                {/* Otros elementos decorativos específicos de Lenguaje */}
                {decorativos.map((item) => (
                    <img key={item.id} src={item.img} alt={item.alt} className={item.className} />
                ))}
            </section>
        </div>
    );
};

MapLenguaje.propTypes = {
    segmentos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            imgSrc: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
        })
    ).isRequired,
    fondoUrl: PropTypes.string.isRequired,
    planetaImg: PropTypes.string.isRequired,
    nivel: PropTypes.string.isRequired,
};

export default MapLenguaje;
