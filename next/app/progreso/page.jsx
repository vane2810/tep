"use client";
import React, { useContext, useEffect, useState } from 'react';
import { SessionContext } from '@/context/session';
import Loading from '@/components/loading';
import { SeparadorRosa } from '@/components/separador';
import WelcomeSection from '@/components/templates/subjects/welcomeSection';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ProgresoPage() {
    const { session } = useContext(SessionContext);
    const [progreso, setProgreso] = useState([]);
    const [loading, setLoading] = useState(true);
    const [materia, setMateria] = useState('Lenguaje');

    useEffect(() => {
        const obtenerProgreso = async () => {
            try {
                if (session && session.user) {
                    const response = await fetch(`http://localhost:3001/api/progreso/obtener-progreso/${session.user}/${materia}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setProgreso(data);
                    } else {
                        console.error('Error al obtener el progreso:', response.statusText);
                    }
                }
            } catch (error) {
                console.error('Error al obtener el progreso:', error);
            } finally {
                setLoading(false);
            }
        };

        obtenerProgreso();
    }, [session, materia]);

    if (loading) {
        return <Loading />;
    }

    // Limitar los datos a mostrar en el gráfico a los 5 niveles más recientes
    const niveles = progreso.slice(-5).map(item => `Nivel ${item.nivel - 1}`);
    const puntajes = progreso.slice(-5).map(item => item.puntaje);

    const data = {
        labels: niveles,
        datasets: [
            {
                label: `Puntaje en ${materia}`,
                data: puntajes,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: `Progreso en ${materia}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100, 
            },
        },
    };

    return (
        <main className="bg-gray-100 min-h-screen">
            <SeparadorRosa />
            <WelcomeSection
                volverUrl="/niveles/nivel1"
                personajeImg="/img/personajes/starly/starly.png"
                personajeAlt="Starly"
                titulo="Progreso del Estudiante"
                mensajeBienvenida="¡Bienvenidos a tu progreso, aquí podrás revisar tu avance académico!"
            />
            <div className="mx-auto px-4 py-8 container">
                {/* Selector de materia */}
                <div className="flex justify-end mb-4">
                    <select
                        value={materia}
                        onChange={(e) => setMateria(e.target.value)}
                        className="border-gray-400 p-2 border rounded"
                    >
                        <option value="Lenguaje">Lenguaje</option>
                        <option value="Matemáticas">Matemáticas</option>
                        <option value="Sociales">Sociales</option>
                        <option value="Inglés">Inglés</option>
                    </select>
                </div>

                {/* Tabla del progreso */}
                {progreso.length > 0 ? (
                    <>
                        <table className="border-collapse bg-white shadow-lg mt-8 rounded-lg min-w-full table-auto">
                            <thead className="bg-purple-600 text-white">
                                <tr>
                                    <th className="px-4 py-2 text-2sm">Nivel</th>
                                    <th className="px-4 py-2 text-2sm">Puntaje</th>
                                    <th className="px-4 py-2 text-2sm">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {progreso.map((item, index) => (
                                    <tr key={index} className="odd:bg-gray-100 even:bg-white text-center">
                                        <td className="px-4 py-2 border text-sm">{item.nivel - 1 }</td>
                                        <td className="px-4 py-2 border text-sm">{item.puntaje}</td>
                                        <td className="px-4 py-2 border text-sm">{new Date(item.fecha).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Gráfico de barras del progreso */}
                        <div className="relative mt-10" style={{ height: '220px', width: '100%' }}>
                            <Bar data={data} options={options} />
                        </div>
                    </>
                ) : (
                    <p>No se ha registrado progreso aún en {materia}.</p>
                )}
            </div>
            <SeparadorRosa />
        </main>
    );
}
