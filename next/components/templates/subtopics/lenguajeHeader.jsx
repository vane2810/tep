// components/SubtemaHeader.js
import React from "react";
import PropTypes from "prop-types";
import Volver from "@/components/elements/botonVolver";

const SubtemaHeader = ({ titulo, descripcion, imagen, volverUrl}) => {
    return (
        <section className="p-6">

            {/* Contenedor principal con borde redondeado y sombra */}
            <div className="bg-purple-200 shadow-md px-6 py-4 rounded-lg">
                <Volver href={volverUrl}/>
                
                <div className="flex flex-col justify-center items-center text-center">
                    <h1 className="max-w-lg text-black text-lg md:text-3xl super">{titulo} </h1>
                    
                    <div className="flex md:flex-row flex-col justify-center items-center">
                        <img src={imagen} alt={titulo} className="md:mr-4 mb-4 md:mb-0 w-auto h-40 md:h-64" />
                        <p className="max-w-lg text-black text-lg md:text-2xl super">{descripcion}</p>
                    </div>
                </div>
            </div>

        </section>
    );
};

SubtemaHeader.propTypes = {
    titulo: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    volverUrl: PropTypes.string.isRequired,
};

export default SubtemaHeader;