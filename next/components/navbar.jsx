"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from './sidebar';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    console.log('Navbar renderizado nuevamente' , isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    // Llama a la función logout del contexto de autenticación para cerrar sesión
    logout();
    // Aquí puedes agregar la lógica para redirigir a la página de inicio u otra página
  };

  return (
    <nav className="flex justify-between items-center p-6 celeste text-black sticky top-0 left-0 right-0 z-10">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <img src="/img/page/logoTEP.png" alt="Logo de la aplicación" className="h-20 w-auto mr-4 sm:mr-10 ml-4 sm:ml-10" />
        </Link>
        <Link href='/' className="text-3xl super hidden sm:block">TechEduPlanet</Link>
      </div>

      <div className="flex items-center">
        {/* Mostrar contenido diferente según la autenticación del usuario */}
        {!isLoggedIn ? (
          // Mostrar botones de inicio de sesión y registro si el usuario no está autenticado
          <div className="hidden sm:block">
            <Link href="/adm/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Iniciar sesión</Link>
            <Link href="/adm/registro" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-20 rounded">Registrarse</Link>
          </div>
        ) : (
          // Mostrar nombre de usuario y botón de cierre de sesión si el usuario está autenticado
          <div className="hidden sm:flex items-center mr-4">
            <div className="text-xl font-bold mr-2">Usuario Estudiante</div>
            <button onClick={handleLogout} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 mr-4 px-4 rounded">Cerrar sesión</button>
          </div>
        )}

        {/* Icono para abrir la barra lateral */}
        <img src="/img/page/linea.png" alt="Abrir barra lateral" className="h-10 w-10 cursor-pointer mr-4" onClick={toggleSidebar} />
      </div>

      {/* Barra lateral */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
