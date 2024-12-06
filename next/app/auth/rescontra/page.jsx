"use client";
// Componente para solicitar la recuperación de contraseña
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiMail } from "react-icons/fi";
import Volver from "@/components/elements/botonVolver";
import Image from "next/image";

const inputClasses = "border-2 border-yellow-300 bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none px-3 py-2 rounded-full w-full text-base sm:text-lg pl-10 mt-2";
const labelClasses = "mb-2 sm:mb-4 font-bold text-lg sm:text-xl";

export default function RecoveryForm({ email, handleChange, handleSubmit }) {
  const [focusedField, setFocusedField] = useState(null);

  const getStarlyImage = () => {
    if (focusedField === "email") return "/img/personajes/starly/starly_correo.webp";
    return "/img/personajes/starly/starly2.webp";
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-[80vh] yagora bg-[url(/img/auth/fondo_auth.webp)] bg-cover bg-center">
      <div className="relative flex lg:flex-row flex-col bg-white shadow-lg rounded-3xl w-full max-w-4xl overflow-hidden min-h-[65vh]">
        {/* Panel Izquierdo */}
        <div className="lg:w-3/5 flex flex-col justify-start items-start p-8 sm:p-10 lg:p-12">
          {/* Botón Volver y Título */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative" style={{ left: "-40px" }}>
              <Volver href="/" img="/img/home/regresar/amarillo.webp" title="Volver al Inicio" />
            </div>
            <h1 className="font-bold text-xl text-yellow-600 sm:text-2xl lg:text-3xl" style={{ marginLeft: "-40px" }}>
              Recuperar Contraseña
            </h1>
          </div>

          {/* Imagen dinámica */}
          <div className="mb-8 flex justify-center w-full">
            <Image
              src={getStarlyImage()}
              alt="Starly"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="w-full"
            aria-labelledby="recovery-form"
          >
            {/* Campo de correo electrónico */}
            <div className="relative mb-8 sm:mb-10">
              <label htmlFor="email" className={labelClasses}>
                Correo electrónico
              </label>
              <FiMail
                className="top-12 left-3 absolute text-yellow-400"
                size={20}
                aria-hidden="true"
              />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
                aria-required="true"
                placeholder="Ingresa tu correo"
                className={inputClasses}
              />
            </div>

            {/* Botón para enviar */}
            <button
              type="submit"
              className="flex justify-center items-center bg-yellow-300 hover:bg-yellow-400 px-6 py-3 rounded-full w-full font-bold text-lg text-white sm:text-xl transition duration-300 ease-in-out focus:ring-4 focus:ring-yellow-500"
            >
              Enviar correo de recuperación
            </button>
          </form>
        </div>

        {/* Panel Derecho Ajustado */}
        <div className="lg:w-2/5 hidden lg:flex justify-center items-center bg-transparent p-4 lg:p-8">
          <Image
            src="/img/auth/register.webp"
            alt="Imagen decorativa"
            width={250}
            height={250}
            className="max-w-xs h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}

RecoveryForm.propTypes = {
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
