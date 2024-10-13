
import {  useState } from "react";
// модули
import gsap from 'gsap';
import { Navigation, Pagination } from "swiper/modules";
// компоненты
import { Swiper, SwiperSlide } from "swiper/react";
import { Slides, SlideType, Event, Position } from "../types";
import { Value } from "sass";

function getRadians (degrees:number):number {
  return degrees * Math.PI / 180;
};






type Props = {
  items: Slides;
  title: string;
  onChange: (events:Event[])=>void;
  className: string;
}

function Slider({items, title, onChange, className}:Props){
  const [yearStart, setYearStart] = useState(0);
  const [yearEnd, setYearEnd] = useState(0);
  
  const offsetAngle = 0;

  function calcPositions  (slidesDom:NodeList) {
    const slideSize = 56;

    let positions:Position[] = [];

    slidesDom.forEach((el, i:number) => {
      var angle = (360 / items.length) * (items.length - ++i) + offsetAngle;

      let transformY = Math.sin(getRadians(angle)) * 265 - slideSize / 2 + "px";
      let transformX = Math.cos(getRadians(angle)) * 265 - slideSize / 2 + "px";

      positions.push({x: transformX, y: transformY})
    }); 
    return positions;
  }

  const handleTransition = (swiper:any):void => {
    let slidesDom = swiper.el.querySelectorAll('.swiper-slide');
      const positions = calcPositions(slidesDom);
      console.log(positions);

      let activeSlide = swiper.activeIndex;
      let left = Array.from(slidesDom).slice(activeSlide, slidesDom.length);
      let right = Array.from(slidesDom).slice(0, activeSlide);
      slidesDom =  [...left, ...right];

      slidesDom.forEach((el:Element, i:number) => {
        gsap.to(el, {x: positions[i].x, y:positions[i].y});
        gsap.to(el, {opacity: 1});
      });

      onChange(items[activeSlide].events)
      
      let length = items[activeSlide].events.length - 1;
      let yearEndNew = items[activeSlide].events[length].year;
      setYearStart(items[activeSlide].events[0].year);
      setYearEnd(yearEndNew) 
  }
  return(
    <>
    <h1 className="swiper-title">{title}</h1>

    <Swiper
    modules={[Pagination, Navigation]}
    allowTouchMove={false}
    slideToClickedSlide={true}
    watchSlidesProgress={true}
    slidesPerView='auto'
    centeredSlides={true}
    loop={false}
    autoplay={false}
    pagination={{
      type: 'fraction',
      formatFractionCurrent: function(i:number){
        return '0'+i;
      },
      formatFractionTotal: function(i:number){
        return '0'+i;
      },
    }}
    navigation={true}
    className={className}
    onInit={handleTransition}
    onSlideNextTransitionStart={handleTransition}
    onSlidePrevTransitionStart={handleTransition}
    >
       
            
    {items.map((el:SlideType, index:number) => (
      
     
      <SwiperSlide key={el.id} virtualIndex={index}  >
      <>
      <div className="num">
        <div className="num-count">
          {//(isShown === index) && 
          index+1
          }
          
        </div>
      </div>
      <div className="name">{el.name}</div>
      </>
  </SwiperSlide>
    ))}
      <div className="range-years">
              <div className="range-year range-year--start">{yearStart}</div>
              <div className="range-year range-year--end">{yearEnd}</div>
            </div> 
    </Swiper>
    </>
  )
}
export default Slider;