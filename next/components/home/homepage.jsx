import React from "react";
import Link from 'next/link';

export default function Video() {
    return (
        <div className="relative w-full overflow-hidden">
            {/* Video de fondo */}
            <video autoPlay loop muted className="w-full h-auto object-cover max-h-[60vh]">
                <source src="/img/home/galaxia.mp4" type="video/mp4" />
            </video>
            {/* Contenedor de botones distribuido horizontalmente */}
            <div className="absolute inset-0 flex items-center justify-center w-full p-4">
                <div className="flex flex-row items-center justify-around w-full max-w-7xl gap-8">
                    <div className="flex flex-col items-center w-56 sm:w-64 md:w-72 lg:w-80 xl:w-[36rem]">
                        <div className="mt-10 mb-6 bg- rosado text-black font-bold rounded px-4 py-1 text-center text-base">
                            Nivel 1, Cuarto Grado
                        </div>
                        <Link href="/niveles/nivel1">
                            <img
                                src="/img/personajes/niveles/tierran1.webp"
                                alt="Icono de Nivel 1, Tierra"
                                className="hover:shadow-lg w-full transition-transform duration-200 hover:scale-105"
                            />
                        </Link>
                    </div>
                    <div className="flex flex-col items-center w-56 sm:w-64 md:w-72 lg:w-80 xl:w-[36rem]">
                        <div className="mt-10 mb-6 bg- rosado text-black font-bold rounded px-4 py-1 text-center text-base">
                            Nivel 2, Quinto Grado
                        </div>
                        <Link href="/niveles/nivel2">
                            <img
                                src="/img/personajes/niveles/marten2.webp"
                                alt="Icono de Nivel 2, Marte"
                                className="hover:shadow-lg w-full transition-transform duration-200 hover:scale-105"
                            />
                        </Link>
                    </div>
                    <div className="flex flex-col items-center w-56 sm:w-64 md:w-72 lg:w-80 xl:w-[36rem]">
                        <div className="mt-10 mb-6 bg- rosado text-black font-bold rounded px-4 py-1 text-center text-base">
                            Nivel 3, Sexto Grado
                        </div>
                        <Link href="/niveles/nivel3">
                            <img
                                src="/img/personajes/niveles/jupitern3.webp"
                                alt="Icono de Nivel 3, Júpiter"
                                className="hover:shadow-lg w-full transition-transform duration-200 hover:scale-105"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
