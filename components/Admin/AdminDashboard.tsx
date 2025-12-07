
import React, { useState } from 'react';
import { FeriaConfig, SaleRecord } from '../../types';
import { FeriaConfigForm } from './FeriaConfigForm';
import { SalesReport } from './SalesReport';

interface AdminDashboardProps {
  feriaConfig: FeriaConfig | null;
  sales: SaleRecord[];
  onUpdateFeriaConfig: (config: FeriaConfig) => void;
  onClearSales: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  feriaConfig,
  sales,
  onUpdateFeriaConfig,
  onClearSales,
  onLogout,
}) => {
  const [view, setView] = useState<'config' | 'report'>(feriaConfig ? 'report' : 'config');

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
      <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-600">
        <h1 className="text-3xl font-bold text-primary">Panel de Administrador</h1>
        <button
          onClick={onLogout}
          className="py-2 px-4 bg-accent text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
          aria-label="Cerrar sesión de administrador"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setView('config')}
          className={`py-2 px-4 rounded-md font-semibold transition-colors duration-200 ${
            view === 'config'
              ? 'bg-primary text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Configurar Feria
        </button>
        <button
          onClick={() => setView('report')}
          className={`py-2 px-4 rounded-md font-semibold transition-colors duration-200 ${
            view === 'report'
              ? 'bg-primary text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Ver Reporte
        </button>
      </div>

      {view === 'config' ? (
        <FeriaConfigForm feriaConfig={feriaConfig} onSave={onUpdateFeriaConfig} />
      ) : (
        <SalesReport feriaConfig={feriaConfig} sales={sales} onClearSales={onClearSales} />
      )}
    </div>
  );
};
