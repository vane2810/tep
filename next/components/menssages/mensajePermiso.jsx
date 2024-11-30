// Mensaje de permisos
import React from "react";
import Volver from "../elements/botonVolver";
import { SeparadorAzul } from "../separador";

const MensajePermiso = () => {
    return (
        <main>
            <SeparadorAzul />
            <div className="flex flex-col justify-center items-center min-h-screen text-center">
                <div className="ml-4 self-start">
                    <Volver />
                </div>
                <p className="font-bold text-2xl yagora">No tienes permisos para acceder a esta funcionalidad</p>
                <img
                    src="/img/personajes/starly/starly_ve.webp"
                    alt="Sin contenido"
                    className="mb-6 w-48 h-48 object-contain"
                />
            </div>
            <SeparadorAzul />
        </main>
    );
};

export default MensajePermiso;