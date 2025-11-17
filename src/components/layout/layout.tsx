import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { Overlay } from "./overlay";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleOverlayClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header onMenuClick={handleMenuClick} />
      
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
      
      {/* Overlay */}
      <Overlay visible={sidebarOpen} onClick={handleOverlayClick} />
      
      {/* Conteúdo Principal */}
      <main className="pt-16"> {/* pt-16 para compensar o header fixo */}
        {children}
      </main>
    </div>
  );
}