
import React from 'react';
import type { Page } from '../../types';
import DashboardIcon from '../icons/DashboardIcon';
import ClientsIcon from '../icons/ClientsIcon';
import OrdersIcon from '../icons/OrdersIcon';
import SettlementsIcon from '../icons/SettlementsIcon';
import ThemeToggle from '../ThemeToggle';
import { useAppData } from '../../hooks/useAppData';
import ImportIcon from '../icons/ImportIcon';
import ExportIcon from '../icons/ExportIcon';


interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  appData: ReturnType<typeof useAppData>;
}

const NavItem: React.FC<{
  page: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  icon: React.ReactNode;
  label: string;
}> = ({ page, currentPage, setCurrentPage, icon, label }) => (
  <button
    onClick={() => setCurrentPage(page)}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
      currentPage === page
        ? 'bg-primary text-primary-foreground'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isOpen, setIsOpen, appData }) => {
  const navItems = [
    { page: 'dashboard' as Page, icon: <DashboardIcon />, label: 'Dashboard' },
    { page: 'clients' as Page, icon: <ClientsIcon />, label: 'Klienci' },
    { page: 'orders' as Page, icon: <OrdersIcon />, label: 'Zamówienia' },
    { page: 'settlements' as Page, icon: <SettlementsIcon />, label: 'Rozliczenia' },
  ];
  
  const handleExport = () => {
    const dataToExport = {
        clients: appData.clients,
        orders: appData.orders,
        settlements: appData.settlements,
        monthlyDocuments: appData.monthlyDocuments,
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataToExport, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "b2b-rozliczenie-data.json";
    link.click();
    link.remove();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const text = e.target?.result;
            if (typeof text !== 'string') throw new Error("File could not be read");
            const importedData = JSON.parse(text);
            
            if (window.confirm("Czy na pewno chcesz nadpisać wszystkie istniejące dane? Ta operacja jest nieodwracalna.")) {
                const success = appData.replaceData(importedData);
                if (success) {
                    alert("Dane zostały pomyślnie zaimportowane.");
                    window.location.reload(); // Reload to reflect changes everywhere
                } else {
                    alert("Błąd: Plik ma nieprawidłową strukturę lub jest uszkodzony.");
                }
            }
        } catch (error) {
            alert("Błąd podczas importowania pliku. Upewnij się, że plik jest poprawnym plikiem JSON.");
            console.error("Import error:", error);
        } finally {
            event.target.value = '';
        }
    };
    reader.readAsText(file);
  };
  
  const triggerImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = (e) => handleImport(e as unknown as React.ChangeEvent<HTMLInputElement>);
    input.click();
    input.remove();
  };


  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center p-6 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-2xl font-bold text-primary dark:text-white">Time<span className="text-blue-500">Sheet</span></h1>
          </div>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.page}
              page={item.page}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-2 mb-4">
                <button onClick={triggerImport} className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <ImportIcon />
                    <span className="ml-3">Importuj Dane</span>
                </button>
                <button onClick={handleExport} className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <ExportIcon />
                    <span className="ml-3">Eksportuj Dane</span>
                </button>
            </div>
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;