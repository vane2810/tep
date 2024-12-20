// Mensaje de permisos
import React from "react";
import Volver from "../elements/botonVolver";
import { SeparadorMorado } from "../separador";

const Carga = () => {
    return (
        <main>
            <SeparadorMorado />
            <div className="flex flex-col justify-center items-center min-h-screen text-center">
                <div className="ml-4 self-start">
                    <Volver img="/img/home/regresar/morado.webp"/>
                </div>
                <p className="font-bold text-3xl yagora">No se pudo cargar el contenido ...</p>
                <img
                    src="/img/personajes/starly/starly_triste.webp"
                    alt="Sin contenido"
                    className="mb-6 w-48 h-48 object-contain"
                />
            </div>
            <SeparadorMorado />
        </main>
    );
};

export default Carga;