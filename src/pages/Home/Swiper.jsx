import React from 'react'
import img1 from "../../assets/Whisk_b5e39e0a2227109bd554c207f9064dc3dr (1).jpeg";
import img2 from "../../assets/Selection.png";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
function Swipe() {
  return (
      <div className="h-[400px] md:h-[500px] lg:h-[600px] border border-white">
          <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              className="h-full w-full"
          >
              {/* Slide 1 */}
              <SwiperSlide>
                  <div className="relative h-full w-full">
                      <img
                          src={img1}
                          alt="Slide 1"
                          className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <h1 className="text-xl md:text-4xl lg:text-5xl text-white font-bold">
                              First Slide
                          </h1>
                      </div>
                  </div>
              </SwiperSlide>

              {/* Slide 2 */}
              <SwiperSlide>
                  <div className="relative h-full w-full">
                      <img
                          src={img2}
                          alt="Slide 2"
                          className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <h1 className="text-xl md:text-4xl lg:text-5xl text-white font-bold">
                              Second Slide
                          </h1>
                      </div>
                  </div>
              </SwiperSlide>
          </Swiper>
      </div>
  )
}

export default Swipe
