
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FeriaConfig, SaleRecord, TipoPago, TipoUnidad } from '../../types';
import { SALES_USER, DIGITAL_PAYMENT_SOUND_BASE64, CASH_PAYMENT_SOUND_BASE64 } from '../../constants';

interface SalesTPVProps {
  feriaConfig: FeriaConfig | null;
  onAddSale: (newSale: SaleRecord) => void;
  onLogout: () => void;
}

export const SalesTPV: React.FC<SalesTPVProps> = ({ feriaConfig, onAddSale, onLogout }) => {
  const [pintaCount, setPintaCount] = useState(0);
  const [litroCount, setLitroCount] = useState(0);
  const [showLoadedMessage, setShowLoadedMessage] = useState(false);

  const digitalSoundRef = useRef<HTMLAudioElement>(null);
  const billeteSoundRef = useRef<HTMLAudioElement>(null);

  // Initialize audio elements once
  useEffect(() => {
    digitalSoundRef.current = new Audio(DIGITAL_PAYMENT_SOUND_BASE64);
    billeteSoundRef.current = new Audio(CASH_PAYMENT_SOUND_BASE64);
  }, []);

  const playSound = useCallback((audioRef: React.MutableRefObject<HTMLAudioElement | null>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Rewind to start
      audioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
  }, []);

  if (!feriaConfig) {
    return (
      <div className="flex flex-col items-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600">
        <h2 className="text-3xl font-bold text-secondary mb-6">TPV de Ventas</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
          La feria no ha sido configurada por el administrador. Por favor, espera a que se configure para poder registrar ventas.
        </p>
        <button
          onClick={onLogout}
          className="py-2 px-4 bg-accent text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
          aria-label="Cerrar sesión de venta"
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }

  const calculatePartialTotal = () => {
    return (pintaCount * feriaConfig.valorPinta + litroCount * feriaConfig.valorLitro).toFixed(2);
  };

  const handleRegisterSale = (tipoPago: TipoPago) => {
    if (pintaCount === 0 && litroCount === 0) return;

    const montoTotal = parseFloat(calculatePartialTotal());
    const newSale: SaleRecord = {
      id: crypto.randomUUID(), // Generate a unique ID for the sale
      fechaVenta: new Date().toISOString(),
      tipoUnidad: pintaCount > 0 && litroCount > 0 ? 'Pinta/Litro Mix' as TipoUnidad : (pintaCount > 0 ? 'Pinta' : 'Litro'), // Simple aggregation for now
      cantidadUnidades: pintaCount + litroCount, // Total units sold
      montoTotal,
      tipoPago,
      usuarioVenta: SALES_USER,
    };

    onAddSale(newSale);
    setPintaCount(0);
    setLitroCount(0);
    setShowLoadedMessage(true);

    if (tipoPago === '$ Digital') {
      playSound(digitalSoundRef);
    } else {
      playSound(billeteSoundRef);
    }

    setTimeout(() => setShowLoadedMessage(false), 1500); // Hide message after 1.5 seconds
  };

  const hasItemsSelected = pintaCount > 0 || litroCount > 0;

  return (
    <div className="flex flex-col p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 min-h-[600px] justify-between">
      <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-600">
        <h1 className="text-3xl font-bold text-secondary">TPV de Ventas</h1>
        <button
          onClick={onLogout}
          className="py-2 px-4 bg-accent text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
          aria-label="Cerrar sesión de venta"
        >
          Cerrar Sesión
        </button>
      </div>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Feria actual: <span className="font-semibold text-primary">{feriaConfig.nombreFeria}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
        {/* Sección de Productos */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold text-textdark dark:text-textlight">Productos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setPintaCount((prev) => prev + 1)}
              className="flex flex-col items-center justify-center p-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors duration-200 h-32"
              aria-label={`Añadir una pinta. Cantidad actual: ${pintaCount}`}
            >
              <span className="text-2xl font-bold">PINTA</span>
              <span className="text-sm">(${feriaConfig.valorPinta.toFixed(2)})</span>
              <span className="text-4xl font-extrabold mt-2">{pintaCount}</span>
            </button>
            <button
              onClick={() => setLitroCount((prev) => prev + 1)}
              className="flex flex-col items-center justify-center p-6 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-colors duration-200 h-32"
              aria-label={`Añadir un litro. Cantidad actual: ${litroCount}`}
            >
              <span className="text-2xl font-bold">LITRO</span>
              <span className="text-sm">(${feriaConfig.valorLitro.toFixed(2)})</span>
              <span className="text-4xl font-extrabold mt-2">{litroCount}</span>
            </button>
          </div>
          {(pintaCount > 0 || litroCount > 0) && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mt-4 text-center">
              <p className="text-xl font-semibold text-textdark dark:text-textlight">
                <span className="text-primary">{pintaCount}</span> Pinta{' '}
                <span className="text-primary">{litroCount}</span> Litro ={' '}
                <span className="font-extrabold text-2xl text-secondary">${calculatePartialTotal()}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cálculo Parcial</p>
            </div>
          )}
        </div>

        {/* Sección de Pago */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold text-textdark dark:text-textlight">Pago</h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-center">
            <p className="text-2xl font-bold text-textdark dark:text-textlight">
              TOTAL: <span className="text-primary text-4xl">${calculatePartialTotal()}</span>
            </p>
          </div>
          <button
            onClick={() => handleRegisterSale('$ Digital')}
            disabled={!hasItemsSelected}
            className={`w-full py-4 px-6 rounded-md font-extrabold text-white text-xl transition-colors duration-200 ${
              hasItemsSelected
                ? 'bg-primary hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
            }`}
            aria-disabled={!hasItemsSelected}
          >
            $ DIGITAL
          </button>
          <button
            onClick={() => handleRegisterSale('$ Billete')}
            disabled={!hasItemsSelected}
            className={`w-full py-4 px-6 rounded-md font-extrabold text-white text-xl transition-colors duration-200 ${
              hasItemsSelected
                ? 'bg-secondary hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
            }`}
            aria-disabled={!hasItemsSelected}
          >
            $ BILLETE
          </button>
        </div>
      </div>

      {showLoadedMessage && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-4xl font-bold rounded-lg z-50 animate-pulse" role="status" aria-live="polite">
          CARGADO!
        </div>
      )}
    </div>
  );
};
