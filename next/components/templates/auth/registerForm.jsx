// Componente de formulario para el registro - Manejo de frontend
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from 'react-icons/fi';
import Volver from '@/components/elements/botonVolver';
import ErrorMessage from '@/components/menssages/mensajesError'; 

const inputClasses = "border-2 border-yellow-300 bg-white px-3 py-2 rounded-full w-full text-base sm:text-lg pl-10";
const labelClasses = "mb-1 sm:mb-2 font-bold text-lg sm:text-xl";

export default function RegisterForm({ formData, handleChange, handleSubmit, errors }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Determina qué imagen mostrar según el campo actualmente enfocado
  const getStarlyImage = () => {
    if (focusedField === "password" || focusedField === "confirmPassword") return '/img/personajes/starly/starly_contra.png';
    if (focusedField === "email" || focusedField === "name") return '/img/personajes/starly/starly_correo.png';
    return '/img/personajes/starly/starly2.png';
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen yagora">
      <div className="relative flex lg:flex-row flex-col bg-white shadow-lg rounded-3xl w-full max-w-4xl overflow-hidden">
        {/* Imagen decorativa - alineada a la izquierda */}
        <div className="lg:flex justify-center items-center hidden bg-transparent p-8 lg:w-1/2">
          <img src="/img/auth/register.webp" alt="Imagen de registro" className="max-w-sm h-auto object-contain" />
        </div>

        {/* Contenedor principal del formulario - alineado a la derecha */}
        <div className="flex flex-col justify-center items-center p-8 sm:p-10 lg:p-12 w-full lg:w-1/2">
          {/* Botón Volver */}
          <div className="top-4 left-4 absolute">
            <Volver href="/" img="/img/home/regresar/amarillo.webp" title="Volver al Inicio" />
          </div>

          <h1 className="mb-4 font-bold text-2xl text-yellow-600 sm:text-3xl lg:text-4xl">Registro</h1>

          {/* Imagen dinámica de Starly */}
          <img
            src={getStarlyImage()}
            alt="Starly"
            className="mb-6 w-36 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-30"
          />

          <form onSubmit={handleSubmit} className="w-full">
            {/* Campo de nombre */}
            <div className="relative mb-4 sm:mb-6">
              <label htmlFor="name" className={labelClasses}>Nombre</label>
              <FiUser className="top-10 left-3 absolute text-yellow-400" size={20} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                required
                className={inputClasses}
              />
              <ErrorMessage message={errors.name} /> {/* Mostrar mensaje de error */}
            </div>

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
              <ErrorMessage message={errors.email} /> {/* Mostrar mensaje de error */}
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
              {formData.password && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="top-10 right-4 absolute text-yellow-400"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              )}
              <ErrorMessage message={errors.password} /> {/* Mostrar mensaje de error */}
            </div>

            {/* Campo de confirmar contraseña con botón para mostrar/ocultar */}
            <div className="relative mb-4 sm:mb-6">
              <label htmlFor="confirmPassword" className={labelClasses}>Confirmar contraseña</label>
              <FiLock className="top-10 left-3 absolute text-yellow-400" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField(null)}
                required
                className={inputClasses}
              />
              {formData.confirmPassword && (
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="top-10 right-4 absolute text-yellow-400"
                >
                  {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              )}
              <ErrorMessage message={errors.confirmPassword} /> {/* Mostrar mensaje de error */}
            </div>

            <button
              type="submit"
              className="flex justify-center items-center bg-yellow-300 hover:bg-yellow-400 px-6 py-3 rounded-full w-full font-bold text-lg text-white sm:text-xl transition duration-300 ease-in-out"
            >
              Registrarme
            </button>
          </form>

          <hr className="border-1 my-6 sm:my-8 border-t border-black w-full" />

          <div className="text-base text-gray-600 sm:text-lg">
            <p>¿Ya tienes una cuenta? <Link href="/auth/login" className="font-medium text-yellow-400 hover:text-yellow-500">Inicia sesión</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Definición de tipos para validación
RegisterForm.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
  }),
};
