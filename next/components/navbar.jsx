// Navbar
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from './sidebar';
import useSession from '@/hooks/useSession';
import characterImages from '@/utils/characterImages';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { session, logout, selectedCharacter } = useSession();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('hasSeenWelcome');
    logout();
    window.location.href = '/';
  };

  const logoLink = session ? `/niveles/nivel${session.nivel}` : '/';

  return (
    <nav className="top-0 right-0 left-0 z-10 sticky flex justify-between items-center p-6 text-black celeste">
      <div className="flex items-center">
        <Link href={logoLink} className="flex items-center">
          <img
            src="/img/home/logoTEP.png"
            alt="Logo de la aplicación"
            className="mr-4 sm:mr-10 ml-4 sm:ml-10 w-auto h-20"
          />
          <span className="sm:block hidden text-3xl super">TechEduPlanet</span>
        </Link>
      </div>

      <div className="relative flex items-center">
        {session ? (
          <>


          {/* Mostrar el enlace al panel de administración solo si el usuario es admin */}
          {session.role === 'admin' && (
              <div className="mr-12">
                <Link href="/admin">
                  <button className="bg-purple-700 hover:bg-purple-500 px-4 py-2 rounded font-bold text-white">
                    Panel de Administración
                  </button>
                </Link>
              </div>
            )}

            {/* Mostrar el enlace al panel de administración solo si el usuario es padre */}
            {session.role === 'padre' && (
              <div className="mr-12">
                <Link href="/docente">
                  <button className="bg-purple-700 hover:bg-purple-500 px-4 py-2 rounded font-bold text-white">
                    Ingresar usuarios
                  </button>
                </Link>
              </div>
            )}

            {/* Mostrar el enlace al panel de administración solo si el usuario es docente */}
            {session.role === 'docente' && (
              <div className="mr-12">
                <Link href="/docente">
                  <button className="bg-purple-700 hover:bg-purple-500 px-4 py-2 rounded font-bold text-white">
                    Ingresar estudiantes
                  </button>
                </Link>
              </div>
            )}
            <div className="relative sm:flex items-center hidden mr-12">
              <div className='mr-10 font-bold text-2xl text-center text-rosado story'>
                <h1>Bienvenido</h1>
                <span>{session.name}</span>
              </div>

              {selectedCharacter && (
                <div className="relative hover:shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
                  <img
                    src={characterImages[selectedCharacter]}
                    alt="Personaje"
                    title='Personaje'
                    className="border-2 border-black rounded-xl w-20 h-20 cursor-pointer object-cover"
                    onClick={toggleDropdown}
                  />
                </div>
              )}

              {/* Dropdown para cerrar sesión en el perfil para todos los roles */}
              {isDropdownOpen && (
                <div className="-right-12 z-50 absolute bg-white shadow-lg mt-2 border rounded-lg w-50 transform translate-y-24 story">
                  <button onClick={handleLogout} className="block hover:bg-red-500 px-4 py-2 w-full text-left text-lg">
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>

            
          </>
        ) : (
          <div className="sm:block hidden">
            <Link href="/auth/login" className="bg-blue-500 hover:bg-blue-700 mr-4 px-4 py-2 rounded font-bold text-white">
              Iniciar sesión
            </Link>
            <Link href="/auth/registro" className="bg-green-500 hover:bg-green-700 mr-20 px-4 py-2 rounded font-bold text-white">
              Registrarse
            </Link>
          </div>
        )}

        <img
          src="/img/home/barra/linea.png"
          alt="Abrir barra lateral"
          className="mr-4 w-10 h-10 cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} session={session} />
    </nav>
  );
};

export default Navbar;
