// 
import React from 'react';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/typeWriter";
import Volver from '@/components/botonVolver';

const GameTemplate = ({
    gameStarted,
    gameKey,
    feedback,
    score,
    showRetry,
    toggleInstructions,
    updateFeedback,
    updateScore,
    handleRetry,
    GameComponent,
    title,
    imageUrl,
    backLink
}) => {
    return (
        <main className="bg-gray-100">
            <SeparadorVerde />
            <Volver href={backLink}/>
            {/* Bienvenida del juego */}
            <div className="flex items-center justify-between flex-wrap">
                {/* Contenedor del Typewriter, la imagen y el botón */}
                <div className="flex items-center my-6 mx-auto">
                    {/* Imagen */}
                    <div className="flex-shrink-0 mr-4">
                        <img src={imageUrl} alt={title} className="h-40 w-auto" />
                    </div>
                    {/* Typewriter y botón */}
                    <div className="flex flex-col">
                        {/* Texto */}
                        <div className="story font-bold text-xl mb-4">
                            <Typewriter text="   Lee las indicaciones para comenzar" speed={40} />
                        </div>
                        {/* Botón de Indicaciones */}
                        <button className="verde story text-xl text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                            onClick={toggleInstructions}> Indicaciones
                        </button>
                    </div>
                </div>
            </div>

            {/* Escena del juego */}
            {gameStarted && (
                <section className='min-h-screen flex flex-col items-center'>
                    <div className="my-16 p-6 story bg-white rounded-lg shadow-lg w-[850px]">
                        <h1 className="text-3xl font-bold mb-4 text-center">{title}</h1>
                        <GameComponent
                            key={gameKey}
                            updateFeedback={updateFeedback}
                            updateScore={updateScore}
                        />
                        <div className="mt-8">
                            <p className="text-xl font-semibold">Resultado: {feedback}</p>
                            <p className="text-xl font-semibold">Estrellas: {score}</p>
                            {showRetry && (
                                <button
                                    onClick={handleRetry}
                                    className="mt-4 py-2 px-6 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                                >
                                    Volver a Intentarlo
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            )}
            <SeparadorVerde />
        </main>
    );
};

export default GameTemplate;