// Botones de inicio para cada nivel
import React from "react";
import Link from 'next/link';

export default function Video() {
    return (
        <div className="relative w-full overflow-hidden">
            {/* Video */}
            <video autoPlay loop muted className="w-full h-auto md:h-96 object-cover">
                <source src="/img/home/galaxia.mp4" type="video/mp4" />
            </video>
            {/* Botones */}
            <div className="top-1/2 left-1/2 z-10 absolute flex md:flex-row flex-col items-center md:gap-8 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                    <Link href="/niveles/nivel1">
                        <img
                          src="/img/personajes/niveles/tierran1.png"
                          alt="Nivel 1"
                          className="hover:shadow-lg w-full md:w-auto lg:w-auto lg:max-w-xs transition-transform duration-200 boton hover:scale-105"
                        />
                    </Link>
                    <div className="top-0 left-1/2 absolute p-2 rounded font-bold text-black whitespace-nowrap transform -translate-x-1/2 -translate-y-full rosado">
                        Nivel 1, Cuarto Grado
                    </div>
                </div>
                <div className="relative">
                    <Link href="/niveles/nivel2">
                        <img
                          src="/img/personajes/niveles/marten2.png"
                          alt="Nivel 2"
                          className="hover:shadow-lg w-full md:w-auto lg:w-auto lg:max-w-xs transition-transform duration-200 boton hover:scale-105"
                        />
                    </Link>
                    <div className="top-0 left-1/2 absolute p-2 rounded font-bold text-black whitespace-nowrap transform -translate-x-1/2 -translate-y-full rosado">
                        Nivel 2, Quinto Grado
                    </div>
                </div>
                <div className="relative">
                    <Link href="/niveles/nivel3">
                        <img
                          src="/img/personajes/niveles/jupitern3.png"
                          alt="Nivel 3"
                          className="hover:shadow-lg w-full md:w-auto lg:w-auto lg:max-w-xs transition-transform duration-200 boton hover:scale-105"
                        />
                    </Link>
                    <div className="top-0 left-1/2 absolute p-2 rounded font-bold text-black whitespace-nowrap transform -translate-x-1/2 -translate-y-full rosado" >
                        Nivel 3, Sexto Grado
                    </div>
                </div>
            </div>
        </div>
    );
}
