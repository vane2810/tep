// components/Footer.js
"use client"
import React from "react";
import { FiYoutube, FiMail } from "react-icons/fi";
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="shadow-md p-6 w-full text-black celeste">
            <div className="flex lg:flex-row flex-col justify-between items-center lg:items-start lg:space-x-8 space-y-6 lg:space-y-0 mx-auto container yagora">

                {/* Logo y Derechos Reservados */}
                <div className="flex lg:flex-row flex-col items-center lg:items-center lg:space-x-4 space-y-2 lg:space-y-0 lg:w-1/3 text-center lg:text-left">
                    <Image 
                        src="/img/home/logoTEP.webp" 
                        alt="Logo de TechEduPlanet"
                        width={80}
                        height={40}
                        className="object-contain"
                    />
                    <div className="text-base">
                        &copy; {new Date().getFullYear()} TechEduPlanet, Inc
                    </div>
                </div>

                {/* Información de Contacto */}
                <div className="flex flex-col items-center lg:w-1/3 text-center">
                    <h3 className="mb-2 font-semibold text-xl">Contacto</h3>
                    <div className="flex items-center space-x-2">
                        <FiMail size={22} className="text-gray-700" />
                        <span className="text-base text-gray-700 hover:text-gray-900 transition duration-200">
                            tcheduplanet@gmail.com
                        </span>
                    </div>
                </div>

                {/* Canales */}
                <div className="flex flex-col items-center lg:w-1/3 text-center">
                    <h3 className="mb-2 font-semibold text-xl">Canales</h3>
                    <a href="https://www.youtube.com/@TechEduPlanet" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                        <FiYoutube size={22} className="text-red-600" />
                        <span className="text-base text-gray-700 hover:text-gray-900 transition duration-200">
                            YouTube
                        </span>
                    </a>
                </div>
                
            </div>
        </footer>
    );
}
