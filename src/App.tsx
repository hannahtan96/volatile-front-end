import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';

function App() {

  // const signUp = (formData: formDataProps) => {
  //   axios
  //     .get(`${BACKEND_URL}/signup`, formData)
  //     .then((response) => {
  //       console.log(response.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }


  return (
    <div className="App">

      <div className='contain mt-3'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;
