// Componente reutilizable para los mapas de sociales
"use client"
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const MapSociales = ({ fondoUrl, fondoSize, areas, nivel, medida, planetaImg }) => {
    const imgRef = useRef(null);

    useEffect(() => {
        const loadImageMapResize = async () => {
            const ImageMapResize = (await import('image-map-resizer')).default;
            ImageMapResize();
        };

        loadImageMapResize();
    }, []);

    return (
        <section className="relative flex justify-center items-center border-gray-300 bg-white bg-center shadow-lg m-8 mx-auto p-8 border rounded-lg w-full h-auto"
            style={{
                backgroundSize: fondoSize,
                backgroundRepeat: 'no-repeat',
            }}
        >
            <img
                src={fondoUrl}
                useMap="#continente-map"
                alt="Mapa"
                ref={imgRef}
                className={medida}
            />
            <map name="continente-map">
                {areas.map((area, index) => (
                    <area
                        key={index}
                        shape={area.shape}
                        coords={area.coords}
                        alt={area.name}
                        href={`/niveles/${nivel}/sociales/${area.id}`}
                        title={`Explorar ${area.name}`}
                    />
                ))}
            </map>
            <div className="bottom-[5%] left-[3%] absolute">
                <img src="/img/niveles/sociales/pirata.png" alt="Caricatura" className="mb-4 w-[8vw] h-auto" />
            </div>

            {/* Decorativo específico del planeta */}
            <img src={planetaImg} alt="Planeta" className="top-[8%] left-[82%] absolute w-[10vw] planet-animation" />
        </section>
    );
};

// Definición de PropTypes para validar las props
MapSociales.propTypes = {
    fondoUrl: PropTypes.string.isRequired,
    fondoSize: PropTypes.string.isRequired,
    areas: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            shape: PropTypes.string.isRequired,
            coords: PropTypes.string.isRequired,
        })
    ).isRequired,
    nivel: PropTypes.string.isRequired,
    medida: PropTypes.string.isRequired,
    planetaImg: PropTypes.string.isRequired,
};

export default MapSociales;