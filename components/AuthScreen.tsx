
import React, { useState } from 'react';
import { UserRole } from '../types';
import { ADMIN_USER, SALES_USER } from '../constants';

interface AuthScreenProps {
  onLogin: (role: UserRole) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAdminLogin = () => {
    if (username === ADMIN_USER) {
      onLogin('admin');
      setError(null);
    } else {
      setError('Usuario de administrador incorrecto.');
    }
  };

  const handleSalesLogin = () => {
    if (username === SALES_USER) {
      onLogin('sales');
      setError(null);
    } else {
      setError('Usuario de venta incorrecto.');
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600">
      <h2 className="text-3xl font-bold text-primary mb-6">Feria Sales Register</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">Por favor, ingresa tu usuario:</p>
      <input
        type="text"
        className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-textlight text-textdark"
        placeholder="Usuario"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setError(null); // Clear error on input change
        }}
        aria-label="Nombre de usuario"
      />
      {error && <p className="text-accent text-sm mb-4" role="alert">{error}</p>}
      <div className="flex flex-col space-y-4 w-full">
        <button
          onClick={handleAdminLogin}
          disabled={username !== ADMIN_USER}
          className={`w-full py-3 px-6 rounded-md font-semibold transition-colors duration-200 ${
            username === ADMIN_USER
              ? 'bg-primary text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
          }`}
          aria-disabled={username !== ADMIN_USER}
        >
          Iniciar como Administrador
        </button>
        <button
          onClick={handleSalesLogin}
          disabled={username !== SALES_USER}
          className={`w-full py-3 px-6 rounded-md font-semibold transition-colors duration-200 ${
            username === SALES_USER
              ? 'bg-secondary text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
          }`}
          aria-disabled={username !== SALES_USER}
        >
          Iniciar como Venta
        </button>
      </div>
    </div>
  );
};
