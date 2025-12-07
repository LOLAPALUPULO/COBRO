
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    if (!password) {
      setError('Por favor, ingresa una contraseña.');
      return;
    }
    const loggedIn = login(password);
    if (!loggedIn) {
      setError('Contraseña incorrecta.');
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="password" className="sr-only">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
          >
            Entrar
          </button>
        </div>
      </form>
      <p className="mt-6 text-sm text-gray-500">
        Nivel 1 (Administrador): <span className="font-semibold text-gray-700">Registro</span>
      </p>
      <p className="text-sm text-gray-500">
        Nivel 2 (Vendedor): <span className="font-semibold text-gray-700">LolaPa</span>
      </p>
    </div>
  );
};

export default LoginForm;
    