"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from './Sidebar';
import styles from "../styles/globals.css";

const Navbar = ({ router, userType }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Limpiar el localStorage u otros datos de autenticación
    localStorage.removeItem('user');

    // Redirigir al usuario a la página de inicio de sesión
    router.push('/');
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

      {/* Botón de cerrar sesión (solo para estudiantes autenticados) */}
      {userType === "student" && (
        <div className="flex items-center">
          <div className="text-xl font-bold mr-4">{/* Aquí muestra el nombre del estudiante */}</div>
          <button onClick={handleLogout} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Cerrar sesión</button>
        </div>
      )}

      {/* Icono para abrir la barra lateral */}
      <img src="/img/page/linea.png" alt="Abrir barra lateral" className="h- w-8 cursor-pointer" onClick={toggleSidebar} />

      {/* Barra lateral */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
