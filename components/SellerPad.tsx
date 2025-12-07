
import React, { useEffect, useRef } from 'react';
import { useFeria } from '../contexts/FeriaContext';
import { DIGITAL_SOUND_URL, BILLETE_SOUND_URL } from '../constants';

const SellerPad: React.FC = () => {
  const { feriaParams, updateSalesCount } = useFeria();

  const digitalAudioRef = useRef<HTMLAudioElement | null>(null);
  const billeteAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    digitalAudioRef.current = new Audio(DIGITAL_SOUND_URL);
    billeteAudioRef.current = new Audio(BILLETE_SOUND_URL);
  }, []);

  const playSound = (audioRef: React.MutableRefObject<HTMLAudioElement | null>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Rewind to start in case it's still playing
      audioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
  };

  const handleDigitalClick = () => {
    updateSalesCount('digital');
    playSound(digitalAudioRef);
  };

  const handleBilleteClick = () => {
    updateSalesCount('billete');
    playSound(billeteAudioRef);
  };

  if (!feriaParams) {
    return (
      <div className="text-center p-6 bg-yellow-50 rounded-lg shadow-lg border border-yellow-300">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4">Feria No Configurada</h2>
        <p className="text-gray-700">Por favor, espera a que el administrador configure los parámetros de la feria.</p>
      </div>
    );
  }

  if (feriaParams.ventasCerradas) {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg shadow-lg border border-red-300">
        <h2 className="text-2xl font-bold text-red-800 mb-4">Ventas Cerradas</h2>
        <p className="text-gray-700">Las ventas para esta feria han sido cerradas.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg p-4 sm:p-6 bg-white rounded-lg shadow-xl flex flex-col items-center justify-center space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Registrar Venta</h2>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <button
          onClick={handleDigitalClick}
          className="flex-1 flex flex-col items-center justify-center py-12 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-4xl font-extrabold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105"
        >
          $ DIGITAL
          <span className="text-lg mt-2 font-medium">Click para venta digital</span>
        </button>
        <button
          onClick={handleBilleteClick}
          className="flex-1 flex flex-col items-center justify-center py-12 px-6 bg-gradient-to-r from-green-600 to-teal-700 text-white text-4xl font-extrabold rounded-xl shadow-lg hover:from-green-700 hover:to-teal-800 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105"
        >
          $ BILLETE
          <span className="text-lg mt-2 font-medium">Click para venta en billete</span>
        </button>
      </div>
    </div>
  );
};

export default SellerPad;
    