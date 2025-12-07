
import React, { useState, useEffect, useCallback } from 'react';
import { UserRole } from './types';
import { AuthScreen } from './components/AuthScreen';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { SalesTPV } from './components/Sales/SalesTPV';
import { LOCAL_STORAGE_KEYS } from './constants';
import { FeriaConfig, SaleRecord } from './types';
import { localStorageService } from './services/localStorageService';

function App() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [feriaConfig, setFeriaConfig] = useState<FeriaConfig | null>(null);
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load initial data from localStorage
  useEffect(() => {
    const storedConfig = localStorageService.loadFeriaConfig();
    const storedSales = localStorageService.loadSales();
    setFeriaConfig(storedConfig);
    setSales(storedSales);
    setLoading(false);
  }, []);

  // Update localStorage whenever feriaConfig changes
  useEffect(() => {
    if (feriaConfig) {
      localStorageService.saveFeriaConfig(feriaConfig);
    }
  }, [feriaConfig]);

  // Update localStorage whenever sales change
  useEffect(() => {
    localStorageService.saveSales(sales);
  }, [sales]);

  const handleLogin = useCallback((role: UserRole) => {
    setUserRole(role);
  }, []);

  const handleLogout = useCallback(() => {
    setUserRole(null);
  }, []);

  const handleUpdateFeriaConfig = useCallback((config: FeriaConfig) => {
    setFeriaConfig(config);
  }, []);

  const handleAddSale = useCallback((newSale: SaleRecord) => {
    setSales((prevSales) => [...prevSales, newSale]);
  }, []);

  const handleClearSales = useCallback(() => {
    setSales([]);
    localStorageService.clearSales();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-lightbg dark:bg-darkbg text-textdark dark:text-textlight">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl p-6 bg-white dark:bg-gray-700 shadow-lg rounded-xl">
      {!userRole ? (
        <AuthScreen onLogin={handleLogin} />
      ) : userRole === 'admin' ? (
        <AdminDashboard
          feriaConfig={feriaConfig}
          sales={sales}
          onUpdateFeriaConfig={handleUpdateFeriaConfig}
          onClearSales={handleClearSales}
          onLogout={handleLogout}
        />
      ) : (
        <SalesTPV
          feriaConfig={feriaConfig}
          onAddSale={handleAddSale}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
