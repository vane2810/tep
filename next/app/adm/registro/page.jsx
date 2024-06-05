"use client";
import React, { useState } from 'react';
import RegistroModal from '@/components/modals/registroModal';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false); // Nuevo estado para indicar si hay un error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

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

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(name)) {
      setNameError('El nombre solo puede contener letras.');
    } else {
      setNameError('');
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError('Formato de correo inválido.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== formData.password) {
      setConfirmPasswordError('Las contraseñas no coinciden.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameError || emailError || passwordError || confirmPasswordError) {
      // Si hay algún error de validación, no se envía el formulario
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
        setShowModal(true);
      } else {
        // Si hay un error en la respuesta del servidor, se muestra en el modal
        setModalMessage(data.error || 'Error al registrar el usuario');
        setShowModal(true);
        setIsError(true); // Indicar que hay un error
      }
    } catch (error) {
      // Si hay un error al conectar con el servidor, se muestra en el modal
      setModalMessage('Error al conectar con el servidor');
      setShowModal(true);
      setIsError(true); // Indicar que hay un error
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>
        <div>
          <label>Confirmar Contraseña</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>}
        </div>
        <button type="submit">Registrar</button>
      </form>
      {showModal && (
        <RegistroModal onClose={() => setShowModal(false)} message={modalMessage} isError={isError}>
          <button onClick={() => setShowModal(false)}>Cerrar</button>
        </RegistroModal>
      )}
    </div>
  );
}
