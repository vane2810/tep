"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "", // Campo de apellido opcional
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
  const [isLoading, setIsLoading] = useState(false); // Controla el estado de carga
  const [isSuccess, setIsSuccess] = useState(false); // Controla el estado de éxito
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar confirmación de contraseña

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "role") {
      let characterId = "";

      if (value === "docente") {
        characterId = "14";
      } else if (value === "padre") {
        characterId = "15";
      }

      setFormData({
        ...formData,
        role: value,
        characterId,
        levelId: value === "estudiante" ? formData.levelId : "", // Borra nivel si no es estudiante
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Validar en tiempo real
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value) {
          error = "El nombre es obligatorio.";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "El nombre solo puede contener letras.";
        }
        break;

      case "lastname":
        if (value && !/^[a-zA-Z\s]+$/.test(value)) {
          error = "El apellido solo puede contener letras.";
        }
        break;

      case "email":
        if (!value) {
          error = "El correo electrónico es obligatorio.";
        } else if (
          !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
        ) {
          error = "Formato de correo inválido.";
        }
        break;

      case "password":
        if (!value) {
          error = "La contraseña es obligatoria.";
        } else if (value.length < 8) {
          error = "La contraseña debe tener al menos 8 caracteres.";
        }
        break;

      case "confirmPassword":
        if (value !== formData.password) {
          error = "Las contraseñas no coinciden.";
        }
        break;

      case "role":
        if (!value) {
          error = "Debes seleccionar un rol.";
        }
        break;

      case "levelId":
        if (!value && formData.role === "estudiante") {
          error = "Debes seleccionar un nivel.";
        }
        break;

      case "characterId":
        if (!value && formData.role === "estudiante") {
          error = "Debes seleccionar un personaje.";
        }
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
    });

    return Object.values(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setMensaje("");

    try {
      // Registrar usuario
      const registerRes = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const registerData = await registerRes.json();
      if (!registerRes.ok) throw new Error(registerData.error);

      setUserId(registerData.userId);

      // Asignar rol
      if (formData.role) {
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
      }

      // Asignar nivel y personaje (si aplica)
      if (formData.role === "estudiante") {
        if (formData.levelId) {
          await fetch("http://localhost:3001/api/auth/level", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: registerData.userId,
              levelId: formData.levelId,
            }),
          });
        }

        if (formData.characterId) {
          await fetch("http://localhost:3001/api/auth/character", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: registerData.userId,
              characterId: formData.characterId,
            }),
          });
        }
      } else if (formData.role === "docente" || formData.role === "padre") {
        // Asignar personaje para docente o padre
        await fetch("http://localhost:3001/api/auth/character", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: registerData.userId,
            characterId: formData.characterId,
          }),
        });
      }

      setMensaje("Registro completado exitosamente.");
      setIsSuccess(true);
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-lg max-h-screen overflow-y-auto">
          <h2 className="mb-4 font-bold text-2xl text-center">Registro</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold">Nombre:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Apellido (Opcional):</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
              {errors.lastname && <p className="text-red-500">{errors.lastname}</p>}
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Correo Electrónico:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            <div className="relative mb-4">
              <label className="block font-semibold">Contraseña:</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
              <div
                className="top-9 right-3 absolute cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>

            <div className="relative mb-4">
              <label className="block font-semibold">Confirmar Contraseña:</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
              <div
                className="top-9 right-3 absolute cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
            </div>

            {/* Rol y elementos condicionales */}
            <div className="mb-4">
              <label className="block font-semibold">Rol:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              >
                <option value="">Seleccione un rol</option>
                <option value="estudiante">Estudiante</option>
                <option value="docente">Docente</option>
                <option value="padre">Tutor</option>
              </select>
              {errors.role && <p className="text-red-500">{errors.role}</p>}
            </div>

            {formData.role === "estudiante" && (
              <>
                <div className="mb-4">
                  <label className="block font-semibold">Nivel:</label>
                  <select
                    name="levelId"
                    value={formData.levelId}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  >
                    <option value="">Seleccione un nivel</option>
                    <option value="1">Nivel 1 | 4° Grado</option>
                    <option value="2">Nivel 2 | 5° Grado</option>
                    <option value="3">Nivel 3 | 6° Grado</option>
                  </select>
                  {errors.levelId && <p className="text-red-500">{errors.levelId}</p>}
                </div>

                <div className="mb-4">
                  <label className="block font-semibold">Personaje:</label>
                  <select
                    name="characterId"
                    value={formData.characterId}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                  >
                    <option value="">Seleccione un personaje</option>
                    <option value="1">Peppa - Cerdito</option>
                    <option value="2">Matatabi - Tigre</option>
                    <option value="3">Maomao - Gato</option>
                    <option value="4">Estrella - Mono</option>
                    <option value="5">Kurama - Zorro</option>
                    <option value="6">Ternura - Vaca</option>
                    <option value="7">Lala - Oveja</option>
                    <option value="8">Leen - Conejo</option>
                    <option value="9">Yarichi - Chita</option>
                    <option value="10">Tify - Perro</option>
                    <option value="11">Fify - Zebra</option>
                    <option value="12">Pandita - Pingüino</option>
                  </select>
                  {errors.characterId && <p className="text-red-500">{errors.characterId}</p>}
                </div>
              </>
            )}

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
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Registrar"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {isSuccess && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
            <p className="mb-4 text-center text-green-500">Registro completado exitosamente.</p>
            <button
              onClick={onClose}
              className="bg-blue-500 mt-4 px-4 py-2 rounded w-full text-white"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
