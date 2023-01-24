import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import NavigationBar from './components/NavigationBar';
import SignUpForm from './components/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/Register';


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
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
