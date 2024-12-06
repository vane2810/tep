"use client";
import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import Volver from "@/components/elements/botonVolver";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function EstudiantePage() {
    const { id } = useParams();
    const [estudiante, setEstudiante] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState("Matemáticas");

    // Simulación de datos de estudiantes (en un caso real, esto vendría del backend)
    const estudiantesSimulados = [
        { id: '1', nombre: 'Prueba', email: 'prueba1@gmail.com', nivel: 'Nivel 1', asignatura: 'Matemáticas' },
        { id: '2', nombre: 'Usuario Especial', email: 'prueba01@gmail.com', nivel: 'Nivel Avanzado', asignatura: 'Ciencias' },
    ];

    useEffect(() => {
        if (id) {
            // Buscar al estudiante correspondiente según el ID
            const estudianteEncontrado = estudiantesSimulados.find(est => est.id === id);
            if (estudianteEncontrado) {
                setEstudiante(estudianteEncontrado);
            }
            setCargando(false);
        }
    }, [id]);

    if (cargando) {
        return <p>Cargando...</p>;
    }

    if (!estudiante) {
        return <p>No se encontró información del estudiante.</p>;
    }

    // Configuración especial para el correo prueba01@gmail.com
    const esUsuarioEspecial = estudiante.email === "prueba01@gmail.com";
    const asignaturas = esUsuarioEspecial 
        ? ["Ciencias", "Matemáticas Avanzadas", "Física", "Química"]
        : ["Matemáticas", "Lenguaje", "Sociales", "Inglés"];

    // Datos del gráfico de progreso (pueden ser personalizados según cada asignatura)
    const data = {
        labels: ['Juego 1', 'Juego 2', 'Juego 3', 'Juego 4', 'Juego 5'],
        datasets: [
            {
                label: 'Progreso (%)',
                data: esUsuarioEspecial ? [85, 90, 95, 88, 92] : [60, 70, 80, 75, 90], // Datos simulados del progreso
                backgroundColor: esUsuarioEspecial ? 'rgba(255, 99, 132, 0.6)' : 'rgba(54, 162, 235, 0.6)',
                borderColor: esUsuarioEspecial ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
    };

    return (
        <main className="relative flex flex-col items-center bg-gray-50 p-6 w-full min-h-screen">
            {/* Botón Volver en la esquina superior izquierda */}
            <div className="top-4 left-4 absolute">
                <Volver href="/docente" />
            </div>

            {/* Título de la página */}
            <h2 className="mt-16 mb-4 font-bold text-4xl text-blue-800 text-center story">
                Progreso del Estudiante
            </h2>

            {/* Contenedor principal */}
            <div className="bg-white shadow-lg mt-4 p-6 rounded-lg w-full max-w-4xl">
                <h3 className="mb-4 font-semibold text-2xl text-blue-800">
                    {estudiante.nombre}
                </h3>
                <p className="mb-2"><strong>Correo Electrónico:</strong> {estudiante.email}</p>
                <p className="mb-2"><strong>Nivel:</strong> {estudiante.nivel}</p>

                {/* Tabs para las asignaturas */}
                <div className="border-gray-200 mb-4 border-b">
                    <nav className="flex space-x-4">
                        {asignaturas.map((asignatura) => (
                            <button
                                key={asignatura}
                                onClick={() => setAsignaturaSeleccionada(asignatura)}
                                className={`py-2 px-4 font-medium ${asignaturaSeleccionada === asignatura ? "text-blue-800 border-b-2 border-blue-800" : "text-gray-600"}`}
                            >
                                {asignatura}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Contenido de la asignatura seleccionada */}
                <div className="bg-gray-100 mt-6 p-4 rounded-lg">
                    <h4 className="mb-2 font-bold text-lg">{asignaturaSeleccionada}</h4>
                    <p className="mb-4">Progreso de {asignaturaSeleccionada}.</p>
                    
                    {/* Gráfico de progreso */}
                    <div className="mt-4">
                        <Bar data={data} options={options} />
                    </div>
                </div>
            </div>
        </main>
    );
}

