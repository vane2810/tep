"use client";
// Componente para solicitar la recuperación de contraseña
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiMail, FiKey } from "react-icons/fi";
import Volver from "@/components/elements/botonVolver";
import Image from "next/image";

const inputClasses = "border-2 border-yellow-300 bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none px-3 py-2 rounded-full w-full text-base sm:text-lg pl-10 mt-2";
const labelClasses = "mb-2 sm:mb-4 font-bold text-lg sm:text-xl";

export default function RecoveryForm({ email, handleChange, handleSubmit }) {
  const [focusedField, setFocusedField] = useState(null);
  const [step, setStep] = useState(1);
  const [token, setToken] = useState("");

  const getStarlyImage = () => {
    if (focusedField === "email") return "/img/personajes/starly/starly_correo.webp";
    if (focusedField === "token") return "/img/personajes/starly/starly_token.webp";
    return "/img/personajes/starly/starly2.webp";
  };

  const handleTokenChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setToken(value);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleTokenSubmit = (e) => {
    e.preventDefault();
    if (token.length !== 6) {
      alert("El token debe ser un número de 6 dígitos.");
      return;
    }
    alert(`Token enviado: ${token}`);
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-[80vh] yagora bg-[url(/img/auth/fondo_auth.webp)] bg-cover bg-center">
      <div className="relative flex lg:flex-row flex-col bg-white shadow-lg rounded-3xl w-full max-w-4xl overflow-hidden min-h-[65vh]">
        {/* Panel Izquierdo */}
        <div className="lg:w-3/5 flex flex-col justify-start items-start p-8 sm:p-10 lg:p-12">
          {/* Botón Volver y Título */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative" style={{ left: "-40px" }}>
              <Volver href="/auth/login" img="/img/home/regresar/amarillo.webp" title="Volver al Inicio" />
            </div>
            <h1 className="font-bold text-xl text-yellow-600 sm:text-2xl lg:text-3xl" style={{ marginLeft: "-40px" }}>
              {step === 1 ? "Recuperar Contraseña" : "Ingresa el Token"}
            </h1>
          </div>

          {/* Imagen Estática con Clase Dinámica */}
          <div className="mb-8 flex justify-center w-full">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36">
              <Image
                src={getStarlyImage()}
                alt="Starly"
                layout="fill"
                objectFit="contain"
                priority={true} // Asegura carga inmediata
              />
            </div>
          </div>

          {/* Formulario */}
          {step === 1 ? (
            <form onSubmit={handleEmailSubmit} className="w-full" aria-labelledby="recovery-form">
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
          ) : (
            <form onSubmit={handleTokenSubmit} className="w-full" aria-labelledby="token-form">
              {/* Campo de token */}
              <div className="relative mb-8 sm:mb-10">
                <label htmlFor="token" className={labelClasses}>
                  Código de Recuperación
                </label>
                <FiKey
                  className="top-12 left-3 absolute text-yellow-400"
                  size={20}
                  aria-hidden="true"
                />
                <input
                  type="text"
                  id="token"
                  name="token"
                  value={token}
                  onChange={handleTokenChange}
                  onFocus={() => setFocusedField("token")}
                  onBlur={() => setFocusedField(null)}
                  maxLength={6}
                  pattern="\d{6}"
                  required
                  aria-required="true"
                  placeholder="Ingresa el código"
                  className={inputClasses}
                />
              </div>

              {/* Botón para enviar */}
              <button
                type="submit"
                className="flex justify-center items-center bg-yellow-300 hover:bg-yellow-400 px-6 py-3 rounded-full w-full font-bold text-lg text-white sm:text-xl transition duration-300 ease-in-out focus:ring-4 focus:ring-yellow-500"
              >
                Verificar Código
              </button>
            </form>
          )}
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
