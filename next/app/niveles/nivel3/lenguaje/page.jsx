// Página principal de Lenguaje - Nivel 3
"use client"
import React, { useEffect, useState, useContext } from "react";
import WelcomeSection from '@/components/templates/materias/welcomeSection';
import MapLenguaje from '@/components/templates/materias/mapLenguaje';
import '@/styles/animacion.css';
import { SeparadorMorado } from "@/components/separador";
import { SessionContext } from '@/context/session';

export default function LenguajePage() {
  const { session } = useContext(SessionContext); // Para acceder a la sesión del usuario
  const [progreso, setProgreso] = useState([]);

  // Cargar el progreso del usuario desde el backend o localStorage
  useEffect(() => {
    const obtenerProgreso = async () => {
      try {
        if (session && session.user) {
          const res = await fetch(`http://localhost:3001/api/progreso/obtener-progreso/${session.user}/lenguaje`);
          const data = await res.json();
          setProgreso(data.map(item => item.nivel)); // Extraer los niveles desbloqueados
        } else {
          // Si no hay sesión, intentar cargar desde localStorage
          const progresoLocal = JSON.parse(localStorage.getItem('progresoLenguaje')) || [1]; // Nivel 1 desbloqueado por defecto
          setProgreso(progresoLocal);
        }
      } catch (error) {
        console.error('Error obteniendo el progreso:', error);
      }
    };

    obtenerProgreso();
  }, [session]);

  const levels = [
    { id: 1, name: 'Contenido 1', position: { top: '85%', left: '10%' }, color: 'white', nivel: 1 },
    { id: 2, name: 'Contenido 2', position: { top: '78%', left: '20%' }, color: 'white', nivel: 2 },
    { id: 3, name: 'Contenido 3', position: { top: '70%', left: '30%' }, color: 'white', nivel: 3 },
    { id: 4, name: 'Contenido 4', position: { top: '65%', left: '40%' }, color: 'white', nivel: 4 },
    { id: 5, name: 'Contenido 5', position: { top: '60%', left: '50%' }, color: 'white', nivel: 5 },
    { id: 6, name: 'Contenido 6', position: { top: '55%', left: '60%' }, color: 'white', nivel: 6 },
    { id: 7, name: 'Contenido 7', position: { top: '50%', left: '69%' }, color: 'white', nivel: 7 },
    { id: 8, name: 'Contenido 8', position: { top: '45%', left: '78%' }, color: 'white', nivel: 8 },
    { id: 9, name: 'Contenido 9', position: { top: '35%', left: '84%' }, color: 'white', nivel: 9 },
    { id: 10, name: 'Contenido 10', position: { top: '22%', left: '87%' }, color: 'white', nivel: 10 },
  ];

  const decorativos = [
    { img: '/img/niveless/lenguaje/lvl1/planetan1.png', alt: 'Planeta', className: 'planet-animation', style: { top: '9%', left: '90%', width: '8vw' } },
    { img: '/img/niveless/lenguaje/lvl1/coheten1.png', alt: 'Cohete', className: 'rocket-animation', style: { top: '5%', left: '5%', width: '8vw' } },
    { img: '/img/niveless/lenguaje/lvl1/naven1.png', alt: 'Cometa', className: 'comet-animation', style: { right: '5%', bottom: '5%', width: '6vw' } },
  ];

  return (
    <main>
      <SeparadorMorado />

      <div className="flex justify-center items-center w-full">
        <div className="mx-auto mb-10 px-8 w-full max-w-7xl">
          {/* Bienvenida para Lenguaje */}
          <WelcomeSection
            volverUrl="/niveles/nivel3"
            personajeImg="/img/personajes/principe/principe.png"
            personajeAlt="Principe"
            titulo="¡Lenguaje!"
            mensajeBienvenida="¡Bienvenidos a mi clase, soy el Profesor Principe y te guiaré en esta aventura!"
          />

          {/* Mapa de niveles para Lenguaje */}
          <MapLenguaje
            subject="lenguaje"
            basePath="niveles/nivel3/"
            levels={levels}
            fondoUrl="/img/niveless/lenguaje/lvl1/fondon3.jpg"
            decorativos={decorativos}
            camino="/img/niveless/lenguaje/lvl1/estrella.png"
            caricatura="/img/niveless/lenguaje/lvl1/astronautan1.png"
            progreso={progreso}  
          />
        </div>
      </div>
      <SeparadorMorado />
    </main>
  );
}
