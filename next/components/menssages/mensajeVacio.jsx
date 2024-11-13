// ./components/elements/EmptyContentMessage.js
import React from "react";
import PropTypes from "prop-types";

const EmptyContentMessage = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-12 text-center">
            <p className="font-bold text-2xl yagora">Parece que aquí está vacío ...</p>
            <img
                src="/img/personajes/starly/starly_triste.png"
                alt="Sin contenido"
                className="mb-6 w-48 h-48 object-contain"
            />
        </div>
    );
};

EmptyContentMessage.propTypes = {
    message: PropTypes.string,
};

export default EmptyContentMessage;