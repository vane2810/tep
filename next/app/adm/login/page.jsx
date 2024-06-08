// INICIO DE SESIÓN

"use client";
import React, { useState } from 'react';
import '@/styles/globals.css';
import '@/styles/animacion.css';
import LoginModal from '@/components/modals/adm/LoginModal';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

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
        setModalMessage('Inicio de sesión exitoso');
        setModalType('success');
        setShowModal(true);
      } else {
        setModalMessage(data.error);
        setModalType('error');
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage('Error al iniciar sesión');
      setModalType('error');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
    setModalType('');
  };

  return (
    <div className="flex bg-pink-100">
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-20 shadow-none">
        <h1 className="text-3xl font-bold mb-4 story">Inicio de sesión</h1>
        <img
          src="/img/page/starly.png"
          alt="Logo"
          className="h-32 w-32 mb-10 animate-tumble"
        />
        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-6">
              <label className="text-xl font-bold mb-2 story">Correo electrónico:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 text-lg border-2 border-yellow-300 rounded-md focus:bg-gray-100"
              />
            </div>
            <div className="mb-6">
              <label className="text-xl font-bold mb-2 story">Contraseña:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 text-lg border-2 border-yellow-300 rounded-md focus:bg-gray-100"
              />
            </div>
            <button type="submit" className="w-full h-12 px-10 text-xl bg-yellow-300 rounded-md font-bold transition duration-300 ease-in-out hover:bg-yellow-500 flex justify-center items-center story">
              Iniciar sesión
            </button>
          </form>
        </div>
        <hr className="w-full border-0 border-t border-black my-8" />
        <div className="text-lg story">
          <p>¿No tienes una cuenta? <Link href="/adm/registro" className="text-blue-500 hover:text-blue-700">Regístrate</Link></p>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
        <img src="/img/page/login.jpg" alt="Imagen final" className="max-w-full h-auto object-contain" />
      </div>
      <LoginModal show={showModal} message={modalMessage} type={modalType} onClose={closeModal} />
    </div>

  );

}
