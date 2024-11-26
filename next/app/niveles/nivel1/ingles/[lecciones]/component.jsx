// Página principal para las lecciones de inglés
"use client";
import React, { useState, useEffect, useContext } from 'react';
import Volver from '@/components/elements/botonVolver';
import { SeparadorAnaranjado } from '@/components/separador';
import { useRouter } from 'next/navigation';
import Loading from '@/components/loading';
import { SessionContext } from '@/context/session';

export default function InglesComponent({ id }) {
    const [leccion, setLeccion] = useState(null);
    const [progreso, setProgreso] = useState([]);
    const router = useRouter();
    const { session } = useContext(SessionContext);  // Para manejar el progreso del usuario

    // Cargar la lección actual
    useEffect(() => {
        const fetchLeccion = async () => {
            try {
                const res = await fetch(`/assets/materias/ingles/nivel1/lecciones/leccion${id}.json`);
                if (!res.ok) throw new Error('Error al cargar el archivo JSON');
                const data = await res.json();
                setLeccion(data);
            } catch (error) {
                console.error('Error al cargar los datos de la lección:', error);
            }
        };

        if (id) {
            fetchLeccion();
        }
    }, [id]);

    // Obtener progreso del usuario
    useEffect(() => {
        const obtenerProgreso = async () => {
            if (session && session.user) {
                try {
                    const response = await fetch(`http://localhost:3001/api/progreso/obtener-progreso/${session.user}/ingles`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setProgreso(data.map(p => p.nivel));  // Obtener los niveles desbloqueados
                    } else {
                        console.error('Error al obtener el progreso:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error al obtener el progreso:', error);
                }
            }
        };

        obtenerProgreso();
    }, [session]);

    // Comprobar si la lección está desbloqueada (la primera siempre desbloqueada)
    const isLeccionDesbloqueada = (leccionId) => {
        if (leccionId === "saludos") {
            return true;  // La primera lección siempre está desbloqueada
        }
        return progreso.includes(leccionId);  // Desbloquear si el nivel ha sido alcanzado en progreso
    };

    if (!leccion) {
        return <Loading />;
    }

    return (
        <main className="relative bg-gray-50">
            <SeparadorAnaranjado />
            <Volver href="/niveles/nivel1/ingles" />

            {/* Título de bienvenida en inglés y español */}
            <div className="flex justify-center items-center">
                <img
                    src="/img/niveless/ingles/profesor.png"
                    alt="Profesor de inglés"
                    className="mr-8 w-48 h-42"
                />
                <div className="text-center">
                    <h1 className="font-bold text-5xl text-blue-800 story">Welcome to the {leccion.nombreIngles} lessons</h1>
                    <p className="mb-6 text-gray-600 text-xl italic">Bienvenidos a las lecciones de {leccion.nombreEspañol}</p>
                </div>
            </div>

            {/* Sección de tarjetas de lecciones */}
            <div className="mx-auto px-6 container">
                <div className="flex justify-center items-center my-8">
                    <div className="text-center">
                        <h3 className="font-bold text-3xl text-blue-800 story">Select a lesson</h3>
                        <p className="text-gray-600 text-xl italic">Selecciona una lección</p>
                    </div>
                    <img
                        src="/img/niveless/ingles/profesora.png"
                        alt="Estudiante de inglés"
                        className="ml-8 w-48 h-42"
                    />
                </div>

                <div className="gap-8 grid grid-cols-3 my-10">
                    {leccion.lecciones.map((leccion) => (
                        <div
                            key={leccion.id}
                            className={`flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out ${
                                isLeccionDesbloqueada(leccion.id)
                                    ? 'bg-white transform hover:-translate-y-1'
                                    : 'bg-gray-200 cursor-not-allowed opacity-50'
                            }`}
                        >
                            {/* Título en inglés grande y traducción en español más pequeña */}
                            <h5 className="mb-2 font-bold text-3xl story">{leccion.nombreIngles}</h5>
                            <p className="mb-6 text-gray-600 text-lg italic">{leccion.nombreEspañol}</p>

                            {/* Ajustar la imagen */}
                            <div className="relative w-full h-40">
                                <img
                                    src={leccion.imagen}
                                    alt={leccion.nombreIngles}
                                    title={`Lección ${leccion.nombreIngles}`}
                                    className="shadow-lg rounded-lg w-full h-full object-cover"
                                />
                            </div>

                            {/* Botón de explorar deshabilitado si la lección está bloqueada */}
                            <button
                                className={`mt-4 px-4 py-2 rounded font-bold text-lg story ${
                                    isLeccionDesbloqueada(leccion.id)
                                        ? 'bg-orange-500 hover:bg-orange-700 text-white'
                                        : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                }`}
                                onClick={() =>
                                    isLeccionDesbloqueada(leccion.id) &&
                                    router.push(`/niveles/nivel1/ingles/${id}/${leccion.id}`)
                                }
                                title={isLeccionDesbloqueada(leccion.id) ? `Explorar ${leccion.nombreIngles}` : 'Lección bloqueada'}
                                disabled={!isLeccionDesbloqueada(leccion.id)}
                            >
                                {isLeccionDesbloqueada(leccion.id) ? `Explore ${leccion.nombreIngles}` : 'Lección Bloqueada'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <SeparadorAnaranjado />
        </main>
    );
}
