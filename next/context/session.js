// Contexto - Session
"use client"
import React, { createContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // token en localStorage 
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt.decode(token);
        if (decoded) {
          setSession({ user: decoded.id, role: decoded.role }); 
        }
      } catch (error) {
        console.error('Error decodificando el token:', error);
        setSession(null);
      }
    }
  }, []);

  const login = (user) => {
    
    localStorage.setItem('token', user.token); 
    setSession({ user: user.id, role: user.role });
  };

  const logout = () => {
    // Limpiar el estado de sesión
    localStorage.removeItem('token');
    setSession(null);
  };

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
