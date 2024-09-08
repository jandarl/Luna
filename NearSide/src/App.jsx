import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './Pages/LogIn/LogIn';
import AdminLayout from './Pages/Admin/AdminLayout';
import UserControl from './Pages/Admin/UserControl';
import CheckInventory from './Pages/Common/CheckInventory';
import ManageInventory from './Pages/Admin/ManageInventory';
import ItemSale from './Pages/User/ItemSale';
import UserLayout from './Pages/User/UserLayout';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LogInPage/>}/>
          <Route element={<AdminLayout />}>
              <Route path="/usrctrl" element={<UserControl />}/>
              <Route path="/checkinventory" element={<CheckInventory />}/>
              <Route path="/manageinventory" element={<ManageInventory />}/>
          </Route>
          <Route element={<UserLayout />}>
              <Route path="/userinventory" element={<CheckInventory />}/>
              <Route path="/itemsale" element={<ItemSale />}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
