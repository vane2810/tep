// context/session.js
"use client";
import React, { useState, createContext } from 'react';

// Crear el contexto
const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  const login = (user) => {
    setSession(user);
  };

  const logout = () => {
    setSession(null);
  };

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider, SessionContext };
