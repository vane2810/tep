// pages/login.jsx

"use client";

import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });
      console.log(response.data); // Maneja la respuesta del backend según sea necesario
      alert('¡Inicio de sesión exitoso!');
      // Redirigir al usuario a la página de inicio
      window.location.href = '/';
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  
  
  return (
    <div>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
