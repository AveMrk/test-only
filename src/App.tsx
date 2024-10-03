import React from 'react';
import './App.css';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slider from "./components/Slider";
import SliderSmall from './components/SliderSmall';
import { Event } from './types';
import data from "./data";
import { useState } from "react";

function App() {
  const [events, setEvents] = useState<Event[]>([])

  const handleChange = (events:Event[]) => {
    setEvents(events)
  }
  
    return (
      <>
        <div className="container">
          <div className="swiper-container">
            <Slider items={data} title='Исторические даты' onChange={handleChange}/>
            <SliderSmall items={events} />
            
          </div>
        </div>
      </>
  );
}

export default App;
