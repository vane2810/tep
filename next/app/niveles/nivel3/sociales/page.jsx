// Página principal de Sociales - Nivel 3
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
        { id: 1, name: 'África', shape: 'poly', coords: '703,527,827,485,956,535,1018,637,1056,642,1055,796,1039,844,977,841,943,882,899,896,708,640' },
        { id: 2, name: 'América', shape: 'poly', coords: '425,550,412,469,501,366,358,204, 155,186,110, 184,50,219,64,327,126,298,214,523,381,841,377, 1008,414,1020,667,747,635,687,597,665,552,671,506,649,463,618,409,575 '},
        { id: 3, name: 'Asia', shape: 'poly', coords: '1334,113,1102,204,1002,428,950,481,991,568,1026,624,1067,630,1140,527,1188,595,1244,536,1290,575,1294,638,1372,692,1422,694,1479,678,1533,703,1598, 691,1579,656,1523,632,1456,641,1401,630,1369,602,1423,525,1509,471,1515,360,1552,314, 1595,361,1746,247,1701,201,1488, 199'},
        { id: 4, name: 'Europa', shape: 'poly', coords: '762,322,932,195,1083,230,1007,400,970,404,935,427,883,445,853,404,821,424,813,448,770,445,772,378'},
        { id: 5, name: 'Oceanía', shape: 'circle', coords: '1529,848,129'},
    ];

    return (
        <main>
            <SeparadorAzul />
            <div className="flex justify-center items-center w-full">
                <div className="mx-auto mb-10 px-8 w-full max-w-7xl">
                    {/* Bienvenida para Sociales */}
                    <WelcomeSection
                        volverUrl="/niveles/nivel3"
                        personajeImg="/img/personajes/burbuja/burbuja.png"
                        personajeAlt="Burbuja"
                        titulo="¡SOCIALES!"
                        mensajeBienvenida="¡Bienvenidos a mi clase, soy la Profesora Burbuja y te guiaré en esta aventura!"
                    />

                    {/* Mapa interactivo de continentes */}
                    <MapSociales
                        fondoUrl="/img/niveless/sociales/mapa_mundi.jpg"
                        subject="sociales"
                        basePath="niveles/nivel3/"
                        areas={area}
                        fondoSize="contain"
                        caricatura="/img/niveles/sociales/pirata.png"
                        medida="w-full h-auto"

                    />
                </div>
            </div>
            <SeparadorAzul />
        </main>
    );
}
