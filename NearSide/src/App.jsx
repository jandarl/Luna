import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './Pages/LogIn/LogIn';
import AdminLayout from './Pages/Admin/AdminLayout';
import UserControl from './Pages/Admin/UserControl';
import ManageInventory from './Pages/Admin/ManageInventory';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LogInPage/>}/>
          <Route element={<AdminLayout />}>
              <Route path="/usrctrl" element={<UserControl />}/>
              <Route path="/manageinventory" element={<ManageInventory />}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
