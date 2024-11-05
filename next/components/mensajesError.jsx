// Componente para mensajes de error
import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 bg-red-100 mt-1 p-2 rounded-md text-red-600 text-sm">
      <FiAlertCircle size={16} />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
