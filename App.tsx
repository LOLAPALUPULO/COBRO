
import React from 'react';
import { AuthContextProvider, useAuth } from './contexts/AuthContext';
import { FeriaContextProvider } from './contexts/FeriaContext';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import SellerPad from './components/SellerPad';

const AppContent: React.FC = () => {
  const { userLevel, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white shadow-md flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-2xl font-bold">PWA Feria Ventas</h1>
        {userLevel && (
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200 ease-in-out text-sm"
          >
            Cerrar Sesión ({userLevel === 'admin' ? 'Administrador' : 'Vendedor'})
          </button>
        )}
      </header>
      <main className="flex-grow p-4 sm:p-6 md:p-8 flex items-center justify-center">
        {userLevel === null && <LoginForm />}
        {userLevel === 'admin' && <AdminDashboard />}
        {userLevel === 'seller' && <SellerPad />}
      </main>
      <footer className="bg-gray-200 p-3 text-center text-gray-600 text-sm sticky bottom-0 z-10">
        © {new Date().getFullYear()} PWA Feria Ventas
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <FeriaContextProvider>
        <AppContent />
      </FeriaContextProvider>
    </AuthContextProvider>
  );
};

export default App;
    