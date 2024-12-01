// Mensaje de no existe

import React from "react";
import Volver from "../elements/botonVolver";
import { SeparadorMorado } from "../separador";

const NoExiste = () => {
    return (
        <main>
            <SeparadorMorado />
            <div className="flex flex-col justify-center items-center min-h-screen text-center">
                <div className="ml-4 self-start">
                    <Volver img="/img/home/regresar/morado.webp"/>
                </div>
                <p className="font-bold text-3xl yagora">Este tema no existe ...</p>
                <img
                    src="/img/personajes/starly/starly_asustado.webp"
                    alt="Sin contenido"
                    className="mb-6 w-48 h-48 object-contain"
                />
                <p className="font-bold text-3xl yagora">Regresa a los contenidos principales</p>
            </div>
            <SeparadorMorado />
        </main>
    );
};

export default NoExiste;