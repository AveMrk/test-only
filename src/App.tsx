import React from 'react';
import './App.scss';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage';
function App() {
 
  
    return (
      <>
      
        <div className="container">
          <div className="swiper-container">
          <Routes>
            <Route path="/"  element={<HomePage />} />
          </Routes>
          </div>
        </div>
      </>
  );
}

export default App;
