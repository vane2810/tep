"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from './sidebar';
import useSession from '@/hooks/useSession'; 

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { session, login, logout } = useSession();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    console.log('Navbar renderizado nuevamente', session);
  }, [session]);

  // Al hacer clic en el botón de cerrar sesión
  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = '/';
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
        {session ? (
          <div className="hidden sm:flex items-center mr-4">
            <div className="text-xl font-bold mr-2">Bienvenido</div>
            <button onClick={handleLogout} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 mr-4 px-4 rounded">Cerrar sesión</button>
          </div>
        ) : (
          <div className="hidden sm:block">
            <Link href="/adm/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Iniciar sesión</Link>
            <Link href="/adm/registro" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-20 rounded">Registrarse</Link>
          </div>
        )}
        <img src="/img/page/linea.png" alt="Abrir barra lateral" className="h-10 w-10 cursor-pointer mr-4" onClick={toggleSidebar} />
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
