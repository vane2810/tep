// Mensaje de error en la carga de los datos
import React from "react";

const DataMessage = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-12 mb-8 text-center">
            <p className="font-bold text-2xl text-gray-600 yagora">Parece que hubo un error al cargar los datos ...</p>
            <img
                src="/img/personajes/starly/starly_llorando.png"
                alt="Sin contenido"
                className="mb-6 w-48 h-48 object-contain"
            />
            <p className="font-bold text-2xl text-gray-600 yagora">Puedes recargar la página o regresar más tarde</p>
        </div>
    );
};

export default DataMessage;