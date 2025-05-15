import React, { useState } from "react";
import { Clock, History as HistoryIcon, Menu, X } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
  currentPage: "home" | "history";
  onChangePage: (page: "home" | "history") => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  currentPage,
  onChangePage,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handlePageChange = (page: "home" | "history") => {
    onChangePage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Clock size={28} className="mr-2" />
              <h1 className="text-xl font-bold">Timer Master</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li>
                  <button
                    onClick={() => handlePageChange("home")}
                    className={`flex items-center py-2 ${
                      currentPage === "home"
                        ? "text-white font-semibold"
                        : "text-blue-200 hover:text-white"
                    }`}
                  >
                    <Clock size={18} className="mr-1" />
                    Timers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePageChange("history")}
                    className={`flex items-center py-2 ${
                      currentPage === "history"
                        ? "text-white font-semibold"
                        : "text-blue-200 hover:text-white"
                    }`}
                  >
                    <HistoryIcon size={18} className="mr-1" />
                    History
                  </button>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="mt-4 md:hidden">
              <ul className="py-2">
                <li className="mb-2">
                  <button
                    onClick={() => handlePageChange("home")}
                    className={`w-full text-left px-3 py-2 rounded ${
                      currentPage === "home"
                        ? "bg-blue-700 text-white font-semibold"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    } flex items-center`}
                  >
                    <Clock size={18} className="mr-2" />
                    Timers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePageChange("history")}
                    className={`w-full text-left px-3 py-2 rounded ${
                      currentPage === "history"
                        ? "bg-blue-700 text-white font-semibold"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    } flex items-center`}
                  >
                    <HistoryIcon size={18} className="mr-2" />
                    History
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>

      {/* Footer */}
      <footer className="bg-blue-800 text-blue-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>Timer Master © {new Date().getFullYear()} - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
