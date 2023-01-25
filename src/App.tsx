import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getCurrentUser } from './services/auth.service';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import User from './types/user.type';


export


function App() {

  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  return (
    <div className="App">
      <div className='contain mt-3'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout user={user}/>}>
              <Route path="home" element={<HomePage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="logout" element={<LogoutPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
