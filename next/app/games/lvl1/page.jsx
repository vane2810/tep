// Juego Introductorio -  Nivel 1

import React from 'react';
import dynamic from 'next/dynamic';
import { SeparadorRosa } from "@/components/separador";
import Volver from '@/components/elements/botonVolver';

const Game = dynamic(() => import('@/components/minigame/introductorios/lvl1'), { ssr: false });

const IntroGame1 = () => {
    return (
        <main className='bg-gray-50'>
            <SeparadorRosa />
            {/* Volver */}
            <Volver href="/niveles/nivel1"  img='/img/home/regresar/rosa.webp'/>
            <div className="flex md:flex-row flex-col justify-center items-center mb-10">
                <h1 className="ml-10 font-bold text-4xl text-center text-pink-700 super">JUEGO INTRODUCTORIO NIVEL I</h1>
                <img
                    src="/img/receso/planet1.webp"
                    alt="Planeta Celestia"
                    className="md:mr-10 mb-6 md:mb-0 md:ml-10 w-auto h-32 md:h-40 animate-float"
                />
            </div>

            <div className="my-40">
                <Game />
            </div>
            <SeparadorRosa />
        </main>
    );
};

export default IntroGame1;