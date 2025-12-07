
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { FeriaParams, SalesCounters } from '../types';
import { localStorageService } from '../services/localStorageService';
import { FERIA_PARAMS_KEY, SALES_COUNTERS_KEY } from '../constants';

interface FeriaContextType {
  feriaParams: FeriaParams | null;
  salesCounters: SalesCounters | null;
  loadFeriaData: () => void;
  saveFeriaParams: (params: Omit<FeriaParams, 'ventasCerradas'>) => void;
  updateSalesCount: (type: 'digital' | 'billete') => void;
  closeSales: () => void;
  resetFeria: () => void;
}

const FeriaContext = createContext<FeriaContextType | undefined>(undefined);

interface FeriaContextProviderProps {
  children: ReactNode;
}

export const FeriaContextProvider: React.FC<FeriaContextProviderProps> = ({ children }) => {
  const [feriaParams, setFeriaParams] = useState<FeriaParams | null>(null);
  const [salesCounters, setSalesCounters] = useState<SalesCounters | null>(null);

  const loadFeriaData = useCallback(() => {
    const loadedFeriaParams = localStorageService.getItem<FeriaParams>(FERIA_PARAMS_KEY);
    const loadedSalesCounters = localStorageService.getItem<SalesCounters>(SALES_COUNTERS_KEY);
    setFeriaParams(loadedFeriaParams);
    setSalesCounters(loadedSalesCounters || { digitalCount: 0, billeteCount: 0 });
  }, []);

  useEffect(() => {
    loadFeriaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  const saveFeriaParams = useCallback((params: Omit<FeriaParams, 'ventasCerradas'>) => {
    const newFeriaParams: FeriaParams = { ...params, ventasCerradas: false };
    localStorageService.setItem(FERIA_PARAMS_KEY, newFeriaParams);
    setFeriaParams(newFeriaParams);
    // Initialize sales counters if not already present
    const currentSales = localStorageService.getItem<SalesCounters>(SALES_COUNTERS_KEY);
    if (!currentSales) {
      const initialSales: SalesCounters = { digitalCount: 0, billeteCount: 0 };
      localStorageService.setItem(SALES_COUNTERS_KEY, initialSales);
      setSalesCounters(initialSales);
    }
  }, []);

  const updateSalesCount = useCallback((type: 'digital' | 'billete') => {
    setSalesCounters(prevCounters => {
      const updatedCounters = {
        digitalCount: prevCounters?.digitalCount || 0,
        billeteCount: prevCounters?.billeteCount || 0,
      };

      if (type === 'digital') {
        updatedCounters.digitalCount += 1;
      } else {
        updatedCounters.billeteCount += 1;
      }
      localStorageService.setItem(SALES_COUNTERS_KEY, updatedCounters);
      return updatedCounters;
    });
  }, []);

  const closeSales = useCallback(() => {
    if (feriaParams) {
      const updatedFeriaParams = { ...feriaParams, ventasCerradas: true };
      localStorageService.setItem(FERIA_PARAMS_KEY, updatedFeriaParams);
      setFeriaParams(updatedFeriaParams);
    }
  }, [feriaParams]);

  const resetFeria = useCallback(() => {
    if (window.confirm('¿Estás seguro de que quieres borrar todos los datos y reiniciar la feria? Esta acción no se puede deshacer.')) {
      localStorageService.removeItem(FERIA_PARAMS_KEY);
      localStorageService.removeItem(SALES_COUNTERS_KEY);
      setFeriaParams(null);
      setSalesCounters({ digitalCount: 0, billeteCount: 0 }); // Reset to initial empty state
      loadFeriaData(); // Re-load to ensure clean slate
    }
  }, [loadFeriaData]);

  return (
    <FeriaContext.Provider
      value={{ feriaParams, salesCounters, loadFeriaData, saveFeriaParams, updateSalesCount, closeSales, resetFeria }}
    >
      {children}
    </FeriaContext.Provider>
  );
};

export const useFeria = () => {
  const context = useContext(FeriaContext);
  if (context === undefined) {
    throw new Error('useFeria must be used within a FeriaContextProvider');
  }
  return context;
};
    