"use client"
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const LevelMap = ({ fondoUrl, fondoSize = 'cover', areas }) => {
    const imgRef = useRef(null);

    useEffect(() => {
        const loadImageMapResize = async () => {
            const ImageMapResize = (await import('image-map-resizer')).default;
            ImageMapResize();
        };

        loadImageMapResize();
    }, []);

    // En tu componente LevelMap
    // En tu componente LevelMap
    // En tu componente LevelMap
    // En tu componente LevelMap
    return (
        <section
            className="relative flex justify-center items-center border-gray-300 bg-white bg-opacity-75 bg-cover bg-center shadow-lg m-8 mx-auto px-8 border rounded-lg w-full h-auto"
            style={{
                backgroundImage: `url(${fondoUrl})`,
                backgroundSize: fondoSize,
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Mapa de la imagen con áreas clicables */}
            <img
                src={fondoUrl}
                useMap="#continente-map"
                alt="Mapa de Continentes"
                ref={imgRef}
                className="w-full h-auto"
            />

            <map name="continente-map">
                {areas.map((area, index) => (
                    <area
                        key={index}
                        shape={area.shape || 'rect'}
                        coords={area.coords}
                        alt={area.name}
                        href={area.path}
                    />
                ))}
            </map>
        </section>
    );
};

export default LevelMap;
