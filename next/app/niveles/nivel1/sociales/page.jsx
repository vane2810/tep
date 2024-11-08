// Página principal de Sociales - Nivel 1
"use client"
import React, { useContext, useEffect, useState } from 'react';
import WelcomeSection from '@/components/templates/subjects/welcomeSection';
import dynamic from 'next/dynamic';
import '@/styles/animacion.css';
import { SeparadorAzul } from '@/components/separador';
import { SessionContext } from '@/context/session';

// Importación dinámica de LevelMap
const MapSociales = dynamic(() => import('@/components/templates/subjects/mapSociales'), {
  ssr: false,
});

export default function SocialesPage() {
    const { session } = useContext(SessionContext); // Usar el contexto de sesión
    const [progreso, setProgreso] = useState([1]); // Progreso inicial en localStorage o en la base de datos

    useEffect(() => {
        // Recuperar el progreso del localStorage o backend
        const savedProgress = JSON.parse(localStorage.getItem('progresoSociales')) || [1];
        setProgreso(savedProgress);
    }, []);

    const area = [
        { id: 1, name: 'Contenido 1', shape: 'circle', coords: '182,127,120' },
        { id: 2, name: 'Contenido 2', shape: 'circle', coords: '431,229,111'},
        { id: 3, name: 'Contenido 3', shape: 'circle', coords: '147,445,112'},
        { id: 4, name: 'Contenido 4', shape: 'circle', coords: '179,696,115'},
        { id: 5, name: 'Contenido 5', shape: 'circle', coords: '571,879,114'},
        { id: 6, name: 'Contenido 6', shape: 'circle', coords: '1803,769,119'},
        { id: 7, name: 'Contenido 7', shape: 'circle', coords: '1742,479,102'},
        { id: 8, name: 'Contenido 8', shape: 'circle', coords:'1780,117,107'},
        { id: 9, name: 'Contenido 9', shape: 'circle', coords: '1447,350,110'},
        { id: 10, name: 'Contenido 10', shape: 'circle', coords: '969,120,117'},
    ];

    return (
        <main>
            <SeparadorAzul />
            <div className="flex justify-center items-center w-full">
                <div className="mx-auto mb-10 px-8 w-full max-w-7xl">
                    {/* Bienvenida para Sociales */}
                    <WelcomeSection
                        volverUrl="/niveles/nivel1"
                        personajeImg="/img/personajes/burbuja/burbuja.png"
                        personajeAlt="Burbuja"
                        titulo="¡SOCIALES!"
                        mensajeBienvenida="¡Bienvenidos a mi clase, soy la Profesora Burbuja y te guiaré en esta aventura!"
                    />

                    {/* Mapa interactivo de continentes */}
                    <MapSociales
                        fondoUrl="/img/niveless/sociales/mapa_sv.png"
                        subject="sociales"
                        basePath="niveles/nivel1"
                        areas={area}
                        fondoSize="contain"
                        caricatura="/img/niveles/sociales/pirata.png"
                        medida="w-full h-auto"
                        progreso={progreso} 
                    />
                </div>
            </div>
            <SeparadorAzul />
        </main>
    );
}
