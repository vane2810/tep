// Configuración para página no encontrada
"use client";

import useSession from "@/hooks/useSession";
import { SeparadorVerde } from "@/components/separador";

export default function Custom404() {
    const { session } = useSession(); // Obtener la sesión actual

    // Determinar redirección según el nivel y el rol
    const nivelId = session?.nivelId || 1; // Obtener el nivel del usuario o usar 1 por defecto
    const redirectPath =
        session?.role === "student" ? `/niveles/nivel${nivelId}` : "/";

    const redirectMessage =
        session?.role === "student"
            ? `Volver al nivel ${nivelId}`
            : "Volver al inicio";

    return (
        <main className="bg-gray-50">
            <SeparadorVerde />
            <div className="bg-white shadow-md p-8 rounded-lg max-w-lg text-center">
                <img
                    src="/img/404_image.png"
                    alt="Página no encontrada"
                    className="mx-auto mb-6 w-48 h-auto"
                />
                <h1 className="mb-4 font-bold text-3xl text-red-600">
                    404 - Página no encontrada
                </h1>
                <p className="mb-6 text-gray-700 text-lg">
                    Lo sentimos, la página que estás buscando no existe.
                </p>
                <a
                    href={redirectPath}
                    className="inline-block bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md font-semibold text-white transition-colors duration-300"
                >
                    {redirectMessage}
                </a>
            </div>
            <SeparadorVerde />
        </main>
    );
}
