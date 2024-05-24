"use client";
import Link from "next/link";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import styles from "../styles/globals.css";

export default function Navbar({ userType }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="flex justify-between items-center p-6 celeste text-black sticky top-0 left-0 right-0 z-10">
      {/* Logo y nombre */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <img src="/img/page/logoTEP.png" alt="Logo de la aplicación" className="h-20 w-auto mr-10 ml-10" />
        </Link>
        <span className="text-3xl super">TechEduPlanet</span>
      </div>

      {/* Botón de inicio de sesión y registro (solo para invitados) */}
      {userType === "guest" && (
        <div>
          <Link href="/adm/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Iniciar sesión</Link>
          <Link href="/adm/registro" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Registrarse</Link>
        </div>
      )}

      {/* Nombre del estudiante (solo para estudiantes) */}
      {userType === "student" && (
        <div className="text-xl font-bold">{/* Aquí muestra el nombre del estudiante */}</div>
      )}

      {/* Icono para abrir la barra lateral */}
      <img src="/img/page/linea.png" alt="Abrir barra lateral" className="h- w-8 cursor-pointer"  onClick={toggleSidebar}/>

      {/* Barra lateral */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </nav>
  );
}
