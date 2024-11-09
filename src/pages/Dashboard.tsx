import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import GameCards from '../components/GameCards';
import HeroSection from '../components/HeroSection';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <HeroSection />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <GameCards />
    </div>
  );
};

export default Dashboard;