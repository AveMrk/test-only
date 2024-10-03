
import Slider from "../components/Slider";
import SliderSmall from '../components/SliderSmall';
import data from "../data";
import { useState } from "react";
import { Event } from '../types';

export default function HomePage(){
  const [events, setEvents] = useState<Event[]>([])

  const handleChange = (events:Event[]) => {
    setEvents(events)
  }
  return (
    <>
      <Slider items={data} title='Исторические даты' onChange={handleChange}/>
      <SliderSmall items={events} />
      </>
  )
}