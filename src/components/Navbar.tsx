import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User, X } from 'lucide-react';
import WalletButton from './WalletButton';
import WalletBalance from './WalletBalance';
import TokenClaim from './TokenClaim';

const Navbar = () => {
  const location = useLocation();
  const [userAccount, setUserAccount] = useState('');
  const [connected, setConnected] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNewUser,setIsNewUser] = useState(false)
  const [balance, setBalance] = useState<string>('0');


  return (
    <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <button 
              className="p-1 text-gray-400 hover:text-white lg:hidden transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors duration-200">
              GameHub
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <Link 
              to="/tic-tac-toe" 
              className={`px-4 py-2 rounded-lg transition-colors duration-200
                ${location.pathname === '/tic-tac-toe' 
                  ? 'text-blue-400 bg-blue-500/10' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              Games
            </Link>
            
            <div className="flex items-center gap-4">
              {connected ? (
                <>
                  <WalletBalance connected={connected} userAccount={userAccount} setIsNewUser={setIsNewUser} balance={balance} setBalance={setBalance} />
                  {isNewUser && <TokenClaim connected={connected} userAccount={userAccount} setBalance={setBalance} /> }
                </>
              ) : (
                <WalletButton setConnected={setConnected} setUserAccount={setUserAccount} />
              )}
              
              <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all duration-200">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden border-t border-gray-800 overflow-hidden transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-2 py-3 space-y-3">
            <Link
              to="/tic-tac-toe"
              className={`block px-4 py-2 rounded-lg transition-colors duration-200
                ${location.pathname === '/tic-tac-toe'
                  ? 'text-blue-400 bg-blue-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              Games
            </Link>

            <div className="px-4 py-2 space-y-3">
              {connected ? (
                <>
                  <WalletBalance connected={connected} userAccount={userAccount} setIsNewUser={setIsNewUser} balance={balance} setBalance={setBalance} />
                {isNewUser  &&  <TokenClaim connected={connected} userAccount={userAccount} isNewUser={isNewUser} setBalance={setBalance} />}
                </>
              ) : (
                <WalletButton setConnected={setConnected} setUserAccount={setUserAccount} />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;