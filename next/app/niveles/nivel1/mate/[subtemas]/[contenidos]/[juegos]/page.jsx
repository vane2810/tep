"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SeparadorVerde } from "@/components/separador";
import Volver from "@/components/elements/botonVolver";
import useSession from "@/hooks/useSession";

const JuegosPage = () => {
    const router = useRouter();
    const params = useParams();
    const { subtemas, contenidos } = params;
    const { session } = useSession();

    const volverHref = `/niveles/nivel1/mate/${subtemas}/${contenidos}`;

    return (
        <main className="bg-gray-100 min-h-screen">
            <SeparadorVerde />
            <Volver href={volverHref} img="/img/home/regresar/verde.png" />
            <div className="flex flex-col justify-center items-center py-10">
                <h1 className="mb-6 font-bold text-4xl text-teal-800">
                    Juegos para Practicar
                </h1>
                <p className="mb-8 text-center text-gray-700 text-lg">
                    A continuación encontrarás juegos interactivos para reforzar lo que has aprendido. ¡Selecciona el juego que más te guste y comienza a practicar!
                </p>
                <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 w-full">
                    {/* Aquí colocaremos los elementos que representen los juegos */}
                    <Link href={`/${contenidos}/juegos/juego1`}>
                        <div className="flex flex-col justify-center items-center bg-white shadow-md hover:shadow-lg p-6 border rounded-lg cursor-pointer">
                            <img src="/img/icons/juego1.png" alt="Juego 1" className="mb-4 w-24 h-24" />
                            <h3 className="font-bold text-teal-600 text-xl">Juego 1</h3>
                            <p className="mt-2 text-center text-gray-600">
                                Descripción breve del juego 1.
                            </p>
                        </div>
                    </Link>
                    <Link href={`/${contenidos}/juegos/juego2`}>
                        <div className="flex flex-col justify-center items-center bg-white shadow-md hover:shadow-lg p-6 border rounded-lg cursor-pointer">
                            <img src="/img/icons/juego2.png" alt="Juego 2" className="mb-4 w-24 h-24" />
                            <h3 className="font-bold text-teal-600 text-xl">Juego 2</h3>
                            <p className="mt-2 text-center text-gray-600">
                                Descripción breve del juego 2.
                            </p>
                        </div>
                    </Link>
                    {/* Puedes añadir más juegos aquí según sea necesario */}
                </div>
            </div>
            <SeparadorVerde />
        </main>
    );
};

export default JuegosPage;
