import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button className="p-1 text-gray-400 hover:text-white">
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
              GameHub
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/tic-tac-toe" 
              className={`px-4 py-2 ${location.pathname === '/tic-tac-toe' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
            >
              Games
            </Link>
            <Link 
              to="/wallet" 
              className={`px-4 py-2 ${location.pathname === '/wallet' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
            >
              Wallet
            </Link>
            <button className="p-1 text-gray-400 hover:text-white">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;