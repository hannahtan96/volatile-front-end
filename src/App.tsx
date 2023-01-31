// import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { getCurrentUser } from './services/auth.service';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import ScorePage from './pages/ScorePage'
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import PortfolioPage from './pages/PortfolioPage';


function App() {

  // const [user, setUser] = useState<User|null>(null);

  // useEffect(() => {
  //   setUser(getCurrentUser())
  // }, [])

  return (
    <div className="App">
      <div className='contain mt-3'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="home" element={<HomePage />} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="score" element={<ScorePage />} />
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
