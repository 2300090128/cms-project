import React, { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="sticky top-0 z-50 bg-gray-800 shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <h1 className="text-xl font-bold">Club Activity Portal</h1>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;