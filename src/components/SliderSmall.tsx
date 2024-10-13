
import { useState } from "react";
// модули
import { Navigation} from "swiper/modules";
// компоненты
import { Swiper, SwiperSlide } from "swiper/react";
import {  Event } from "../types";

type Props = {
  items: Event[]
}
function SliderSmall({items}:Props){
  return(
    <>
    <Swiper
    modules={[Navigation]}
    allowTouchMove={false}
    slideToClickedSlide={true}
    watchSlidesProgress={true}
    slidesPerView={3}
    spaceBetween={80}
    centeredSlides={false}
    loop={false}
    autoplay={false}
    navigation={true}
    className="swiper-events"
    breakpoints={{
      0: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 80
      },}
    }
    >
    {items.map((el:Event, index:number) => (
      <SwiperSlide key={el.id} virtualIndex={index}>
          <>
            <div className="event-year">{el.year}</div>
            <div className="event-text">{el.text}</div>
            
          </>
      
      </SwiperSlide>
    ))}
    </Swiper>
    </>
  )
}
export default SliderSmall;