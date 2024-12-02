// Página de juegos introductorios 
"use client";
import React from "react";
import Volver from "@/components/elements/botonVolver";
import Link from "next/link";

const Games = () => {
    const levels = [
        {
            title: "Nivel 1",
            img: "/img/personajes/niveles/tierran1.webp",
            link: "/games/lvl1",
        },
        {
            title: "Nivel 2",
            img: "/img/personajes/niveles/marten2.webp",
            link: "/games/lvl2",
        },
        {
            title: "Nivel 3",
            img: "/img/personajes/niveles/jupitern3.webp",
            link: "/games/lvl3",
        },
    ];

    return (
        <main className="flex flex-col justify-center items-center bg-gradient-to-b from-yellow-100 via-pink-200 to-purple-300 py-6">
            {/* Botón de Volver */}
            <div className="flex justify-start items-center w-full">
                <Volver img="/img/home/regresar/morado.webp" className="mr-4" />
            </div>

            {/* Título principal */}
            <h1 className="font-bold text-5xl text-center text-purple-700 super">
                JUEGOS INTRODUCTORIOS
            </h1>

            {/* Imagen decorativa */}
            <img
                src="/img/receso/juegosp.webp"
                alt="Decoración"
                className="my-6 w-40 h-40"
            />

            {/* Lista de niveles */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mb-10 px-12 py-12">
                {levels.map((level, index) => (
                    <Link key={index} href={level.link}>
                        <div className="relative flex flex-col justify-between items-center border-2 border-gray-100 bg-white shadow-xl hover:shadow-2xl p-8 rounded-xl text-center transform transition-all hover:scale-105 cursor-pointer">
                            {/* Decoración superior izquierda */}
                            <div className="-top-4 -left-4 absolute bg-purple-500 shadow-md rounded-full w-12 h-12"></div>

                            {/* Decoración superior derecha */}
                            <div className="-top-4 -right-4 absolute bg-yellow-300 shadow-md rounded-full w-8 h-8"></div>

                            {/* Título del nivel */}
                            <h3 className="mb-6 font-bold text-3xl text-purple-800 wonder">
                                {level.title}
                            </h3>

                            {/* Imagen del nivel */}
                            <div className="bg-purple-100 shadow-inner mb-8 rounded-lg w-full">
                                <img
                                    src={level.img}
                                    alt={level.title}
                                    className="w-full h-auto"
                                />
                            </div>

                            {/* Decoración inferior derecha */}
                            <div className="-right-4 -bottom-4 absolute shadow-md rounded-full w-14 h-14 celeste"></div>
                        </div>
                    </Link>
                ))}
            </div>
            <div />
        </main>
    );
};

export default Games;
