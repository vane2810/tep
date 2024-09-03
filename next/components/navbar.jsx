// Navbar
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from './sidebar';
import useSession from '@/hooks/useSession';
import characterImages from '@/utils/characterImages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

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


  const logoLink = session
    ? `/niveles/nivel${session.nivel}`  
    : '/'; 

  return (
    <nav className="flex justify-between items-center p-6 celeste text-black sticky top-0 left-0 right-0 z-10">
      <div className="flex items-center">
        <Link href={logoLink} className="flex items-center">
          <img src="/img/home/logoTEP.png" alt="Logo de la aplicación" className="h-20 w-auto mr-4 sm:mr-10 ml-4 sm:ml-10" />
          <span className="text-3xl super hidden sm:block">TechEduPlanet</span>
        </Link>
      </div>
      
      <div className="flex items-center relative">
        {session ? (
          <div className="hidden sm:flex items-center mr-12 relative">
            <div className='text-2xl text-center mr-10 font-bold story text-rosado'>
              <h1>Bienvenido</h1>
              <span> {session.name}</span>
            </div>
            {selectedCharacter && (
              <div className="relative transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                <img
                  src={characterImages[selectedCharacter]}
                  alt="Personaje"
                  title='Personaje'
                  className="w-20 h-20 object-cover rounded-xl border-2 border-black cursor-pointer"
                  onClick={toggleDropdown}
                />
              </div>
            )}
            {isDropdownOpen && (
              <div className="absolute -right-12 mt-2 w-50 bg-white border rounded-lg shadow-lg z-50 transform translate-y-24 story">
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-lg  hover:bg-red-500">
                  Cerrar sesión
                  <FontAwesomeIcon icon={faSignOutAlt} className="ml-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden sm:block">
            <Link href="/adm/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Iniciar sesión</Link>
            <Link href="/adm/registro" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-20 rounded">Registrarse</Link>
          </div>
        )}
        <img src="/img/home/barra/linea.png" alt="Abrir barra lateral" className="h-10 w-10 cursor-pointer mr-4" onClick={toggleSidebar} />
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
