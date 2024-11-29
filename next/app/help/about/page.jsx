"use client";

import aboutData from "@/public/assents/about.json"; 
import { SeparadorAzul } from "@/components/separador";

export default function AboutUs() {
    const teamMembers = aboutData.members; 

    return (
        <main className="bg-gray-50">
            <SeparadorAzul/>
            <div className="mx-auto px-6 sm:px-12 max-w-7xl">
                <section className="mb-12 text-center">
                    <h1 className="mb-6 font-bold text-4xl text-blue-600">Sobre Nosotros</h1>
                    <p className="mx-auto max-w-2xl text-gray-700 text-lg leading-relaxed">
                        <strong>Nombre de la Aplicación:</strong> Aprende Conectado
                    </p>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-700 text-lg leading-relaxed">
                        <strong>Descripción:</strong> Aprende Conectado es una plataforma educativa diseñada para transformar el aprendizaje
                        mediante el uso de juegos interactivos, herramientas intuitivas y contenido personalizado.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="mb-6 font-semibold text-3xl text-blue-500 text-center">Objetivo y Alcance</h2>
                    <p className="mx-auto mb-6 max-w-4xl text-gray-700 text-lg leading-relaxed">
                        <strong>Objetivo:</strong> Proporcionar a los estudiantes, docentes y administradores una herramienta innovadora
                        que fomente el aprendizaje interactivo, mejore la retención de conocimiento y facilite el monitoreo del progreso académico.
                    </p>
                    <p className="mx-auto max-w-4xl text-gray-700 text-lg leading-relaxed">
                        <strong>Alcance:</strong> Diseñada para estudiantes de nivel básico a intermedio, esta plataforma incluye actividades, juegos
                        y evaluaciones adaptadas a las necesidades de aprendizaje, abarcando desde operaciones matemáticas hasta habilidades
                        lingüísticas.
                    </p>
                </section>

                <section className="items-center gap-10 grid grid-cols-1 md:grid-cols-2 mb-12">
                    <img
                        src="/img/vision.jpg"
                        alt="Visión"
                        className="shadow-lg rounded-lg w-full h-auto"
                    />
                    <div>
                        <h2 className="mb-4 font-semibold text-3xl text-blue-500">Misión</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Inspirar a las nuevas generaciones a través de la tecnología, fomentando el aprendizaje activo y colaborativo.
                            Nuestra misión es transformar la educación en una experiencia enriquecedora y accesible para todos.
                        </p>
                        <h2 className="mt-8 mb-4 font-semibold text-3xl text-blue-500">Visión</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Ser líderes en la innovación educativa, utilizando herramientas tecnológicas para empoderar a estudiantes,
                            docentes y comunidades educativas alrededor del mundo.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="mb-6 font-semibold text-3xl text-blue-500 text-center">Nuestro Equipo</h2>
                    <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white shadow-md p-6 rounded-lg text-center">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="mx-auto mb-4 rounded-full w-24 h-24 object-cover"
                                />
                                <h3 className="font-semibold text-gray-800 text-xl">{member.name}</h3>
                                <p className="text-gray-500">{member.role}</p>
                                <p className="mt-4 text-gray-600 text-sm">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <SeparadorAzul/>
        </main>
    );
}
