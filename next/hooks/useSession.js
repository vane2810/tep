// Hooks - use sesion
import React, { useContext } from 'react';
import { SessionContext } from '../context/session'; 
 
const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export default useSession;
