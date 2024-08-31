"use client";
import React, { createContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Estado para el personaje seleccionado
  const [characterName, setCharacterName] = useState(null); // Estado para el nombre del personaje

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt.decode(token);
        if (decoded) {
          setSession({ 
            user: decoded.id, 
            name: decoded.name, 
            role: decoded.role, 
            nivel: decoded.nivel 
          });
          setSelectedCharacter(decoded.characterId || null); // Asigna el personaje si está en el token
          setCharacterName(decoded.characterName || null); // Asigna el nombre del personaje si está en el token
          console.log('Decoded JWT:', decoded);
        }
      } catch (error) {
        console.error('Error decodificando el token:', error);
        setSession(null);
      }
    }
  }, []);

  const login = (user) => {
    localStorage.setItem('token', user.token);
    setSession({ 
      user: user.id, 
      name: user.name, 
      role: user.role, 
      nivel: user.nivel 
    });
    setSelectedCharacter(user.characterId || null); // Asigna el personaje después de iniciar sesión
    setCharacterName(user.characterName || null); // Asigna el nombre del personaje después de iniciar sesión
  };

  const logout = () => {
    localStorage.removeItem('token');
    setSession(null);
    setSelectedCharacter(null); // Reinicia el personaje seleccionado al cerrar sesión
    setCharacterName(null); // Reinicia el nombre del personaje al cerrar sesión
  };

  return (
    <SessionContext.Provider value={{ session, login, logout, selectedCharacter, characterName, setSelectedCharacter }}>
      {children}
    </SessionContext.Provider>
  );
};
