
import React from 'react';
import { useFeria } from '../contexts/FeriaContext';
import AdminSetupForm from './AdminSetupForm';
import AdminSummary from './AdminSummary';

const AdminDashboard: React.FC = () => {
  const { feriaParams, salesCounters, closeSales, resetFeria } = useFeria();

  const totalItemsSold = (salesCounters?.digitalCount || 0) + (salesCounters?.billeteCount || 0);
  const totalRevenue = feriaParams
    ? (salesCounters?.digitalCount || 0) * feriaParams.valorPintqa +
      (salesCounters?.billeteCount || 0) * feriaParams.valorLitro
    : 0;

  if (!feriaParams) {
    return <AdminSetupForm />;
  }

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Panel de Administrador</h2>

      {feriaParams.ventasCerradas ? (
        <AdminSummary feriaParams={feriaParams} salesCounters={salesCounters!} />
      ) : (
        <>
          <div className="bg-indigo-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Parámetros de la Feria</h3>
            <p className="text-gray-700"><span className="font-medium">Nombre:</span> {feriaParams.nombreFeria}</p>
            <p className="text-gray-700"><span className="font-medium">Fecha:</span> {feriaParams.fechaFeria}</p>
            <p className="text-gray-700"><span className="font-medium">Valor Pintqa:</span> ${feriaParams.valorPintqa.toFixed(2)}</p>
            <p className="text-gray-700"><span className="font-medium">Valor Litro:</span> ${feriaParams.valorLitro.toFixed(2)}</p>
          </div>

          <div className="bg-teal-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Contadores de Ventas (Tiempo Real)</h3>
            <p className="text-gray-700">
              Digital: <span className="font-bold text-indigo-600">{salesCounters?.digitalCount || 0}</span>
            </p>
            <p className="text-gray-700">
              Billete: <span className="font-bold text-teal-600">{salesCounters?.billeteCount || 0}</span>
            </p>
            <p className="text-lg font-bold text-gray-800 border-t pt-3 mt-3">
              Total Clicks: <span className="text-blue-700">{totalItemsSold}</span>
            </p>
            <p className="text-xl font-bold text-gray-800">
              Total Recaudado: <span className="text-green-700">${totalRevenue.toFixed(2)}</span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={closeSales}
              className="flex-1 py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 ease-in-out"
            >
              Cerrar Ventas y Generar Reporte
            </button>
          </div>
        </>
      )}

      <button
        onClick={resetFeria}
        className="w-full py-3 px-6 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-200 ease-in-out"
      >
        Borrar Datos y Reiniciar Feria
      </button>
    </div>
  );
};

export default AdminDashboard;
    