// Componente de bienvenida para mate
import React from "react";
import PropTypes from "prop-types";
import Volver from "@/components/elements/botonVolver";

const HeaderSection = ({ titulo, descripcion, imagen, volverUrl }) => {
    return (
        <section className="mx-auto p-6 max-w-6xl">
            {/* Botón de Volver */}
            {volverUrl && (<Volver href={volverUrl} img="/img/home/regresar/verde.webp" />)}

            {/* Sección de Bienvenida */}
            <div className="flex md:flex-row flex-col justify-center items-center mb-6 text-center">
                <img
                    src="/img/materias/mate/explorador.webp"
                    alt="Explorador"
                    className="mr-4 w-24 md:w-32 h-auto"
                />
                <h1 className="font-bold text-5xl text-purple-900 md:text-5xl wonder">
                    Bienvenidos a {titulo}
                </h1>
            </div>

            {/* Sección de imagen del continente y descripción */}
            <div className="flex md:flex-row flex-col items-center bg-purple-200 shadow-lg mb-8 p-4 rounded-lg">
                <div className="flex-1 p-6 text-center">
                    <p className="text-2xl super">{descripcion}</p>
                </div>
                <div className="flex flex-1 justify-center p-4">
                    <img
                        src={imagen}
                        alt="Figura geométrica"
                        className="max-w-[150px] md:max-w-[200px] lg:max-w-[250px] h-auto"
                    />
                </div>
            </div>

            {/* Sección de título adicional y descripción */}
            <div className="flex md:flex-row flex-col justify-center items-center my-8 text-center md:text-left">
                <h3 className="my-4 md:my-10 font-bold text-4xl text-purple-900 md:text-4xl wonder">
                    Explora los contenidos para acumular estrellas
                </h3>
                <img
                    src="/img/materias/mate/exploradora.webp"
                    alt="Exploradora"
                    className="mt-4 md:mt-0 md:ml-8 w-24 md:w-32 h-auto"
                />
            </div>

        </section>
    );
};

HeaderSection.propTypes = {
    titulo: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    imagen: PropTypes.string,
    volverUrl: PropTypes.string,
};

export default HeaderSection;