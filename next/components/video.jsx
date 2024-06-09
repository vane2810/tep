import React from "react";
import Link from 'next/link';

export default function Video() {
    return (
        <div className="relative w-full overflow-hidden">
            {/* Video */}
            <video autoPlay loop muted className="w-full h-auto md:h-96 object-cover">
                <source src="/img/page/galaxia.mp4" type="video/mp4" />
            </video>
            {/* Botones */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row md:gap-4 items-center z-10">
                <Link href="/niveles/nivel1">
                    <img src="/img/page/tierran1.png" alt="Nivel 1" className="boton w-full md:w-auto lg:w-auto lg:max-w-xs" />
                </Link>
                <Link href="/niveles/nivel2">
                    <img src="/img/page/marten2.png" alt="Nivel 2" className="boton w-full md:w-auto lg:w-auto lg:max-w-xs" />
                </Link>
                <Link href="/niveles/nivel3">
                    <img src="/img/page/jupitern3.png" alt="Nivel 3" className="boton w-full md:w-auto lg:w-auto lg:max-w-xs" />
                </Link>
            </div>
        </div>
    );
}
