// Página principal de Sociales - Nivel 2
import React from 'react';
import WelcomeSection from '@/components/templates/materias/welcomeSection';
import dynamic from 'next/dynamic';
import '@/styles/animacion.css';
import { SeparadorAzul } from '@/components/separador';

// Importación dinámica de LevelMap
const MapSociales = dynamic(() => import('@/components/templates/materias/mapSociales'), {
    ssr: false,
});

export default function SocialesPage() {
    const area = [
        { id: 1, name: 'Bélice', shape: 'poly', coords: '703,527,827,485,956,535,1018,637,1056,642,1055,796,1039,844,977,841,943,882,899,896,708,640' },
        { id: 2, name: 'Guatemala', shape: 'poly', coords: '425,550,412,469,501,366,358,204, 155,186,110, 184,50,219,64,327,126,298,214,523,381,841,377, 1008,414,1020,667,747,635,687,597,665,552,671,506,649,463,618,409,575 '},
        { id: 3, name: 'Honduras', shape: 'poly', coords: '120, 187, 113, 195, 104, 203, 90, 214, 98, 227, 108, 226, 122, 229, 130, 230, 146, 235, 151, 240, 164, 243, 179, 242, 185, 236, 190, 229, 190, 213, 179, 210, 162, 210, 150, 198'},
        { id: 4, name: 'El Salvador', shape: 'poly', coords: '120, 187, 113, 195, 104, 203, 90, 214, 98, 227, 108, 226, 122, 229, 130, 230, 146, 235, 151, 240, 164, 243, 179, 242, 185, 236, 190, 229, 190, 213, 179, 210, 162, 210, 150, 198'},
        { id: 5, name: 'Nicaragua', shape: 'poly', coords: '120, 187, 113, 195, 104, 203, 90, 214, 98, 227, 108, 226, 122, 229, 130, 230, 146, 235, 151, 240, 164, 243, 179, 242, 185, 236, 190, 229, 190, 213, 179, 210, 162, 210, 150, 198'},
        { id: 6, name: 'Costa Rica', shape: 'poly', coords: '762,322,932,195,1083,230,1007,400,970,404,935,427,883,445,853,404,821,424,813,448,770,445,772,378'},
        { id: 7, name: 'Panamá', shape: 'poly', coords: '1529,848,129'},
    ];

    return (
        <main>
            <SeparadorAzul />
            <div className="flex justify-center items-center w-full">
                <div className="mx-auto mb-10 px-8 w-full max-w-7xl">
                    {/* Bienvenida para Sociales */}
                    <WelcomeSection
                        volverUrl="/niveles/nivel2"
                        personajeImg="/img/personajes/burbuja/burbuja.png"
                        personajeAlt="Burbuja"
                        titulo="¡SOCIALES!"
                        mensajeBienvenida="¡Bienvenidos a mi clase, soy la Profesora Burbuja y te guiaré en esta aventura!"
                    />

                    {/* Mapa interactivo de continentes */}
                    <MapSociales
                        fondoUrl="/img/niveless/sociales/mapa_ca.png"
                        subject="sociales"
                        basePath="niveles/nivel2/"
                        areas={area}
                        fondoSize="contain"
                        caricatura="/img/niveles/sociales/pirata.png"
                        medida="w-auto h-auto"

                    />
                </div>
            </div>
            <SeparadorAzul />
        </main>
    );
}
