<<<<<<< HEAD
"use client"
import React, { useState } from "react";
=======
// Botones de inicio para cada nivel mejorados
import React from "react";
>>>>>>> 938ec80b75805a081ed513563dc489dffd9bfa9c
import Link from 'next/link';
import Typewriter from "../components/typeWriter";

export default function Video() {
    // Estado para controlar la visibilidad de los niveles
    const [showLevels, setShowLevels] = useState(false);

    // Función para mostrar los niveles al hacer clic en la varita
    const handleWandClick = () => {
        setShowLevels(true);
    };

    return (
<<<<<<< HEAD
        <div className="relative bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 p-10 w-full overflow-hidden">
            {/* Contenedor de Starly */}
            <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-center">
                <div className="flex flex-col justify-center items-center mt-10 mb-10 animate-fly-in">
                    <img
                        src="/img/personajes/starly/starly.png"
                        alt="Starly"
                        className="relative mb-4 w-28 md:w-40 h-28 md:h-40"
                    />
                    <div className="font-bold text-3xl text-yellow-300 md:text-4xl wonder">
                        <Typewriter
                            text="¡Hola! Soy Starly y te estaré acompañando en esta aventura"
                            speed={40}
                        />
                    </div>
                    {/* Varita mágica */}
                    <img
                        src="/img/varita.png"
                        alt="Varita mágica"
                        className="mt-6 w-12 h-12 transition-transform animate-twinkle duration-300 cursor-pointer hover:scale-110"
                        onClick={handleWandClick}
                    />
                </div>

                {/* Contenedor de niveles (aparecen al hacer clic en la varita) */}
                {showLevels && (
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-100 mt-8 transition-opacity duration-700">
                        {[
                            { href: "/niveles/nivel1", src: "/img/personajes/niveles/tierran1.png", label: "Nivel 1, Cuarto Grado" },
                            { href: "/niveles/nivel2", src: "/img/personajes/niveles/marten2.png", label: "Nivel 2, Quinto Grado" },
                            { href: "/niveles/nivel3", src: "/img/personajes/niveles/jupitern3.png", label: "Nivel 3, Sexto Grado" }
                        ].map((nivel, index) => (
                            <div key={index} className="relative w-48 text-center group">
                                <Link href={nivel.href} aria-label={nivel.label}>
                                    <div className="group-hover:scale-110 group-hover:rotate-3 bg-white shadow-xl hover:shadow-2xl p-3 rounded-lg transform transition-all duration-300 overflow-hidden">
                                        <img
                                            src={nivel.src}
                                            alt={nivel.label}
                                            className="rounded-lg w-full h-auto object-cover"
                                        />
                                    </div>
                                </Link>
                                <div className="top-full left-1/2 absolute bg-gradient-to-r from-yellow-400 to-red-500 opacity-0 group-hover:opacity-100 p-2 rounded-lg font-bold text-white whitespace-nowrap transform transition-all -translate-x-1/2 translate-y-4 group-hover:translate-y-0 duration-300">
                                    {nivel.label}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
=======
        <div className="relative w-full overflow-hidden yagora">
            {/* Video */}
            <video autoPlay loop muted className="w-full h-auto md:h-96 object-cover">
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
>>>>>>> 938ec80b75805a081ed513563dc489dffd9bfa9c
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
