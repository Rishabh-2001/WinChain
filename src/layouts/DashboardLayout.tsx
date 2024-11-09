import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BackgroundElements from '../components/BackgroundElements';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <BackgroundElements />
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="w-4xl mx-auto relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;