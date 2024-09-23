// Componente reutilizable para los mapas de sociales
"use client"
import React, { useEffect, useRef } from 'react';

const MapSociales = ({ fondoUrl, fondoSize, areas, basePath, caricatura, subject }) => {
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
                alt="Mapa del Mundo"
                ref={imgRef}
                className="w-full h-auto"
            />
            <map name="continente-map">
                {areas.map((area, index) => (
                    <area
                        key={index}
                        shape={area.shape}
                        coords={area.coords}
                        alt={area.name}
                        href={`/${basePath}${subject}/${area.id}`}
                        title={`Explorar ${area.name}`}
                    />
                ))}
            </map>
            <div className="bottom-[5%] left-[5%] absolute">
                <img src={caricatura} alt="Caricatura" className="w-[6vw] h-auto" />
            </div>
        </section>
    );
};

export default MapSociales;
