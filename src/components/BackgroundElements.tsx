import React from 'react';
import { Hash, Dice5, Sword, Shield, Coins, Wallet } from 'lucide-react';

const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/50 to-purple-900/30" />
      
      {/* Animated Gaming Icons */}
      <div className="absolute top-20 left-10 text-blue-500/20 animate-float">
        <Hash className="w-16 h-16" />
      </div>
      <div className="absolute top-40 right-20 text-purple-500/20 animate-float animation-delay-2000">
        <Dice5 className="w-24 h-24" />
      </div>
      <div className="absolute bottom-20 left-1/4 text-green-500/20 animate-float animation-delay-4000">
        <Sword className="w-20 h-20" />
      </div>
      <div className="absolute top-1/3 right-1/4 text-yellow-500/20 animate-float">
        <Shield className="w-16 h-16" />
      </div>
      
      {/* Web3 Elements */}
      <div className="absolute bottom-40 right-10 text-blue-500/20 animate-float animation-delay-2000">
        <Wallet className="w-20 h-20" />
      </div>
      <div className="absolute top-1/2 left-20 text-purple-500/20 animate-float animation-delay-4000">
        <Coins className="w-16 h-16" />
      </div>

      {/* Decorative Lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500/10" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export default BackgroundElements;