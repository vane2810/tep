// Configuración para página no encontrada
"use client";

import useSession from "@/hooks/useSession";
import { SeparadorVerde } from "@/components/separador";
import Volver from "@/components/elements/botonVolver";

export default function Custom404() {
    const { session } = useSession();

    // Determinar redirección según el nivel y el rol
    const nivelId = session?.nivelId || 1;
    const redirectPath =
        session?.role === "student" ? `/niveles/nivel${nivelId}` : "/";

    return (
        <main className="relative flex flex-col justify-between bg-gray-50 min-h-screen">
            {/* Separador superior */}
            <SeparadorVerde />

            {/* Botón de volver */}
            <div className="top-4 left-4 absolute">
                <Volver img="/img/home/regresar/verde.png" />
            </div>

            {/* Contenido principal */}
            <div className="flex flex-col flex-grow justify-center items-center px-6">
                <img
                    src="/img/404_image.png"
                    alt="Página no encontrada"
                    className="mb-6 w-64 h-auto"
                />
                <h1 className="mb-4 font-bold text-4xl text-center text-red-600">
                    404 - Página no encontrada
                </h1>
                <p className="mb-4 text-center text-gray-700 text-lg">
                    Lo sentimos, la página que estás buscando no existe.
                </p>
                <p className="text-center text-gray-500 text-sm">
                    Por favor verifica la URL o utiliza el botón de volver.
                </p>
            </div>

            {/* Separador inferior */}
            <SeparadorVerde />
        </main>
    );
}
