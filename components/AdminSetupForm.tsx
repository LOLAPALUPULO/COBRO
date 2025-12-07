
import React, { useState } from 'react';
import { useFeria } from '../contexts/FeriaContext';
import { FeriaParams } from '../types';

const AdminSetupForm: React.FC = () => {
  const { saveFeriaParams } = useFeria();
  const [formState, setFormState] = useState<Omit<FeriaParams, 'ventasCerradas'>>({
    nombreFeria: '',
    fechaFeria: new Date().toISOString().split('T')[0], // Default to current date
    valorPintqa: 0,
    valorLitro: 0,
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formState.nombreFeria || !formState.fechaFeria) {
      setError('Nombre y Fecha de la feria son obligatorios.');
      return;
    }
    if (formState.valorPintqa <= 0 || formState.valorLitro <= 0) {
      setError('Los valores de Pintqa y Litro deben ser mayores a 0.');
      return;
    }

    saveFeriaParams(formState);
  };

  return (
    <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Configurar Feria</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombreFeria" className="block text-sm font-medium text-gray-700">
            Nombre de la Feria
          </label>
          <input
            type="text"
            id="nombreFeria"
            name="nombreFeria"
            value={formState.nombreFeria}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="fechaFeria" className="block text-sm font-medium text-gray-700">
            Fecha de la Feria
          </label>
          <input
            type="date"
            id="fechaFeria"
            name="fechaFeria"
            value={formState.fechaFeria}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="valorPintqa" className="block text-sm font-medium text-gray-700">
            Valor Pintqa ($)
          </label>
          <input
            type="number"
            id="valorPintqa"
            name="valorPintqa"
            value={formState.valorPintqa}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="valorLitro" className="block text-sm font-medium text-gray-700">
            Valor Litro ($)
          </label>
          <input
            type="number"
            id="valorLitro"
            name="valorLitro"
            value={formState.valorLitro}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
          >
            Guardar Parámetros
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSetupForm;
    