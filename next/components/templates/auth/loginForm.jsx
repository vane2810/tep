// Componente de formulario para el login - Manejo de frontend
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FiEye, FiEyeOff } from 'react-icons/fi';

// Clases reutilizables
const containerClasses = "flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-8 sm:p-10 lg:p-12 w-full max-w-md mx-4"; // Contenedor elevado con sombra
const inputClasses = "border-2 border-yellow-300 focus:bg-yellow-50 px-3 py-2 rounded-md w-full text-base sm:text-lg";
const labelClasses = "mb-1 sm:mb-2 font-bold text-lg sm:text-xl story";

export default function LoginForm({ formData, handleChange, handleSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null); // Estado para el campo enfocado

  // Determina qué imagen mostrar según el campo actualmente enfocado
  const getStarlyImage = () => {
    if (focusedField === "password") return '/img/personajes/starly/starly_contra.png';
    if (focusedField === "email") return '/img/personajes/starly/starly_correo.png';
    return '/img/personajes/starly/starly.png'; // Imagen neutral
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex lg:flex-row flex-col justify-center items-center bg-gradient-to-r from-pink-100 to-yellow-100 px-4 py-12 w-full min-h-screen yagora">
      {/* Contenedor principal del formulario */}
      <div className={containerClasses}>
        <h1 className="mb-4 font-bold text-2xl text-yellow-600 sm:text-3xl lg:text-4xl">Inicio de sesión</h1>

        {/* Imagen dinámica de Starly */}
        <img
          src={getStarlyImage()}
          alt="Starly"
          className="mb-6 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24"
        />

        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Campo de correo electrónico */}
          <div className="mb-4 sm:mb-6">
            <label htmlFor="email" className={labelClasses}>Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField("email")}   // Al enfocar, establece el campo activo
              onBlur={() => setFocusedField(null)}       // Al desenfocar, restablece el campo activo
              required
              className={inputClasses}
            />
          </div>

          {/* Campo de contraseña con botón para mostrar/ocultar */}
          <div className="relative mb-4 sm:mb-6">
            <label htmlFor="password" className={labelClasses}>Contraseña:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField("password")} // Al enfocar, establece el campo activo
              onBlur={() => setFocusedField(null)}        // Al desenfocar, restablece el campo activo
              required
              className={inputClasses}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="top-9 right-3 absolute text-yellow-500"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* Botón para enviar el formulario */}
          <button
            type="submit"
            className="flex justify-center items-center bg-yellow-300 hover:bg-yellow-500 px-6 py-3 rounded-md w-full font-bold text-lg text-white sm:text-xl transition duration-300 ease-in-out"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Separador visual */}
        <hr className="border-0 border-gray-300 my-6 sm:my-8 border-t w-full" />

        {/* Enlace para registrarse */}
        <div className="text-base text-gray-600 sm:text-lg">
          <p>¿No tienes una cuenta? <Link href="/auth/register" className="font-medium text-yellow-500 hover:text-yellow-600">Regístrate</Link></p>
        </div>
      </div>

      {/* Imagen decorativa - solo visible en pantallas grandes */}
      <div className="lg:flex lg:items-center hidden lg:pl-12 lg:w-1/2">
        <img src="/img/auth/login.jpg" alt="Imagen de fondo" className="opacity-90 max-w-md h-auto object-contain" />
      </div>
    </div>
  );
}

// Definición de tipo de datos esperados para las props del componente
LoginForm.propTypes = {
  formData: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
