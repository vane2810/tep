// REGISTRO
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import '@/styles/globals.css';
import '@/styles/animacion.css';
import RegistroModal from '@/components/modals/auth/registroModal';
import RolModal from '@/components/modals/auth/rolesModal';
import NivelModal from '@/components/modals/auth/nivelModal';
import PersonajeModal from '@/components/modals/auth/personajeModal';
import Volver from '@/components/botonVolver';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [userId, setUserId] = useState(null);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const [showRolModal, setShowRolModal] = useState(false);
  const [showNivelModal, setShowNivelModal] = useState(false);
  const [showPersonajeModal, setShowPersonajeModal] = useState(false);

  const validator = require('validator');
  // Manejo del cambio en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });


    // Validación de los campos
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

  // Validaciones
  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    setNameError(!regex.test(name) ? 'El nombre solo puede contener letras.' : '');
  };


  // CAMBIOS REALIZADOS EN LA VALIDACIÓN DEL CORREO
  const validateEmail = (email) => {
    const MAX_LENGTH = 254;
    if (email.length > MAX_LENGTH) {
      setEmailError('El correo es demasiado largo.');
      return;
    }

    setEmailError(!validator.isEmail(email) ? 'Formato de correo inválido.' : '');
  };

  const validatePassword = (password) => {
    setPasswordError(password.length < 8 ? 'La contraseña debe tener al menos 8 caracteres.' : '');
  };

  const validateConfirmPassword = (confirmPassword) => {
    setConfirmPasswordError(confirmPassword !== formData.password ? 'Las contraseñas no coinciden.' : '');
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

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
        setUserId(data.userId);
        setModalMessage('Usuario registrado correctamente');
        setIsError(false);
        setShowModal(false);  // Cierra cualquier modal previo
        setShowRolModal(true);  // Abre el modal de selección de rol
      } else {
        setModalMessage(data.error || 'Error al registrar el usuario');
        setIsError(true);
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage('Error al conectar con el servidor');
      setIsError(true);
      setShowModal(true);
    }
  };

// Manejo de la selección de rol
const handleRoleSelected = async (role) => {
  try {
    const res = await fetch('http://localhost:3001/api/auth/role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, role }),
    });

    if (res.ok) {
      if (role === 'estudiante') {
        setShowRolModal(false);
        setShowNivelModal(true); // Mostrar modal de selección de nivel para los estudiantes
      } else if (role === 'docente' || role === 'padre') {
        // Asignar personaje automáticamente si el rol es docente o padre
        const defaultCharacterId = role === 'docente' ? 14 : 15;
        handleCharacterSelected(defaultCharacterId);
      } else {
        // Si no es estudiante, docente o padre, mostrar mensaje de registro completado
        setModalMessage('Registro completado');
        setIsError(false);
        setShowModal(true);
      }
    } else {
      setModalMessage('Error al asignar el rol');
      setIsError(true);
      setShowModal(true);
    }
  } catch (error) {
    setModalMessage('Error al conectar con el servidor');
    setIsError(true);
    setShowModal(true);
  }
};


  // Manejo de la selección de nivel
  const handleLevelSelected = async (levelId) => {
    try {
      const res = await fetch('http://localhost:3001/api/auth/level', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, levelId }),
      });

      if (res.ok) {
        setShowNivelModal(false);
        setShowPersonajeModal(true);  // Abre el modal de selección de personaje
      } else {
        setModalMessage('Error al asignar el nivel');
        setIsError(true);
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage('Error al conectar con el servidor');
      setIsError(true);
      setShowModal(true);
    }
  };

  // Manejo de la selección de personaje
  const handleCharacterSelected = async (characterId) => {
    try {
      const res = await fetch('http://localhost:3001/api/auth/character', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, characterId }),
      });

      if (res.ok) {
        setShowPersonajeModal(false);
        setModalMessage('Registro completado');
        setIsError(false);
        setShowModal(true);
      } else {
        setModalMessage('Error al asignar el personaje');
        setIsError(true);
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage('Error al conectar con el servidor');
      setIsError(true);
      setShowModal(true);
    }
  };

  return (
    <div className="flex bg-pink-100">
      <Volver href="/" />
      <div className="lg:flex justify-center items-center hidden lg:w-1/2">
        <img src="/img/auth/registro.png" alt="Imagen de registro" className="max-w-full h-auto object-contain" />
      </div>

      <div className="flex flex-col justify-center items-center shadow-none p-20 w-full lg:w-1/2">
        <h1 className="mb-4 font-bold text-3xl story">Registro</h1>
        <img src="/img/personajes/starly/starly.png" alt="Logo" className="mb-10 w-32 h-32 animate-float" />
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-6">
            <label className="mb-2 font-bold text-xl story">Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-2 border-yellow-300 focus:bg-gray-100 px-4 rounded-md w-full h-12 text-lg"
            />
            {nameError && <p className="text-red-500">{nameError}</p>}
          </div>
          <div className="mb-6">
            <label className="mb-2 font-bold text-xl story">Correo electrónico:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-2 border-yellow-300 focus:bg-gray-100 px-4 rounded-md w-full h-12 text-lg"
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="mb-6">
            <label className="mb-2 font-bold text-xl story">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border-2 border-yellow-300 focus:bg-gray-100 px-4 rounded-md w-full h-12 text-lg"
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <div className="mb-6">
            <label className="mb-2 font-bold text-xl story">Confirmar contraseña:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="border-2 border-yellow-300 focus:bg-gray-100 px-4 rounded-md w-full h-12 text-lg"
            />
            {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
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

      {/* Modal para mostrar mensajes */}
      {showModal && (
        <RegistroModal
          show={showModal}
          message={modalMessage}
          isError={isError}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Modal para seleccionar rol */}
      <RolModal
        show={showRolModal}
        onClose={() => setShowRolModal(false)}
        onRoleSelected={handleRoleSelected}
      />

      {/* Modal para seleccionar nivel */}
      <NivelModal
        show={showNivelModal}
        onClose={() => setShowNivelModal(false)}
        onLevelSelected={handleLevelSelected}
      />

      {/* Modal para seleccionar personaje */}
      <PersonajeModal
        show={showPersonajeModal}
        onClose={() => setShowPersonajeModal(false)}
        onCharacterSelected={handleCharacterSelected}
      />
    </div>
  );
}
