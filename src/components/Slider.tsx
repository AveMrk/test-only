
import {  useState } from "react";
// модули
import gsap from 'gsap';
import { Navigation, Pagination } from "swiper/modules";
// компоненты
import { Swiper, SwiperSlide } from "swiper/react";
import { Slides, SlideType, Event } from "../types";

function getRadians (degrees:number):number {
  return degrees * Math.PI / 180;
};






type Props = {
  items: Slides;
  title: string;
  onChange: (events:Event[])=>void;
}

function Slider({items, title, onChange}:Props){
  const [offsetAngle, setoffsetAngle] = useState(0);
  const [yearStart, setYearStart] = useState(0);
  const [yearEnd, setYearEnd] = useState(0);
  const [isShown, setIsShown] = useState(0);
  function setPosition  (slidesDom:NodeList) {
    var slideSize = (slidesDom[1] as HTMLElement).getBoundingClientRect().width;

    slidesDom.forEach((el, i:number) => {
      var angle = (360 / items.length) * (items.length - ++i) + offsetAngle;
      console.log(angle, i)

      let transformY = Math.sin(getRadians(angle)) * 265 - slideSize / 2 + "px";
      let transformX = Math.cos(getRadians(angle)) * 265 - slideSize / 2 + "px";
      //(el as HTMLElement).style.cssText += `transform: translate3d(${transformX}, ${transformY}, 0); `;
      gsap.to(`.swiper-slide[data-swiper-slide-index="${i-1}"]`, {x: transformX, y: transformY});
      gsap.to(`.swiper-slide[data-swiper-slide-index="${i-1}"]`, {opacity: 1});
     // 
    }); 
  }

  function rotate  (slidesDom:NodeList, container:Element) {
    slidesDom = container!.querySelectorAll('.swiper-slide');

    setoffsetAngle(offsetAngle + 360 / items.length);
    if (offsetAngle > 360)
      setoffsetAngle(offsetAngle - 360);

    setPosition(slidesDom);
  }
  const handleInit = ():void => {
      var swiper = document.querySelector('.swiper'),
        container = swiper!.querySelector('.swiper-wrapper'),
        slidesDom = container!.querySelectorAll('.swiper-slide'),
        carouselBoundingRect = swiper!.getBoundingClientRect().width;

        setPosition(slidesDom);
        if(container !== null) {
          rotate(slidesDom, container);
          
        }

        onChange(items[0].events);
        setYearStart(items[0].events[0].year)
        
        let length = items[0].events.length - 1;
        let yearEndNew = items[0].events[length].year;
        setYearEnd(yearEndNew) 
  }
  const handleNextTransitionStart = (swiper:any):void  => {
      let slidesDom = swiper.el.querySelectorAll('.swiper-slide'),
      container = swiper!.el.querySelector('.swiper-wrapper');

      slidesDom.forEach((el:HTMLElement, i: number):void => {
        let activeSlide = swiper.activeIndex;
        onChange(items[activeSlide].events);
        let yearStartNew =items[activeSlide].events[0].year;
        setYearStart(yearStartNew)
        let length = items[activeSlide].events.length - 1;
        let yearEndNew = items[activeSlide].events[length].year;
        setYearEnd(yearEndNew);
        setPosition(slidesDom);
        rotate(slidesDom, container);
      })
      
  }
  const handlePrevTransitionStart = (swiper:any):void => {
      setoffsetAngle(0)
      let slidesDom = swiper.el.querySelectorAll('.swiper-slide'),
      container = swiper!.el.querySelector('.swiper-wrapper');

      slidesDom.forEach((el:HTMLElement, i: number):void => {
        let activeSlide = swiper.activeIndex;
        onChange(items[activeSlide].events);
        let yearStartNew =items[activeSlide].events[0].year;
        setYearStart(yearStartNew)
        let length = items[activeSlide].events.length - 1;
        let yearEndNew = items[activeSlide].events[length].year;
        setYearEnd(yearEndNew)
        setPosition(slidesDom);
        rotate(slidesDom, container);
      })
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
    centeredSlides={false}
    loop={false}
    // loopedSlides: 5,
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
    className="swiper-circle"
    onInit={handleInit}
    onSlideNextTransitionStart={handleNextTransitionStart}
    onSlidePrevTransitionStart={handlePrevTransitionStart}
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