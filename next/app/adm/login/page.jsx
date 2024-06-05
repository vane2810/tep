// Login
"use client";
import React, { useState } from 'react';
import '@/styles/login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Inicio de sesión exitoso');
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1 className="title">Inicio de sesión</h1>
        <img
          src="/img/page/starly.png"
          alt="Logo"
          className="img-base"
        />
        <form onSubmit={handleSubmit}>
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
          </div>
          <button type="submit" className="btn-login">Iniciar sesión</button>
        </form>
        <hr className="separator" />
        <div className="signup-link">
          <p>¿No tienes una cuenta? <a href="/adm/registro">Regístrate</a></p>
        </div>
      </div>
      <div className="right-container">
        <img src="/img/page/login.jpg" alt="Imagen final" className="image"/>
      </div>
    </div>
  );
}
