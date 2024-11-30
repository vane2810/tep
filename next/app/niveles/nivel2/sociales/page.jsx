// Página principal de Sociales - Nivel 2
"use client"
import React, { useEffect, useState, useContext } from 'react';
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
    const { session } = useContext(SessionContext);
    const [progreso, setProgreso] = useState([]);
    
    // Se cargará el progreso del usuario desde el localStorage o el backend
    useEffect(() => {
        const obtenerProgreso = async () => {
            try {
                if (session && session.user) {
                    const res = await fetch(`http://localhost:3001/api/progreso/obtener-progreso/${session.user}/sociales`);
                    const data = await res.json();
                    setProgreso(data.map(item => item.nivel)); // Extraemos los niveles desbloqueados
                } else {
                    // Si no hay sesión, intentamos cargar desde localStorage
                    const progresoLocal = JSON.parse(localStorage.getItem('progresoSociales')) || [1]; // Nivel 1 desbloqueado por defecto
                    setProgreso(progresoLocal);
                }
            } catch (error) {
                console.error('Error obteniendo el progreso:', error);
            }
        };

        obtenerProgreso();
    }, [session]);

    const area = [
        { id: 1, name: 'Bélice', shape: 'poly', coords: '677,27 640,70,621 ,75,609,242,630,246 662,222,689, 173,694, 109,701,75,708,31', nivel: 1 },
        { id: 2, name: 'Guatemala', shape: 'poly', coords: '453,125,455 ,85,608,83,598,256,657,275,677,263,655,285,643,298, 603,327,596, 363,579, 387,567,409, 547,417,533,427,518,441,482,427,453,434,421,424,357,388,357,329,391,241,503,244,457,164,428,132', nivel: 2 },
        { id: 3, name: 'Honduras', shape: 'poly', coords: '1611,332,686,275,738,268,844,265,888,256,959,259,1052,293,1113,339,1073,349,1011,373,986,358,954,368,928,410,900, 441,867,426,845,444,806,458,803,495,779,515,752,515,735,468,738,431,721,431,691,424,667,407,633,398,604,383', nivel: 3 },
        { id: 4, name: 'El Salvador', shape: 'poly', coords: '523,451,560,424,587,397,623,410,650,419,667,443,696,436,706,448,727,451,725,488,715,510,640,498,553,482,535,468', nivel: 4 },
        { id: 5, name: 'Nicaragua', shape: 'poly', coords: '1100,358,1078,721,1005,705,964,709,905,692,894,700,823,632,769,561,752,543,810,500,827,466,871,443,901,453,935,429,952,395,966,373,1013,387,1061,370', nivel: 5 },
        { id: 6, name: 'Costa Rica', shape: 'poly', coords: '901,704,1079,736,1157,834,1128,858,1139,894,1135,961,1067,933,1074,885,996,844,955,793,966,824,945,851,920,816,891,800,888,761', nivel: 6 },
        { id: 7, name: 'Panamá', shape: 'poly', coords: '1173,840,1210,891,1285,901,1357,869,1427,830,1493,851,1559,886,1602,919,1614,979,1585,1025,1544,1038,1503,936,1488,919,1432,890,1398,909,1383,934,1363,956,1334,970,1356,1004,1369,1026,1307,1056,1295,990,1281,1016,1247,1004,1240,973,1205,966,1181,966,1145,960,1147,856', nivel: 7 },
        { id: 8, name: 'Océano Pacífico', shape: 'poly', coords: '372,574,365,882,754,887,718,569', nivel: 8 },
        { id: 9, name: 'Océano Atlántico', shape: 'poly', coords: "1154,300,1178,623,1619,614,1554,290,1286,292", nivel: 9 },
    ];

    return (
        <main>
            <SeparadorAzul />
            <div className="flex justify-center items-center w-full">
                <div className="mx-auto mb-10 px-8 w-full max-w-7xl">
                    {/* Bienvenida para Sociales */}
                    <WelcomeSection
                        volverUrl="/niveles/nivel2"
                        personajeImg="/img/personajes/burbuja/burbuja.webp"
                        personajeAlt="Burbuja"
                        titulo="¡SOCIALES!"
                        mensajeBienvenida="¡Bienvenidos a mi clase, soy la Profesora Burbuja y te guiaré en esta aventura!"
                    />

                    {/* Mapa interactivo de continentes */}
                    <MapSociales
                        fondoUrl="/img/niveless/sociales/mapa_centroamerica.png"
                        subject="sociales"
                        basePath="niveles/nivel2/"
                        areas={area}
                        fondoSize="contain"
                        caricatura="/img/niveles/sociales/pirata.png"
                        medida="w-full h-auto"
                        progreso={progreso}  // Pasamos el progreso al mapa para bloquear niveles
                    />
                </div>
            </div>
            <SeparadorAzul />
        </main>
    );
}
