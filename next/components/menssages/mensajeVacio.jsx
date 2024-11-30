// ./components/elements/EmptyContentMessage.js
import React from "react";

const EmptyContentMessage = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-12 text-center">
            <p className="font-bold text-2xl yagora">Parece que aquí está vacío ...</p>
            <img
                src="/img/personajes/starly/starly_triste.webp"
                alt="Sin contenido"
                className="mb-6 w-48 h-48 object-contain"
            />
        </div>
    );
};

export default EmptyContentMessage;