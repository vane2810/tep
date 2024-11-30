// Configuración para página no encontrada
"use client";
import { SeparadorVerde } from "@/components/separador";
import Volver from "@/components/elements/botonVolver";

export default function Custom404() {
    return (
        <main
            className="relative flex flex-col justify-between bg-white min-h-screen"
            style={{
                backgroundImage: 'url("/img/fondos/404.webp")',
                backgroundSize: 'contain', 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat', 
            }}
        >
            {/* Separador superior */}
            <SeparadorVerde />

            {/* Botón de volver */}
            <div className="top-4 left-4 absolute">
                <Volver img="/img/home/regresar/verde.webp" />
            </div>
            
            {/* Separador inferior */}
            <SeparadorVerde />
        </main>
    );
}
