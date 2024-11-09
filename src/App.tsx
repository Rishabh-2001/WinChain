import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import GamingLobby from './pages/GamingLobby';
import GameRoom from './pages/GameRoom';
import Wallet from './pages/Wallet';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="games/:gameId" element={<GamingLobby />} />
          <Route path="games/:gameId/room/:roomId" element={<GameRoom />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;