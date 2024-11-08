// Componente de formulario para el login - Manejo de frontend
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi';
import Volver from '@/components/elements/botonVolver';

// Clases reutilizables
const inputClasses = "border-2 border-yellow-300 bg-white focus:bg-white px-3 py-2 rounded-full w-full text-base sm:text-lg pl-10";
const labelClasses = "mb-1 sm:mb-2 font-bold text-lg sm:text-xl";

export default function LoginForm({ formData, handleChange, handleSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null); 

  // Determina qué imagen mostrar según el campo actualmente enfocado
  const getStarlyImage = () => {
    if (focusedField === "password") return '/img/personajes/starly/starly_contra.png';
    if (focusedField === "email") return '/img/personajes/starly/starly_correo.png';
    return '/img/personajes/starly/starly2.png'; 
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen yagora">
      {/* Contenedor interno con el formulario a la izquierda y la imagen a la derecha */}
      <div className="relative flex lg:flex-row flex-col bg-white shadow-lg rounded-3xl w-full max-w-4xl overflow-hidden">
        {/* Botón Volver */}
        <div className="top-4 z-20 absolute">
          <Volver href="/" img="/img/home/regresar/amarillo.png" title='Volver al Inicio' />
        </div>
        {/* Contenedor principal del formulario - alineado a la izquierda */}
        <div className="flex flex-col justify-center items-center p-8 sm:p-10 lg:p-12 w-full lg:w-1/2">
          <h1 className="mb-4 ml-8 font-bold text-2xl text-yellow-600 sm:text-3xl lg:text-4xl">Inicio de sesión</h1>

          {/* Imagen dinámica de Starly */}
          <img
            src={getStarlyImage()}
            alt="Starly"
            className="mb-6 w-36 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-30"
          />

          {/* Formulario de inicio de sesión */}
          <form onSubmit={handleSubmit} className="w-full">
            {/* Campo de correo electrónico */}
            <div className="relative mb-4 sm:mb-6">
              <label htmlFor="email" className={labelClasses}>Correo electrónico</label>
              <FiMail className="top-10 left-3 absolute text-yellow-400" size={20} /> 
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}   
                onBlur={() => setFocusedField(null)}          
                required
                className={inputClasses}
              />
            </div>

            {/* Campo de contraseña con botón para mostrar/ocultar */} 
            <div className="relative mb-4 sm:mb-6">
              <label htmlFor="password" className={labelClasses}>Contraseña</label>
              <FiLock className="top-10 left-3 absolute text-yellow-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                required
                className={inputClasses}
              />
              {/* Solo muestra el botón de visibilidad si hay texto en el campo de contraseña */}
              {formData.password && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="top-10 right-4 absolute text-yellow-400"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              )}
            </div>

            {/* Botón para enviar el formulario */}
            <button
              type="submit"
              className="flex justify-center items-center bg-yellow-300 hover:bg-yellow-400 px-6 py-3 rounded-full w-full font-bold text-lg text-white sm:text-xl transition duration-300 ease-in-out"
            >
              Iniciar sesión
            </button>
          </form>

          {/* Separador visual */}
          <hr className="border-1 my-6 sm:my-8 border-t border-black w-full" />

          {/* Enlace para registrarse */}
          <div className="text-base text-black sm:text-lg">
            <p>¿No tienes una cuenta? <Link href="/auth/register" className="font-medium text-yellow-400 hover:text-yellow-500">Regístrate</Link></p>
          </div>
        </div>

        {/* Imagen decorativa - alineada a la derecha */}
        <div className="lg:flex justify-center items-center hidden bg-transparent p-8 lg:w-1/2">
          <img src="/img/auth/login.png" alt="Imagen de fondo" className="max-w-sm h-auto object-contain" />
        </div>
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
