import React, { useState, useEffect } from 'react';
import { FiSave, FiXCircle } from 'react-icons/fi';
import PersonajeModal from '@/components/modals/auth/personajeModal';
import NivelModal from '@/components/modals/auth/nivelModal';
import RolModal from '@/components/modals/auth/rolesModal';

export default function ModalAgregarUsuario({ onClose }) {
  // Inicializar los valores para agregar un nuevo usuario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [role, setRole] = useState('');
  const [characterId, setCharacterId] = useState('');
  const [levelId, setLevelId] = useState('');
  const [userId, setUserId] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [mostrarMinimodal, setMostrarMinimodal] = useState(false);

  // Validaciones de campos
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Estados para abrir los modales de selección
  const [mostrarModalRol, setMostrarModalRol] = useState(false);
  const [mostrarModalPersonaje, setMostrarModalPersonaje] = useState(false);
  const [mostrarModalNivel, setMostrarModalNivel] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const validator = require('validator');

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    setNameError(!regex.test(name) ? 'El nombre solo puede contener letras.' : '');
  };

  const validateEmail = (email) => {
    const MAX_LENGTH = 254;
    if (email.length > MAX_LENGTH) {
      setEmailError('El correo es demasiado largo.');
      return;
    }
    setEmailError(!validator.isEmail(email) ? 'Formato de correo inválido.' : '');
  };

  const validatePassword = (password) => {
    setPasswordError(password.length < 8 ? 'La contraseña debe tener al menos 8 caracteres.' : '');
  };

  const validateConfirmPassword = (confirmPassword) => {
    setConfirmPasswordError(confirmPassword !== formData.password ? 'Las contraseñas no coinciden.' : '');
  };

  // Manejo de cambios en los campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validación dinámica de los campos
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

  const handleSave = async () => {
    validateName(formData.name);
    validateEmail(formData.email);
    validatePassword(formData.password);
    validateConfirmPassword(formData.confirmPassword);

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setMensaje('Por favor corrija los errores antes de continuar.');
      setMostrarMinimodal(true);
      return;
    }

    try {
      // Registro inicial del usuario
      const res = await fetch(`http://localhost:3001/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setUserId(data.userId); // Guardar el ID del usuario registrado
        setMostrarModalRol(true); // Abrir modal de selección de rol
      } else {
        setMensaje(data.error || 'No se pudo crear el usuario');
        setMostrarMinimodal(true);
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
      setMensaje('Error al conectar con el servidor');
      setMostrarMinimodal(true);
    }
  };

  // Definir las funciones de selección para los modales
  const handleRoleSelected = (selectedRole) => {
    setRole(selectedRole);
    setMostrarModalRol(false);
    if (selectedRole === 'estudiante') {
      setMostrarModalNivel(true);
    } else {
      setMostrarModalPersonaje(true);
    }
  };

  const handleLevelSelected = (selectedLevel) => {
    setLevelId(selectedLevel);
    setMostrarModalNivel(false);
    setMostrarModalPersonaje(true);
  };

  const handleCharacterSelected = (selectedCharacter) => {
    setCharacterId(selectedCharacter);
    setMostrarModalPersonaje(false);
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="relative z-60 bg-white shadow-2xl p-8 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="mb-6 font-bold text-2xl text-gray-800">Agregar Nuevo Usuario</h2>

        {/* Minimodal de mensaje */}
        {mostrarMinimodal && (
          <div className="z-70 fixed inset-0 flex justify-center items-center transition-opacity duration-300">
            <div className={`z-70 bg-white p-6 rounded-lg shadow-xl border ${mensaje.startsWith('Error') ? 'border-red-500' : 'border-green-500'} text-center`}>
              <p className={`${mensaje.startsWith('Error') ? 'text-red-500' : 'text-green-500'} font-semibold text-lg`}>
                {mensaje}
              </p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border-gray-300 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {nameError && <p className="text-red-500">{nameError}</p>}
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-gray-300 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-gray-300 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border-gray-300 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 px-5 py-3 rounded font-semibold text-gray-700 transform transition-transform hover:-translate-y-1 duration-200"
            onClick={onClose}
          >
            <FiXCircle /> Cancelar
          </button>
          <button
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 px-5 py-3 rounded font-semibold text-white transform transition-transform hover:-translate-y-1 duration-200"
            onClick={handleSave}
          >
            <FiSave /> Guardar
          </button>
        </div>

        {/* Modal de selección de Rol */}
        {mostrarModalRol && (
          <RolModal
            show={mostrarModalRol}
            onClose={() => setMostrarModalRol(false)}
            onRoleSelected={handleRoleSelected}
          />
        )}

        {/* Modal de selección de Nivel */}
        {mostrarModalNivel && (
          <NivelModal
            show={mostrarModalNivel}
            onClose={() => setMostrarModalNivel(false)}
            onLevelSelected={handleLevelSelected}
          />
        )}

        {/* Modal de selección de Personaje */}
        {mostrarModalPersonaje && (
          <PersonajeModal
            show={mostrarModalPersonaje}
            onClose={() => setMostrarModalPersonaje(false)}
            onCharacterSelected={handleCharacterSelected}
          />
        )}
      </div>
    </div>
  );
}
