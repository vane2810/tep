"use client";

import React from "react";
import aboutData from "@/public/assents/about.json";
import { SeparadorAzul } from "@/components/separador";
import Volver from "@/components/elements/botonVolver";
import { FiTarget, FiEye, FiUsers } from "react-icons/fi";

export default function AboutUs() {
    const teamMembers = aboutData.members;

    return (
        <main className="bg-gray-50">
            <SeparadorAzul />
            <div className="my-10 px-4 sm:px-8 md:px-12 lg:px-24 yagora">

                {/* Información General en Contenedor Elevado con Imagen */}
                <section className="mb-16 text-center">
                    <h1 className="flex justify-center items-center gap-2 mb-8 font-bold text-5xl text-blue-600 super">
                        ACERCA DE NOSOTROS
                    </h1>
                    <div className="flex md:flex-row flex-col items-center md:items-start gap-8 bg-white shadow-xl mx-auto p-8 rounded-lg max-w-5xl">
                        <Volver />
                        <img
                            src="/img/home/logoTEP.webp"
                            alt="Aprende Conectado"
                            className="rounded-lg w-full md:w-1/4 h-auto object-cover"
                        />
                        <div className="md:w-3/4 text-lg leading-relaxed">
                            <p className="mb-6 font-bold text-xl">
                                TechEduPlanet
                            </p>
                            <p>
                                Es una plataforma educativa diseñada para transformar el aprendizaje mediante el uso de juegos interactivos, herramientas intuitivas y contenido personalizado.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Misión y Visión en Tarjetas */}
                <section className="gap-8 grid grid-cols-1 md:grid-cols-2 mx-auto mb-16 max-w-5xl">
                    {/* Misión */}
                    <div className="bg-white shadow-md p-6 rounded-lg text-center">
                        <h2 className="flex justify-center items-center gap-2 mb-4 font-semibold text-3xl text-blue-500 wonder">
                            Misión
                            <FiTarget className="text-blue-500" size={28} />
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Proporcionar una plataforma educativa que haga del aprendizaje una experiencia accesible, interactiva y efectiva para todos los estudiantes
                        </p>
                    </div>
                    {/* Visión */}
                    <div className="bg-white shadow-md p-6 rounded-lg text-center">
                        <h2 className="flex justify-center items-center gap-2 mb-4 font-semibold text-3xl text-blue-500 wonder">
                            Visión
                            <FiEye className="text-blue-500" size={28} />
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Ser una plataforma educativa reconocida por su capacidad de hacer el aprendizaje más atractivo y accesible para estudiantes de nivel básico 
                        </p>
                    </div>
                </section>

                {/* Nuestro Equipo */}
                <section className="mx-auto mt-16 mb-16 max-w-6xl">
                    <h2 className="flex justify-center items-center gap-2 mb-8 font-semibold text-3xl text-blue-500 text-center wonder">
                        Nuestro Equipo
                        <FiUsers className="text-blue-500" size={28} />
                    </h2>
                    <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white shadow-md p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-300">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="mx-auto mb-4 rounded-lg w-24 h-24 object-cover"
                                />
                                <h3 className="font-semibold text-gray-800 text-xl wonder">{member.name}</h3>
                                <p className="text-gray-500">{member.role}</p>
                                <div className="mt-4 text-gray-600 text-sm leading-relaxed">
                                    {member.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <SeparadorAzul />
        </main>
    );
}
