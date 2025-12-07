
import React from 'react';
import { FeriaConfig, SaleRecord, TipoPago, TipoUnidad } from '../../types';

interface SalesReportProps {
  feriaConfig: FeriaConfig | null;
  sales: SaleRecord[];
  onClearSales: () => void;
}

export const SalesReport: React.FC<SalesReportProps> = ({ feriaConfig, sales, onClearSales }) => {
  if (!feriaConfig) {
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-md">
        <p className="text-xl font-medium mb-4">¡Atención Administrador!</p>
        <p>Por favor, configura la feria primero para poder ver los reportes de ventas.</p>
        <p className="mt-2 text-sm">Navega a la pestaña "Configurar Feria".</p>
      </div>
    );
  }

  const calculateReport = () => {
    let totalPintas = 0;
    let totalLitros = 0;
    let montoTotalGeneral = 0;
    let montoTotalDigital = 0;
    let montoTotalBillete = 0;

    sales.forEach((sale) => {
      montoTotalGeneral += sale.montoTotal;
      if (sale.tipoPago === '$ Digital') {
        montoTotalDigital += sale.montoTotal;
      } else {
        montoTotalBillete += sale.montoTotal;
      }

      if (sale.tipoUnidad === 'Pinta') {
        totalPintas += sale.cantidadUnidades;
      } else {
        totalLitros += sale.cantidadUnidades;
      }
    });

    return {
      totalPintas,
      totalLitros,
      montoTotalGeneral: montoTotalGeneral.toFixed(2),
      montoTotalDigital: montoTotalDigital.toFixed(2),
      montoTotalBillete: montoTotalBillete.toFixed(2),
    };
  };

  const report = calculateReport();

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-textdark dark:text-textlight mb-4">Reporte de Ventas</h3>
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-sm">
        <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
          Feria: <span className="text-primary">{feriaConfig.nombreFeria}</span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Periodo: {feriaConfig.fechaInicio} al {feriaConfig.fechaFin}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Valor Pinta: ${feriaConfig.valorPinta.toFixed(2)} | Valor Litro: ${feriaConfig.valorLitro.toFixed(2)}
        </p>
      </div>

      {sales.length === 0 ? (
        <div className="p-6 text-center text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-md">
          <p className="text-xl font-medium">No hay ventas registradas para esta feria aún.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow">
            <h4 className="font-semibold text-lg mb-2 text-textdark dark:text-textlight">Cantidades Vendidas</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Total Pintas: <span className="font-bold text-primary">{report.totalPintas}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Total Litros: <span className="font-bold text-primary">{report.totalLitros}</span>
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow">
            <h4 className="font-semibold text-lg mb-2 text-textdark dark:text-textlight">Monto Total Recaudado</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Total General: <span className="font-bold text-primary">${report.montoTotalGeneral}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Total Digital: <span className="font-bold text-secondary">${report.montoTotalDigital}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Total Billete: <span className="font-bold text-amber-700 dark:text-amber-300">${report.montoTotalBillete}</span>
            </p>
          </div>
        </div>
      )}

      <button
        onClick={onClearSales}
        className="w-full py-3 px-6 bg-accent text-white rounded-md font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-colors duration-200 mt-6"
        disabled={sales.length === 0}
        aria-disabled={sales.length === 0}
      >
        Cerrar Ventas y Reiniciar
      </button>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center" role="note">
        Advertencia: Cerrar ventas borrará todos los registros de ventas actuales.
      </p>
    </div>
  );
};
