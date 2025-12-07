
import { FeriaConfig, SaleRecord } from '../types';
import { LOCAL_STORAGE_KEYS } from '../constants';

export const localStorageService = {
  saveFeriaConfig: (config: FeriaConfig) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.FERIA_CONFIG, JSON.stringify(config));
    } catch (e) {
      console.error('Error saving feria config to localStorage', e);
    }
  },

  loadFeriaConfig: (): FeriaConfig | null => {
    try {
      const configString = localStorage.getItem(LOCAL_STORAGE_KEYS.FERIA_CONFIG);
      return configString ? (JSON.parse(configString) as FeriaConfig) : null;
    } catch (e) {
      console.error('Error loading feria config from localStorage', e);
      return null;
    }
  },

  saveSales: (sales: SaleRecord[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.SALES_DATA, JSON.stringify(sales));
    } catch (e) {
      console.error('Error saving sales data to localStorage', e);
    }
  },

  loadSales: (): SaleRecord[] => {
    try {
      const salesString = localStorage.getItem(LOCAL_STORAGE_KEYS.SALES_DATA);
      return salesString ? (JSON.parse(salesString) as SaleRecord[]) : [];
    } catch (e) {
      console.error('Error loading sales data from localStorage', e);
      return [];
    }
  },

  clearSales: () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.SALES_DATA);
    } catch (e) {
      console.error('Error clearing sales data from localStorage', e);
    }
  },
};
