import { useSwiper } from "swiper/react";
 
const SwiperNavBtn = () => {
  const swiper = useSwiper();
  return (
    <div className="flex justify-between -translate-y-[10rem] w-full z-[9999]">
      <button
        onClick={() => swiper.slidePrev()}
        className="flex items-center justify-center p-2 w-12 h-12 rounded-full bg-[rgb(0,0,0,0.6)] z-[9999]"
      >
        <img src="/images/arrow-prev.svg" className="text-white w-5 h-5" alt=""/>
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="flex items-center justify-center p-2 w-12 h-12 rounded-full bg-[rgb(0,0,0,0.6)] z-[10]"
      >
         <img src="/images/arrow-next.svg" className="text-white fill-white w-5 h-5" alt=""/>
      </button>
    </div>
  );
};

export default SwiperNavBtn;