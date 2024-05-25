//Registro

"use client";

import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Enviar los datos al servidor
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      console.log(response.data); // Maneja la respuesta del backend 
      alert('¡Cuenta creada con éxito!');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Mensaje en caso del que correo ya exista
        setError([{ msg: 'Este correo electrónico ya está registrado.' }]);
      } else {
        // Si hay un error diferente, mostrar el mensaje de error del servidor
        setError(error.response.data.errors);
      }
    }
  };
  
 // Formulario
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
       

        <button type="submit">Register</button>
        {error && <div>{error.map(err => <p key={err.msg}>{err.msg}</p>)}</div>}
      </form>
    </div>
  );
};

export default Register;
