// Botones de inicio para cada nivel mejorados
import React from "react";
import Link from 'next/link';

export default function Video() {
    return (
        <div className="relative w-full overflow-hidden">
            {/* Video de fondo */}
            <video autoPlay loop muted className="w-full h-auto md:h-screen object-cover brightness-75">
                <source src="/img/home/galaxia.mp4" type="video/mp4" />
            </video>
            {/* Botones de niveles */}
            <div className="top-1/2 left-1/2 z-20 absolute flex md:flex-row flex-col items-center md:gap-12 gap-6 transform -translate-x-1/2 -translate-y-1/2">
                {levels.map((level) => (
                    <div key={level.id} className="relative">
                        <Link href={level.link} passHref>
                            <img
                                src={level.imgSrc}
                                alt={level.altText}
                                className="hover:shadow-xl w-full md:w-auto lg:w-auto lg:max-w-xs transition-transform duration-300 ease-out hover:scale-110 rounded-full border-4 border-transparent hover:border-yellow-400"
                            />
                        </Link>
                        <div className="top-0 left-1/2 absolute p-2 rounded-md font-bold text-white bg-black bg-opacity-70 whitespace-nowrap transform -translate-x-1/2 -translate-y-full">
                            {level.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const levels = [
    {
        id: 1,
        link: "/niveles/nivel1",
        imgSrc: "/img/personajes/niveles/tierran1.png",
        altText: "Nivel 1",
        label: "Nivel 1, Cuarto Grado",
    },
    {
        id: 2,
        link: "/niveles/nivel2",
        imgSrc: "/img/personajes/niveles/marten2.png",
        altText: "Nivel 2",
        label: "Nivel 2, Quinto Grado",
    },
    {
        id: 3,
        link: "/niveles/nivel3",
        imgSrc: "/img/personajes/niveles/jupitern3.png",
        altText: "Nivel 3",
        label: "Nivel 3, Sexto Grado",
    }
];
