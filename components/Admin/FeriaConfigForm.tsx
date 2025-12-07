
import React, { useState, useEffect } from 'react';
import { FeriaConfig } from '../../types';

interface FeriaConfigFormProps {
  feriaConfig: FeriaConfig | null;
  onSave: (config: FeriaConfig) => void;
}

export const FeriaConfigForm: React.FC<FeriaConfigFormProps> = ({ feriaConfig, onSave }) => {
  const [nombreFeria, setNombreFeria] = useState(feriaConfig?.nombreFeria || '');
  const [fechaInicio, setFechaInicio] = useState(feriaConfig?.fechaInicio || '');
  const [fechaFin, setFechaFin] = useState(feriaConfig?.fechaFin || '');
  const [valorPinta, setValorPinta] = useState(feriaConfig?.valorPinta || 0);
  const [valorLitro, setValorLitro] = useState(feriaConfig?.valorLitro || 0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (feriaConfig) {
      setNombreFeria(feriaConfig.nombreFeria);
      setFechaInicio(feriaConfig.fechaInicio);
      setFechaFin(feriaConfig.fechaFin);
      setValorPinta(feriaConfig.valorPinta);
      setValorLitro(feriaConfig.valorLitro);
    }
  }, [feriaConfig]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    setFeedbackMessage(null);

    // Basic validation
    if (!nombreFeria || !fechaInicio || !fechaFin || valorPinta <= 0 || valorLitro <= 0) {
      setFeedbackMessage('Todos los campos son obligatorios y los valores deben ser mayores a 0.');
      setIsError(true);
      return;
    }
    if (new Date(fechaInicio) > new Date(fechaFin)) {
      setFeedbackMessage('La fecha de inicio no puede ser posterior a la fecha de fin.');
      setIsError(true);
      return;
    }

    const newConfig: FeriaConfig = {
      nombreFeria,
      fechaInicio,
      fechaFin,
      valorPinta: parseFloat(valorPinta.toString()), // Ensure number type
      valorLitro: parseFloat(valorLitro.toString()), // Ensure number type
    };
    onSave(newConfig);
    setFeedbackMessage('Configuración de la feria guardada con éxito.');
    setTimeout(() => setFeedbackMessage(null), 3000); // Clear message after 3 seconds
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-2xl font-semibold text-textdark dark:text-textlight mb-4">Configurar Feria</h3>
      {feedbackMessage && (
        <div className={`p-3 rounded-md ${isError ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'}`} role="status">
          {feedbackMessage}
        </div>
      )}

      <div>
        <label htmlFor="nombreFeria" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nombre de la Feria
        </label>
        <input
          type="text"
          id="nombreFeria"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-textlight"
          value={nombreFeria}
          onChange={(e) => setNombreFeria(e.target.value)}
          required
          aria-required="true"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Fecha de Inicio
          </label>
          <input
            type="date"
            id="fechaInicio"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-textlight"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Fecha de Fin
          </label>
          <input
            type="date"
            id="fechaFin"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-textlight"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            required
            aria-required="true"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="valorPinta" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Valor Pinta
          </label>
          <input
            type="number"
            id="valorPinta"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-textlight"
            value={valorPinta}
            onChange={(e) => setValorPinta(parseFloat(e.target.value))}
            min="0.01"
            step="0.01"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="valorLitro" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Valor Litro
          </label>
          <input
            type="number"
            id="valorLitro"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-textlight"
            value={valorLitro}
            onChange={(e) => setValorLitro(parseFloat(e.target.value))}
            min="0.01"
            step="0.01"
            required
            aria-required="true"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 bg-primary text-white rounded-md font-semibold hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
      >
        Guardar Configuración
      </button>
    </form>
  );
};
