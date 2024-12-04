"use client";
import React, { useState } from "react";

// Importación de componentes para los roles
import EstudiantesNavegacion from '@/components/books/estudiantes/navegacion'; 
import EstudiantesProgreso from '@/components/books/estudiantes/progreso'; 
import EstudiantesReceso from '@/components/books/estudiantes/receso'; 
import DocentesEstudiantes from '@/components/books/docentes/estudiantes'; 
import Login from '@/components/books/auth/login'; 
import Register from '@/components/books/auth/register';

const UserManualPage = () => {
  const [activeRole, setActiveRole] = useState(null); // Estado para el rol activo
  const [activeComponent, setActiveComponent] = useState(null); // Estado para el componente activo

  // Función para seleccionar un rol
  const selectRole = (role) => {
    if (activeRole === role) {
      setActiveRole(null); // Si ya está activo, lo desactivamos
      setActiveComponent(null); // También desactivamos el componente
    } else {
      setActiveRole(role);
      setActiveComponent(null); // Resetear el componente seleccionado
    }
  };

  // Función para seleccionar el componente de un rol
  const selectComponent = (component) => {
    setActiveComponent(component); // Establecemos el componente seleccionado
  };

  // Función para asignar colores diferenciados a cada rol
  const getRoleColor = (role) => {
    switch (role) {
      case "estudiantes":
        return "bg-pink-500 text-black"; // Fondo rosado para Estudiantes
      case "docentes":
        return "bg-blue-500 text-black"; // Fondo azul para Docentes
      case "padres":
        return "bg-green-500 text-black"; // Fondo verde para Padres
      case "auth":
        return "bg-yellow-500 text-black"; // Fondo amarillo para Autenticación
      default:
        return "bg-gray-500 text-black"; // Color por defecto
    }
  };

  // Función para asignar un color de fondo suave para los componentes según el rol activo
  const getComponentColor = () => {
    switch (activeRole) {
      case "estudiantes":
        return "bg-pink-200 text-black"; // Fondo rosado suave para componentes de Estudiantes
      case "docentes":
        return "bg-blue-200 text-black"; // Fondo azul suave para componentes de Docentes
      case "padres":
        return "bg-green-200 text-black"; // Fondo verde suave para componentes de Padres
      case "auth":
        return "bg-yellow-200 text-black"; // Fondo amarillo suave para componentes de Autenticación
      default:
        return "bg-gray-200 text-black"; // Fondo por defecto para los componentes
    }
  };

  // Función para mostrar la bienvenida según el rol activo
  const getRoleDescription = () => {
    switch (activeRole) {
      case "estudiantes":
        return (
          <div className="text-center mt-4">
            <h3 className="text-2xl font-bold text-black super">¡ROL DE ESTUDIANTE!</h3>
            <img src="/img/estudiante-image.png" alt="Imagen de estudiante" className="mx-auto mt-4 w-32" />
          </div>
        );
      case "docentes":
        return (
          <div className="text-center mt-4">
            <h3 className="text-2xl font-bold text-black super ">¡ROL DE DOCENTE!</h3>
            <img src="/img/docente-image.png" alt="Imagen de docente" className="mx-auto mt-4 w-32" />
          </div>
        );
      case "padres":
        return (
          <div className="text-center mt-4">
            <h3 className="text-2xl font-bold text-black super">¡ROL DE PADRES!</h3>
            <img src="/img/padres-image.png" alt="Imagen de padres" className="mx-auto mt-4 w-32" />
          </div>
        );
      case "auth":
        return (
          <div className="text-center mt-4">
            <h3 className="text-2xl font-bold text-black super ">¡ROL DE ADMINISTRADOR!</h3>
            <img src="/img/auth-image.png" alt="Imagen de autenticación" className="mx-auto mt-4 w-32" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar de roles (Izquierda) */}
      <div className="w-64 p-4 border-r-4 border-purple-300 bg-purple-100 shadow-lg rounded-lg">
        <h1
          onClick={() => setActiveRole(null)} // Al hacer clic, mostramos la bienvenida
          className="text-3xl font-bold mb-6 text-center text-black cursor-pointer super"
        >
          ¡MANUAL DE USUARIO!
        </h1>
        <img src="/img/personajes/starly/starly.webp" alt="Imagen de bienvenida" className="w-full mb-6" />
        <ul>
          {/* Roles */}
          <li>
            <button
              onClick={() => selectRole("auth")}
              className={`w-full text-center font-bold p-2 mb-2 rounded-lg border-2 border-black hover:border-gray-500 wonder ${getRoleColor("auth")}`}
            >
              Administrador
            </button>
            {activeRole === "auth" && (
              <div className="pl-4">
                <button
                  onClick={() => selectComponent("login")}
                  className={`w-full text-center font-bold p-2 mb-2 rounded-lg border-2 border-black hover:border-gray-500 wonder ${activeComponent === "login" ? getComponentColor() : ""}`}
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => selectComponent("register")}
                  className={`w-full text-center font-bold p-2 mb-2 rounded-lg border-2 border-black hover:border-gray-500 wonder ${activeComponent === "register" ? getComponentColor() : ""}`}
                >
                  Registro
                </button>
              </div>
            )}
          </li>

          <li>
            <button
              onClick={() => selectRole("estudiantes")}
              className={`w-full text-center font-bold p-2 mb-2 rounded-lg border-2 border-black hover:border-gray-500 wonder ${getRoleColor("estudiantes")}`}
            >
              Estudiantes
            </button>
            {activeRole === "estudiantes" && (
              <div className="pl-4">
                <button
                  onClick={() => selectComponent("navegacion")}
                  className={`w-full text-center font-bold p-2 mb-2 rounded-lg border-2 border-black hover:border-gray-500 wonder ${activeComponent === "navegacion" ? getComponentColor() : ""}`}
                >
                  Navegación
                </button>
                <button
                  onClick={() => selectComponent("progreso")}
                  className={`w-full text-center font-bold p-2 mb-2 rounded-lg border-2 border-black hover:border-gray-500 wonder ${activeComponent === "progreso" ? getComponentColor() : ""}`}
                >
                  Progreso
                </button>
                <button
                  onClick={() => selectComponent("receso")}
                  className={`w-full text-center font-bold p-2 mb-2 rounded-lg border-2 border-black hover:border-gray-500 wonder ${activeComponent === "receso" ? getComponentColor() : ""}`}
                >
                  Receso
                </button>
              </div>
            )}
          </li>

          <li>
            <button
              onClick={() => selectRole("docentes")}
              className={`w-full text-center font-bold p-2 mb-2 rounded-lg border-2 border-black hover:border-gray-500 wonder ${getRoleColor("docentes")}`}
            >
              Docentes
            </button>
            {activeRole === "docentes" && (
              <div className="pl-4">
                <button
                  onClick={() => selectComponent("estudiantes")}
                  className={`w-full text-center font-bold p-2 mb-2 rounded-lg border-2 border-black hover:border-gray-500 wonder ${activeComponent === "estudiantes" ? getComponentColor() : ""}`}
                >
                  Estudiantes
                </button>
              </div>
            )}
          </li>

          <li>
            <button
              onClick={() => selectRole("padres")}
              className={`w-full text-center font-bold p-2 mb-2 rounded-lg border-2 border-black hover:border-gray-500 wonder ${getRoleColor("padres")}`}
            >
              Padres
            </button>
            {activeRole === "padres" && (
              <div className="pl-4">
                <button
                  onClick={() => selectComponent("seguimiento")}
                  className={`w-full text-center font-bold p-2 mb-2 rounded-lg border-2 border-black hover:border-gray-500 wonder ${activeComponent === "seguimiento" ? getComponentColor() : ""}`}
                >
                  Seguimiento de Estudiantes
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Área de contenido principal (Derecha) */}
      <div className="flex-1 p-8 bg-white">
        {/* Mostrar bienvenida según el rol activo */}
        {activeRole === null ? (
          <div className="text-center mt-4">
            <h3 className="text-2xl font-bold text-black">¡Bienvenido al Manual de Usuario!</h3>
            <p className="mt-4 text-lg text-black">Por favor selecciona un rol para comenzar.</p>
            <img src="/img/help/faq/manual/bienvenida.webp" alt="Imagen de bienvenida" className="mx-auto mb-6" />
          </div>
        ) : (
          getRoleDescription()
        )}

        {/* Contenido detallado según el componente seleccionado */}
        <div className="space-y-4">
          {activeRole === "estudiantes" && activeComponent === "navegacion" && <EstudiantesNavegacion />}
          {activeRole === "estudiantes" && activeComponent === "progreso" && <EstudiantesProgreso />}
          {activeRole === "estudiantes" && activeComponent === "receso" && <EstudiantesReceso />}
          {activeRole === "docentes" && activeComponent === "estudiantes" && <DocentesEstudiantes />}
          {activeRole === "auth" && activeComponent === "login" && <Login />}
          {activeRole === "auth" && activeComponent === "register" && <Register />}
        </div>
      </div>
    </div>
  );
};

export default UserManualPage;

