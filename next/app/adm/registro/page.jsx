"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import '@/styles/adm/registro.css';

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
  const [isError, setIsError] = useState(false);

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
    <div className="container">
      <div className="left-container">
        <img src="/img/page/registro.png" alt="Imagen de registro" className="image" />
      </div>
      <div className="right-container">
        <h1 className="title">Registro</h1>
        <img src="/img/page/starly.png" alt="Logo" className="img-base" />
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label className="label">Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input"
            />
            {nameError && <p className="error">{nameError}</p>}
          </div>
          <div>
            <label className="label">Correo electrónico:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input"
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>
          <div>
            <label className="label">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input"
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>
          <div>
            <label className="label">Confirmar contraseña:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="input"
            />
            {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
          </div>
          <button type="submit" className="btn-register">Registrarme</button>
        </form>
        <hr className="separator" />
        <div className="login-link">
          <p>¿Ya tienes una cuenta? <Link href="/adm/login">Inicia sesión</Link></p>
        </div>
      </div>
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
