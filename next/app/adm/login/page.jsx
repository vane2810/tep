"use client";

import { useState } from 'react';
import axios from 'axios';

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  height: '100vh', // Para que ocupe toda la altura de la ventana
};

const loginContainerStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '30px',
  backgroundColor: '#FADBD8', // Color de fondo de la mitad izquierda
  border: 'none', // Eliminamos el borde para evitar la línea divisoria
  boxShadow: 'none', // Eliminamos la sombra para evitar bordes visibles
};

const imgBaseStyle = {
  width: '130px',
  height: '120px',
  marginBottom: '50px',
  animation: 'tumble 3s infinite', // Aplicamos la animación de balanceo
};

const titleStyle = {
  fontSize: '28px',
  color: '#333',
  marginBottom: '20px',
  fontFamily: "'Comic Sans MS', cursive, sans-serif",
  textAlign: 'center',
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
  width: '80%', // Hacemos el botón más pequeño
  height: '40px', // Hacemos el botón más pequeño
  padding: '10px',
  fontSize: '16px', // Reducimos el tamaño de la fuente
  color: '#fff',
  backgroundColor: '#F4D03F',
  border: 'none',
  borderRadius: '25px',
  cursor: 'pointer',
  fontFamily: "'Comic Sans MS', cursive, sans-serif",
  transition: 'background-color 0.3s, transform 0.3s',
  margin: '10px 0', // Añadimos margen para separación
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
  textAlign: 'center',
};

const rightContainerStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: '40px',
  backgroundColor: '#FADBD8', // Color de fondo de la mitad derecha igual al de la izquierda
};

const imageStyle = {
  width: '100%',
  height: 'auto',
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
  @keyframes tumble {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(10deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(-10deg); }
    100% { transform: rotate(0deg); }
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
    <div style={containerStyle}>
      <style>{styles}</style>
      <div style={loginContainerStyle}>
        <img
          src="/img/page/starly.png"
          alt="Logo"
          style={{
            ...imgBaseStyle,
            animation: 'flyIn 1s ease-out, tumble 3s infinite', // Aplicamos ambas animaciones
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
      <div style={rightContainerStyle}>
        <img
          src="/img/page/login.jpg" // Ruta de la imagen final
          alt="Imagen final"
          style={imageStyle}
        />
      </div>
    </div>
  );
};

export default Login;
