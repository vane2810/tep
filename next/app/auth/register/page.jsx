// Página de registro - Manejo de backend
"use client";
import React, { useState } from 'react';
import '@/styles/globals.css';
import '@/styles/animacion.css';
import RegistroModal from '@/components/modals/auth/registroModal';
import RolModal from '@/components/modals/auth/rolesModal';
import NivelModal from '@/components/modals/auth/nivelModal';
import PersonajeModal from '@/components/modals/auth/personajeModal';
import RegisterForm from '@/components/templates/auth/registerForm';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [showRolModal, setShowRolModal] = useState(false);
  const [showNivelModal, setShowNivelModal] = useState(false);
  const [showPersonajeModal, setShowPersonajeModal] = useState(false);

  const validator = require('validator');

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validación de los campos
    validateField(name, value);
  };

  // Validaciones de campo individual
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        error = /^[a-zA-Z\s]+$/.test(value) ? '' : 'El nombre solo puede contener letras.';
        break;
      case 'email':
        error = !validator.isEmail(value) || value.length > 254 ? 'Formato de correo inválido.' : '';
        break;
      case 'password':
        error = value.length < 8 ? 'La contraseña debe tener al menos 8 caracteres.' : '';
        break;
      case 'confirmPassword':
        error = value !== formData.password ? 'Las contraseñas no coinciden.' : '';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).some((err) => err)) return;

    try {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setUserId(data.userId);
        setModalMessage('Usuario registrado correctamente');
        setIsError(false);
        setShowModal(false);
        setShowRolModal(true);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role }),
      });

      if (res.ok) {
        if (role === 'estudiante') {
          setShowRolModal(false);
          setShowNivelModal(true);
        } else {
          const defaultCharacterId = role === 'docente' ? 14 : 15;
          handleCharacterSelected(defaultCharacterId);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, levelId }),
      });

      if (res.ok) {
        setShowNivelModal(false);
        setShowPersonajeModal(true);
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
        headers: { 'Content-Type': 'application/json' },
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
    <main
      style={{
        backgroundImage: 'url(/img/fondos/fondo_login.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <RegisterForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
      />
      {showModal && <RegistroModal show={showModal} message={modalMessage} isError={isError} onClose={() => setShowModal(false)} />}
      <RolModal show={showRolModal} onClose={() => setShowRolModal(false)} onRoleSelected={handleRoleSelected} />
      <NivelModal show={showNivelModal} onClose={() => setShowNivelModal(false)} onLevelSelected={handleLevelSelected} />
      <PersonajeModal show={showPersonajeModal} onClose={() => setShowPersonajeModal(false)} onCharacterSelected={handleCharacterSelected} />
    </main>
  );
}
