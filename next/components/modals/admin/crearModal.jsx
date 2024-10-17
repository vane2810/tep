import React, { useState, useEffect } from 'react';
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

  // Manejo de selección de rol
  const handleRoleSelected = async (selectedRole) => {
    setRole(selectedRole);
    setMostrarModalRol(false);

    try {
      const res = await fetch('http://localhost:3001/api/auth/role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, role: selectedRole }),
      });

      if (res.ok) {
        if (selectedRole === 'estudiante') {
          setMostrarModalNivel(true); // Abrir modal de selección de nivel si es estudiante
        } else {
          setMensaje('Usuario creado exitosamente');
          setMostrarMinimodal(true);
          setTimeout(() => {
            setMostrarMinimodal(false);
            onClose();
          }, 2000);
        }
      } else {
        setMensaje('Error al asignar el rol');
        setMostrarMinimodal(true);
      }
    } catch (error) {
      console.error('Error al asignar rol:', error);
      setMensaje('Error al conectar con el servidor');
      setMostrarMinimodal(true);
    }
  };

  // Manejo de selección de nivel
  const handleLevelSelected = async (selectedLevelId) => {
    setLevelId(selectedLevelId);
    setMostrarModalNivel(false);
    try {
      const res = await fetch('http://localhost:3001/api/auth/level', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, levelId: selectedLevelId }),
      });

      if (res.ok) {
        setMostrarModalPersonaje(true); // Abrir modal de selección de personaje
      } else {
        setMensaje('Error al asignar el nivel');
        setMostrarMinimodal(true);
      }
    } catch (error) {
      console.error('Error al asignar nivel:', error);
      setMensaje('Error al conectar con el servidor');
      setMostrarMinimodal(true);
    }
  };

  // Manejo de selección de personaje
  const handleCharacterSelected = async (selectedCharacterId) => {
    setCharacterId(selectedCharacterId);
    setMostrarModalPersonaje(false);
    try {
      const res = await fetch('http://localhost:3001/api/auth/character', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, characterId: selectedCharacterId }),
      });

      if (res.ok) {
        setMensaje('Usuario creado exitosamente');
        setMostrarMinimodal(true);
        setTimeout(() => {
          setMostrarMinimodal(false);
          onClose();
        }, 2000);
      } else {
        setMensaje('Error al asignar el personaje');
        setMostrarMinimodal(true);
      }
    } catch (error) {
      console.error('Error al asignar personaje:', error);
      setMensaje('Error al conectar con el servidor');
      setMostrarMinimodal(true);
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative z-60 bg-white shadow-lg p-6 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
        <h2 className="mb-4 font-bold text-2xl">Agregar Nuevo Usuario</h2>

        {/* Minimodal de mensaje */}
        {mostrarMinimodal && (
          <div className="z-70 fixed inset-0 flex justify-center items-center">
            <div className={`z-70 bg-white p-4 rounded-lg shadow-lg border ${mensaje.startsWith('Error') ? 'border-red-500' : 'border-green-500'} text-center`}>
              <p className={`${mensaje.startsWith('Error') ? 'text-red-500' : 'text-green-500'} font-bold`}>
                {mensaje}
              </p>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border-gray-300 p-2 border rounded w-full"
          />
          {nameError && <p className="text-red-500">{nameError}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-gray-300 p-2 border rounded w-full"
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-gray-300 p-2 border rounded w-full"
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border-gray-300 p-2 border rounded w-full"
          />
          {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded font-bold text-white"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded font-bold text-white"
            onClick={handleSave}
          >
            Guardar
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
