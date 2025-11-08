import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            onClick={closeMobileMenu}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span>RUBIX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                {user.isAdmin && (
                  <Link 
                    to="/admin" 
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    Admin Panel
                  </Link>
                )}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors font-medium"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
                {user.isAdmin && (
                  <Link 
                    to="/admin" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors font-medium"
                    onClick={closeMobileMenu}
                  >
                    Admin Panel
                  </Link>
                )}
                <div className="px-3 py-2 text-gray-700 font-medium border-t mt-2 pt-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="w-4 h-4" />
                    <span>{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors w-full justify-center"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors font-medium"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-center mx-3"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;