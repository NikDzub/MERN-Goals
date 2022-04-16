import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

import Header from './pages/components/Header';
import Footer from './pages/components/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header></Header>
          <Routes>
            <Route path="/" element={<Dashboard></Dashboard>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
