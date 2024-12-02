"use client";
import React, { createContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Estado para el personaje seleccionado

  // Función para verificar la expiración del token
  const checkTokenExpiration = (token) => {
    try {
      const decoded = jwt.decode(token);
      if (decoded) {
        const expirationTime = decoded.exp * 1000; // Convertir a milisegundos
        const currentTime = Date.now();

        // Si el token ha expirado
        if (currentTime > expirationTime) {
          // Eliminar token del localStorage y cerrar sesión
          localStorage.removeItem('token');
          return false;
        }
        return true; // El token es válido
      }
      return false; // El token no es válido
    } catch (error) {
      console.error('Error al verificar el token:', error);
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (checkTokenExpiration(token)) {
        const decoded = jwt.decode(token);
        setSession({
          user: decoded.id,
          email: decoded.email,
          name: decoded.name,
          role: decoded.role,
          nivel: decoded.nivel,
        });
        setSelectedCharacter(decoded.characterId || null);
      } else {
        setSession(null); // Si el token ha expirado, cerramos la sesión
      }
    }
  }, []);

  // Función de login
  const login = (user) => {
    localStorage.setItem('token', user.token);
    if (checkTokenExpiration(user.token)) {
      setSession({
        user: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        nivel: user.nivel,
      });
      setSelectedCharacter(user.characterId || null);
    }
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem('token');
    setSession(null);
    setSelectedCharacter(null); // Reinicia el personaje seleccionado al cerrar sesión
  };

  return (
    <SessionContext.Provider value={{ session, login, logout, selectedCharacter, setSelectedCharacter }}>
      {children}
    </SessionContext.Provider>
  );
};
