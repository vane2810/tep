// Contexto - Session
"use client";
import React, { createContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Estado para el personaje seleccionado

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt.decode(token);
        if (decoded) {
          setSession({ user: decoded.id, email: decoded.email, name: decoded.name, role: decoded.role, nivel: decoded.nivel });
          setSelectedCharacter(decoded.characterId || null); // Asigna el personaje si está en el token
        }
      } catch (error) {
        console.error('Error decodificando el token:', error);
        setSession(null);
      }
    }
  }, []);

  const login = (user) => {
    localStorage.setItem('token', user.token);
    setSession({ user: user.id, name: user.name, email: user.email, role: user.role, nivel: user.nivel });
    setSelectedCharacter(user.characterId || null); // Asigna el personaje después de iniciar sesión
  };

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

