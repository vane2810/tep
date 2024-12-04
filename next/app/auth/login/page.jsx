// Página de login - Manejo de backend
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginModal from '@/components/modals/auth/loginModal';
import LoginForm from '@/components/templates/auth/loginForm';
import MensajePermiso from '@/components/menssages/mensajePermiso'; 

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [redirectTo, setRedirectTo] = useState('');
  const [sessionActive, setSessionActive] = useState(false); 

  const router = useRouter();

  const nivelRutas = {
    1: 'niveles/nivel1',
    2: 'niveles/nivel2',
    3: 'niveles/nivel3',
  };

  // Hook para verificar si ya hay una sesión activa
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setSessionActive(true); 
    }
  }, []);

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
        localStorage.setItem('token', data.token);
        localStorage.removeItem('hasSeenWelcome');
        setModalMessage('Inicio de sesión exitoso');
        setModalType('success');

        if (data.role === 'estudiante') {
          const ruta = nivelRutas[data.nivel];
          if (ruta) {
            setRedirectTo(`/${ruta}`);
          } else {
            console.error('Nivel desconocido:', data.nivel);
          }
        } else {
          setRedirectTo('/');
        }
      } else {
        setModalMessage(data.error);
        setModalType('error');
      }
    } catch (error) {
      setModalMessage('Error al iniciar sesión');
      setModalType('error');
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
    setModalType('');

    if (redirectTo) {
      router.push(redirectTo);
    }
  };

  // Si hay una sesión activa, mostrar mensaje de permiso
  if (sessionActive) {
    return <MensajePermiso/>
  }

  // Si no hay sesión activa, mostrar el formulario de login
  return (
    <main
      style={{
        backgroundImage: 'url(/img/auth/fondo_auth.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <LoginForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
      <LoginModal
        show={showModal}
        message={modalMessage}
        type={modalType}
        onClose={closeModal}
        redirectTo={redirectTo}
      />
    </main>
  );
}

