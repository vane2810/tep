"use client";

import { useState } from 'react';
import axios from 'axios';

const loginContainerStyle = {
  display: 'flex',
  flexDirection: 'row', // Cambiamos el flexDirection a 'row'
  alignItems: 'center',
  padding: '30px',
  backgroundColor: '#FFCCBC',
  border: '2px solid #ffcc80',
  borderRadius: '15px',
  boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
  animation: 'fadeIn 1s ease-in-out',
};

const imgBaseStyle = {
  width: '130px',
  height: '120px',
  marginBottom: '20px',
};

const titleStyle = {
  fontSize: '28px',
  color: '#333',
  marginBottom: '20px',
  fontFamily: "'Comic Sans MS', cursive, sans-serif",
};

const inputGroupStyle = {
  marginBottom: '20px',
  width: '100%',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontSize: '18px',
  color: '#666',
  fontFamily: "'Comic Sans MS', cursive, sans-serif",
};

const inputStyle = {
  width: '100%',
  height: '40px',
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  transition: 'border-color 0.3s, box-shadow 0.3s',
};

const inputFocusStyle = {
  borderColor: '#ffa726',
  boxShadow: '0 0 10px rgba(255, 167, 38, 0.5)',
};

const btnLoginStyle = {
  width: '100%',
  height: '50px',
  padding: '10px',
  fontSize: '18px',
  color: '#fff',
  backgroundColor: '#F4D03F',
  border: 'none',
  borderRadius: '25px',
  cursor: 'pointer',
  fontFamily: "'Comic Sans MS', cursive, sans-serif",
  transition: 'background-color 0.3s, transform 0.3s',
};

const btnLoginHoverStyle = {
  backgroundColor: '#f4511e',
  transform: 'scale(1.05)',
};

const errorMessageStyle = {
  color: '#d32f2f',
  fontSize: '14px',
  marginTop: '10px',
  fontFamily: "'Comic Sans MS', cursive, sans-serif",
};

const linkStyle = {
  textDecoration: 'none',
  color: '#42a5f5',
};

const linkHoverStyle = {
  color: '#1e88e5',
};

const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes flyIn {
    from {
      transform: translateX(-100px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Solicitud al backend
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });
      console.log(response.data); // Respuesta del backend
      alert('¡Inicio de sesión exitoso!');
      // Redirigir a la página principal
      window.location.href = '/';
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div style={loginContainerStyle}>
      <style>{styles}</style>
      <div style={{ flex: 1 }}>
        <img
          src="/img/page/starly.png"
          alt="Logo"
          style={{
            ...imgBaseStyle,
            animation: 'flyIn 1s ease-out',
          }}
        />
        <h1 style={titleStyle}>Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Correo electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </div>
          <button
            type="submit"
            style={btnLoginStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, btnLoginHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, btnLoginStyle)}
          >
            Iniciar sesión
          </button>
          {error && <div style={errorMessageStyle}>{error}</div>}
        </form>
      </div>
      <div style={{ flex: 1, textAlign: 'right', paddingRight: '40px' }}>
        <img
          src="/img/page/login.jpg" // Ruta de la imagen final
          alt="Imagen final"
          style={{ width: '120%', height: 'auto' }}
        />
      </div>
    </div>
  );
};

export default Login;

