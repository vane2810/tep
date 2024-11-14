"use client";
import React, { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import PropTypes from "prop-types";
import { FiArrowRightCircle, FiPlayCircle } from "react-icons/fi";
import Link from "next/link";

const ContentStructure2 = ({ content, playLink }) => {
    const [isClient, setIsClient] = useState(false);

    // Use useEffect to set el componente como client-side después de montarse
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // No renderizar en el server-side o durante la hidratación
    }

    return (
        <div className="flex justify-center items-center my-8 min-h-screen yagora">
            <HTMLFlipBook
                width={320}
                height={450}
                size="stretch"
                minWidth={250}
                maxWidth={400}
                minHeight={300}
                maxHeight={600}
                maxShadowOpacity={0.3}
                className="border-gray-400 border demo-book"
                flippingTime={800}
                drawShadow={true}
                useMouseEvents={true}
            >
                {/* Portada izquierda: contenedor blanco en medio con título e imagen */}
                <div className="flex justify-center items-center bg-amber-500 shadow-md p-8 border rounded-lg page">
                    <div className="flex flex-col justify-center items-center border-gray-300 bg-white shadow-lg my-20 p-6 border rounded-lg w-full max-w-xs">
                        <img
                            src="/img/personajes/starly/starly_explorador.png" // Cambia esto por la ruta correcta de tu imagen
                            alt="Portada del Contenido"
                            className="mb-6 w-32 h-32 object-contain"
                        />
                        <h2 className="mb-4 font-bold text-3xl text-center">
                            {content.title}
                        </h2>
                        <p className="text-center text-lg leading-relaxed">
                            {content.description}
                        </p>
                    </div>
                </div>

                {/* Portada derecha: indicaciones de navegación */}
                <div className="flex flex-col justify-center items-center shadow-md p-8 border rounded-lg page">
                    <p className="my-20 text-2xl text-center leading-relaxed">
                        Bienvenido a este contenido educativo
                    </p>
                    <FiArrowRightCircle className="right-4 bottom-4 absolute text-6xl text-amber-500 text-center animate-bounce cursor-pointer" />
                    <p className="mt-4 text-center text-gray-600 text-lg">
                        Haz clic o desliza para pasar la página.
                    </p>
                </div>

                {/* Páginas del libro con los pasos */}
                {content.steps.map((step, index) => (
                    <div
                        key={`page-step-${index}`}
                        className="flex flex-col justify-center items-center border-gray-300 bg-white shadow-lg p-6 border rounded-lg page"
                    >
                        <h4 className="mt-6 mb-4 font-bold text-2xl text-blue-700 text-center wonder">
                            {step.title}
                        </h4>

                        {step.audio_url && (
                            <div className="flex justify-center mt-8 mb-4">
                                <audio controls className="w-full max-w-xs">
                                    <source src={step.audio_url} type="audio/mpeg" />
                                    Tu navegador no soporta la reproducción de audio.
                                </audio>
                            </div>
                        )}

                        <p className="text-base text-center leading-relaxed">
                            {step.description}
                        </p>

                        {step.img_url && (
                            <div className="flex justify-center mt-4">
                                <img
                                    src={step.img_url}
                                    alt={`Paso ${index + 1}`}
                                    className="rounded-lg w-auto max-h-32 object-contain"
                                />
                            </div>
                        )}
                    </div>
                ))}

                {/* Última página con el botón "Vamos a Jugar" */}
                <div className="flex flex-col justify-center items-center bg-white shadow-md p-8 border rounded-lg page">
                    <img
                        src="/img/personajes/starly/starly_explorador.png" // Cambia esto por la ruta correcta de tu imagen
                        alt="Portada del Contenido"
                        className="w-32 h-32 object-contain"
                    />
                    <h2 className="my-20 font-bold text-2xl text-blue-800 text-center">
                        ¡Hemos terminado! ¿Listo para poner en práctica lo aprendido?
                    </h2>
                    <div className="flex justify-end mt-2">
                        <Link
                            href={playLink}
                            className="flex items-center bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg font-bold text-white transform transition-all hover:scale-105"
                        >
                            <span className="mr-2 text-xl yagora">Vamos a Jugar</span>
                            <FiPlayCircle className="text-3xl text-white" />
                        </Link>
                    </div>
                </div>
            </HTMLFlipBook>
        </div>
    );
};

ContentStructure2.propTypes = {
    content: PropTypes.object.isRequired,
    playLink: PropTypes.string.isRequired,
};

export default ContentStructure2;
