// REGISTRO

"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import '@/styles/globals.css';
import '@/styles/animacion.css';
import RegistroModal from '@/components/modals/adm/registroModal';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Para los mensajes de error en la validación del formulario
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Estado para mostrar/ocultar el modal
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Maneja los cambios en los campos del formulario y realiza la validación
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Valida los campos según el nombre
    switch (name) {
      case 'name':
        validateName(value);
        break;
      case 'email':
        validateEmail(value);
        break;
      case 'password':
        validatePassword(value);
        break;
      case 'confirmPassword':
        validateConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  // Validación del nombre
  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(name)) {
      setNameError('El nombre solo puede contener letras.');
    } else {
      setNameError('');
    }
  };

  // Validación del correo electrónico
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError('Formato de correo inválido.');
    } else {
      setEmailError('');
    }
  };

  // Validación de la contraseña
  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
    } else {
      setPasswordError('');
    }
  };

  // Validación de la confirmación de contraseña
  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== formData.password) {
      setConfirmPasswordError('Las contraseñas no coinciden.');
    } else {
      setConfirmPasswordError('');
    }
  };

  // Maneja el envío del formulario y realiza la solicitud de registro
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Evita el envío si hay errores de validación
    if (nameError || emailError || passwordError || confirmPasswordError) {
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setModalMessage('Usuario registrado correctamente');
        setIsError(false);
      } else {
        setModalMessage(data.error || 'Error al registrar el usuario');
        setIsError(true);
      }
      setShowModal(true);
    } catch (error) {
      setModalMessage('Error al conectar con el servidor');
      setIsError(true);
      setShowModal(true);
    }
  };

  return (
    <div className="flex bg-pink-100">
      {/* Volver */}
      <div className="mt-6 ml-10 inline-block">
        <Link href="/">
          <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
        </Link>
      </div>
      <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
        <img src="/img/auth/registro.png" alt="Imagen de registro" className="max-w-full h-auto object-contain" />
      </div>

      {/* Formulario de registro */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-20 shadow-none">
        <h1 className="text-3xl font-bold mb-4 story">Registro</h1>
        <img src="/img/personajes/starly/starly.png" alt="Logo" className="h-32 w-32 mb-10 animate-float" />
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-6">
            <label className="text-xl font-bold mb-2 story">Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 text-lg border-2 border-yellow-300 rounded-md focus:bg-gray-100"
            />
            {nameError && <p className="text-red-500">{nameError}</p>}
          </div>
          <div className="mb-6">
            <label className="text-xl font-bold mb-2 story">Correo electrónico:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 text-lg border-2 border-yellow-300 rounded-md focus:bg-gray-100"
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="mb-6">
            <label className="text-xl font-bold mb-2 story">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 text-lg border-2 border-yellow-300 rounded-md focus:bg-gray-100"
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <div className="mb-6">
            <label className="text-xl font-bold mb-2 story">Confirmar contraseña:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 text-lg border-2 border-yellow-300 rounded-md focus:bg-gray-100"
            />
            {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
          </div>
          <button type="submit" className="w-full h-12 px-10 text-xl bg-yellow-300 rounded-md font-bold 
            transition duration-300 ease-in-out hover:bg-yellow-500 flex justify-center items-center story">
            Registrarme
          </button>
        </form>
        <hr className="w-full border-0 border-t border-black my-8" />
        <div className="text-lg story">
          <p>¿Ya tienes una cuenta? <Link href="/adm/login" className="text-blue-500 hover:text-blue-700">Inicia sesión</Link></p>
        </div>
      </div>

      {/* Modal para mostrar mensajes de registro */}
      {showModal && (
        <RegistroModal
          show={showModal}
          message={modalMessage}
          isError={isError}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
