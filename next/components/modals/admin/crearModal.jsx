"use client";
import React, { useState } from "react";

export default function RegisterModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    levelId: "",
    characterId: "",
  });

  const [userId, setUserId] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "El nombre es obligatorio.";
    if (!formData.email) newErrors.email = "El correo electrónico es obligatorio.";
    if (!formData.password) newErrors.password = "La contraseña es obligatoria.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    if (!formData.role) newErrors.role = "Debes seleccionar un rol.";
    if (!formData.levelId && formData.role === "estudiante")
      newErrors.levelId = "Debes seleccionar un nivel.";
    if (!formData.characterId)
      newErrors.characterId = "Debes seleccionar un personaje.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const registerRes = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const registerData = await registerRes.json();
      if (!registerRes.ok) throw new Error(registerData.error);

      setUserId(registerData.userId);

      const roleRes = await fetch("http://localhost:3001/api/auth/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: registerData.userId,
          role: formData.role,
        }),
      });

      const roleData = await roleRes.json();
      if (!roleRes.ok) throw new Error(roleData.error);

      if (formData.role === "estudiante") {
        const levelRes = await fetch("http://localhost:3001/api/auth/level", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: registerData.userId,
            levelId: formData.levelId,
          }),
        });

        const levelData = await levelRes.json();
        if (!levelRes.ok) throw new Error(levelData.error);
      }

      const characterRes = await fetch(
        "http://localhost:3001/api/auth/character",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: registerData.userId,
            characterId: formData.characterId,
          }),
        }
      );

      const characterData = await characterRes.json();
      if (!characterRes.ok) throw new Error(characterData.error);

      setMensaje("Registro completado exitosamente.");
    } catch (error) {
      console.error("Error en el registro:", error);
      setMensaje(error.message);
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-lg">
        <h2 className="mb-4 font-bold text-2xl text-center">Registro</h2>

        {mensaje && <p className="mb-4 text-green-500">{mensaje}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border w-full"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block">Correo Electrónico:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border w-full"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 border w-full"
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>

          <div className="mb-4">
            <label className="block">Confirmar Contraseña:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="p-2 border w-full"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block">Rol:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="p-2 border w-full"
            >
              <option value="">Seleccione un rol</option>
              <option value="estudiante">Estudiante</option>
              <option value="docente">Docente</option>
              <option value="padre">Tutor</option>
            </select>
            {errors.role && <p className="text-red-500">{errors.role}</p>}
          </div>

          {formData.role === "estudiante" && (
            <div className="mb-4">
              <label className="block">Nivel:</label>
              <select
                name="levelId"
                value={formData.levelId}
                onChange={handleChange}
                className="p-2 border w-full"
              >
                <option value="">Seleccione un nivel</option>
                <option value="1">Nivel 1 | 4° Grado</option>
                <option value="2">Nivel 2 | 5° Grado</option>
                <option value="3">Nivel 3 | 6° Grado</option>
              </select>
              {errors.levelId && <p className="text-red-500">{errors.levelId}</p>}
            </div>
          )}

          <div className="mb-4">
            <label className="block">Personaje:</label>
            <select
              name="characterId"
              value={formData.characterId}
              onChange={handleChange}
              className="p-2 border w-full"
            >
              <option value="">Seleccione un personaje</option>
              <option value="1">Personaje 1</option>
              <option value="2">Personaje 2</option>
              <option value="3">Personaje 3</option>
            </select>
            {errors.characterId && (
              <p className="text-red-500">{errors.characterId}</p>
            )}
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 px-4 py-2 rounded text-white"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded text-white"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
