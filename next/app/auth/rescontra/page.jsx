"use client";
// Componente para solicitar la recuperación de contraseña
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiMail, FiKey, FiLock } from "react-icons/fi";
import Volver from "@/components/elements/botonVolver";
import Image from "next/image";

const inputClasses = "border-2 border-yellow-300 bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none px-3 py-2 rounded-full w-full text-base sm:text-lg pl-10 mt-2";
const labelClasses = "mb-2 sm:mb-4 font-bold text-lg sm:text-xl";

export default function RecoveryForm({ email, handleChange, handleSubmit }) {
  const [focusedField, setFocusedField] = useState(null);
  const [step, setStep] = useState(1);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    setStep(3); // Pasar al formulario de nueva contraseña
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    // Aquí podrías enviar la nueva contraseña al servidor
    alert("Contraseña cambiada con éxito.");
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
              {step === 1
                ? "Recuperar Contraseña"
                : step === 2
                ? "Ingresa el Token"
                : "Nueva Contraseña"}
            </h1>
          </div>

          {/* Imagen Estática */}
          <div className="mb-8 flex justify-center w-full">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36">
              <Image
                src="/img/personajes/starly/starly2.webp"
                alt="Starly"
                layout="fill"
                objectFit="contain"
                priority={true}
                className={`transition-transform duration-300 ${
                  focusedField ? "scale-110" : "opacity-80"
                }`}
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

              <button
                type="submit"
                className="flex justify-center items-center bg-yellow-300 hover:bg-yellow-400 px-6 py-3 rounded-full w-full font-bold text-lg text-white sm:text-xl transition duration-300 ease-in-out focus:ring-4 focus:ring-yellow-500"
              >
                Enviar correo de recuperación
              </button>
            </form>
          ) : step === 2 ? (
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

              <button
                type="submit"
                className="flex justify-center items-center bg-yellow-300 hover:bg-yellow-400 px-6 py-3 rounded-full w-full font-bold text-lg text-white sm:text-xl transition duration-300 ease-in-out focus:ring-4 focus:ring-yellow-500"
              >
                Verificar Código
              </button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="w-full" aria-labelledby="password-form">
              {/* Campo de nueva contraseña */}
              <div className="relative mb-8 sm:mb-10">
                <label htmlFor="password" className={labelClasses}>
                  Nueva Contraseña
                </label>
                <FiLock
                  className="top-12 left-3 absolute text-yellow-400"
                  size={20}
                  aria-hidden="true"
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  required
                  aria-required="true"
                  placeholder="Ingresa tu nueva contraseña"
                  className={inputClasses}
                />
              </div>

              {/* Campo de confirmar contraseña */}
              <div className="relative mb-8 sm:mb-10">
                <label htmlFor="confirmPassword" className={labelClasses}>
                  Confirmar Contraseña
                </label>
                <FiLock
                  className="top-12 left-3 absolute text-yellow-400"
                  size={20}
                  aria-hidden="true"
                />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField(null)}
                  required
                  aria-required="true"
                  placeholder="Confirma tu nueva contraseña"
                  className={inputClasses}
                />
              </div>

              <button
                type="submit"
                className="flex justify-center items-center bg-yellow-300 hover:bg-yellow-400 px-6 py-3 rounded-full w-full font-bold text-lg text-white sm:text-xl transition duration-300 ease-in-out focus:ring-4 focus:ring-yellow-500"
              >
                Cambiar Contraseña
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
