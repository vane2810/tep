// Componente de formulario para el registro - Manejo de frontend
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const inputClasses = "border-2 border-yellow-300 focus:bg-gray-100 px-4 rounded-md w-full h-12 text-lg";
const labelClasses = "mb-2 font-bold text-xl story";

export default function RegisterForm({ formData, handleChange, handleSubmit, errors }) {
  return (
    <div className="flex flex-col justify-center items-center shadow-none p-20 w-full lg:w-1/2">
      <h1 className="mb-4 font-bold text-3xl story">Registro</h1>
      <img src="/img/personajes/starly/starly.png" alt="Logo" className="mb-10 w-32 h-32 animate-float" />

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-6">
          <label htmlFor="name" className={labelClasses}>Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClasses}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="email" className={labelClasses}>Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClasses}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className={labelClasses}>Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={inputClasses}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className={labelClasses}>Confirmar contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={inputClasses}
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
        </div>

        <button type="submit" className="flex justify-center items-center bg-yellow-300 hover:bg-yellow-500 px-10 rounded-md w-full h-12 font-bold text-xl transition duration-300 ease-in-out story">
          Registrarme
        </button>
      </form>

      <hr className="border-0 my-8 border-t border-black w-full" />
      <div className="text-lg story">
        <p>¿Ya tienes una cuenta? <Link href="/auth/login" className="text-blue-500 hover:text-blue-700">Inicia sesión</Link></p>
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
