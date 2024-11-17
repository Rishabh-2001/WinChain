import React from 'react';
import { Gamepad2, Wallet } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="text-center mt-12 mb-16 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="flex justify-center gap-4 mb-6">
          <Gamepad2 className="w-12 h-12 text-blue-400 animate-float" />
          <Wallet className="w-12 h-12 text-purple-400 animate-float animation-delay-2000" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Play & Earn
          </span>
          <br />
          Next-Gen Web3 Gaming Platform
        </h1>
        
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Experience the future of gaming with Web3 integration.
          Play classic games, connect your wallet, and join the blockchain gaming revolution.
        </p>

        <div className="mt-8 flex justify-center gap-4 text-sm">
          <div className="px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <span className="text-blue-400">10K+</span>
            <p className="text-gray-400">Active Players</p>
          </div>
          <div className="px-4 py-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <span className="text-purple-400">5K+</span>
            <p className="text-gray-400">NFTs Minted</p>
          </div>
          <div className="px-4 py-2 bg-pink-500/10 rounded-lg border border-pink-500/20">
            <span className="text-pink-400">100K+</span>
            <p className="text-gray-400">Transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;