import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login.jsx';
import { Navbar } from './components/Navbar.jsx';
import { PlannerAI } from './components/PlannerAI.jsx';
import { ProtectedRoutes } from './components/ProtectedRoutes.jsx';
import './assets/css/style.scss';

function App() {
  return (
    <div className="w-full min-h-screen h-auto relative overflow-x-hidden">
      <div className="stars absolute inset-0 -z-10">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="star"></div>
        ))}
      </div>
      <div className="w-[100vw] fixed top-0 left-0 z-50">
        <Navbar />
      </div>
      <div className="z-10 pt-24 w-screen h-screen flex justify-center">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoutes allowedRole="user" />}>
            <Route path="/plannerai" element={<div className="w-full h-full overflow-auto"><PlannerAI /></div>} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
