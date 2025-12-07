
import React from 'react';
import { FeriaParams, SalesCounters } from '../types';

interface AdminSummaryProps {
  feriaParams: FeriaParams;
  salesCounters: SalesCounters;
}

const AdminSummary: React.FC<AdminSummaryProps> = ({ feriaParams, salesCounters }) => {
  const totalItemsSold = salesCounters.digitalCount + salesCounters.billeteCount;
  const totalRevenue =
    (salesCounters.digitalCount * feriaParams.valorPintqa) +
    (salesCounters.billeteCount * feriaParams.valorLitro);

  return (
    <div className="w-full max-w-xl p-6 bg-green-50 rounded-lg shadow-xl border-2 border-green-300 text-center">
      <h2 className="text-3xl font-bold text-green-800 mb-6">Reporte Final de Ventas</h2>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Feria:</span> {feriaParams.nombreFeria}
      </p>
      <p className="text-lg text-gray-700 mb-4">
        <span className="font-semibold">Fecha:</span> {feriaParams.fechaFeria}
      </p>

      <div className="bg-white p-4 rounded-lg shadow-inner mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Detalle de Clicks</h3>
        <p className="text-gray-700 mb-2">
          Clicks Digitales: <span className="font-bold text-indigo-600">{salesCounters.digitalCount}</span>
        </p>
        <p className="text-gray-700 mb-4">
          Clicks en Billete: <span className="font-bold text-teal-600">{salesCounters.billeteCount}</span>
        </p>
        <p className="text-xl font-bold text-gray-800 border-t pt-4">
          Cantidad Total Vendida (Clicks): <span className="text-blue-700">{totalItemsSold}</span>
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Valores Configurados</h3>
        <p className="text-gray-700">
          Valor Pintqa: <span className="font-bold text-green-700">${feriaParams.valorPintqa.toFixed(2)}</span>
        </p>
        <p className="text-gray-700">
          Valor Litro: <span className="font-bold text-green-700">${feriaParams.valorLitro.toFixed(2)}</span>
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <p className="text-2xl mb-2">Monto Total Recaudado</p>
        <p className="text-5xl font-extrabold">${totalRevenue.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default AdminSummary;
    