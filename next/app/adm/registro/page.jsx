"use client";
import React, { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
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
        alert('Usuario registrado correctamente');
        
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Error al registrar el usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Contraseña</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <div>
        <label>Confirmar Contraseña</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
}
