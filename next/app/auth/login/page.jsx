// INICIO DE SESIÓN
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/globals.css';
import '@/styles/animacion.css';
import LoginModal from '@/components/modals/adm/LoginModal';
import Link from 'next/link';
import Volver from '@/components/botonVolver';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [redirectTo, setRedirectTo] = useState(''); 
  const router = useRouter();

  // Mapeo de niveles a rutas
  const nivelRutas = {
    1: 'niveles/nivel1',
    2: 'niveles/nivel2',
    3: 'niveles/nivel3',
  };

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Maneja el envío del formulario y realiza la petición de inicio de sesión
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

        // Determina la ruta de redirección basada en el rol y nivel del usuario
        if (data.role === 'estudiante') {
          const ruta = nivelRutas[data.nivel];
          if (ruta) {
            setRedirectTo(`/${ruta}`);
          } else {
            console.error('Nivel desconocido:', data.nivel);
          }
        } else if (data.role === 'docente') {
          setRedirectTo('/');
        } else if (data.role === 'padre') {
          setRedirectTo('/');
        }else if (data.role === 'admin') {
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


  // Cierra el modal de notificación 
  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
    setModalType('');

    // Redirigir cuando se cierre el modal 
    if (redirectTo) {
      router.push(redirectTo);
    }
  };

  return (
    <div className="flex bg-pink-100">
      {/* Volver */}
      <Volver href="/" />
      <div className="flex flex-col justify-center items-center shadow-none p-20 w-full lg:w-1/2">
        <h1 className="mb-4 font-bold text-3xl story">Inicio de sesión</h1>
        <img
          src="/img/personajes/starly/starly.png"
          alt="Logo"
          className="mb-10 w-32 h-32 animate-tumble"
        />
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-6">
            <label className="mb-2 font-bold text-xl story">Correo electrónico:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-2 border-yellow-300 focus:bg-gray-100 px-4 rounded-md w-full h-12 text-lg"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 font-bold text-xl story">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border-2 border-yellow-300 focus:bg-gray-100 px-4 rounded-md w-full h-12 text-lg"
            />
          </div>
          <button type="submit" className="flex justify-center items-center bg-yellow-300 hover:bg-yellow-500 px-10 rounded-md w-full h-12 font-bold text-xl transition duration-300 ease-in-out story">
            Iniciar sesión
          </button>
        </form>
        <hr className="border-0 my-8 border-t border-black w-full" />
        <div className="text-lg story">
          <p>¿No tienes una cuenta? <Link href="/adm/registro" className="text-blue-500 hover:text-blue-700">Regístrate</Link></p>
        </div>
      </div>
      {/* Imagen decorativa  */}
      <div className="lg:flex justify-center items-center hidden lg:w-1/2">
        <img src="/img/auth/login.jpg" alt="Imagen de fondo" className="max-w-full h-auto object-contain" />
      </div>
      <LoginModal
        show={showModal}
        message={modalMessage}
        type={modalType}
        onClose={closeModal}
        redirectTo={redirectTo}
      />
    </div>
  );
}
