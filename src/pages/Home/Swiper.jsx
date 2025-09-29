import React from "react";
import SwipeData from "./SwipeData";
import { Link } from "react-router-dom";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Swipe() {
    return (
        <div className="h-[300px] md:h-[400px] lg:h-[600px] relative">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                className="h-full w-full"
            >
                {SwipeData.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-full w-full">
                            <img
                                src={item.img}
                                alt={item.alt}
                                className="w-full h-full object-fit object-center"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Overlay content */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-10 text-white z-10">
                <h1 className="text-xl md:text-4xl lg:text-6xl/16 w-[60%] text-center font-bold">
                    Discover your Next Favourite Find
                </h1>
                <p className="text-base md:text-lg lg:text-xl font-medium">
                    Explore a curated collection of unique products and trending styles.
                </p>
                <Link
                    to="/shop"
                    className="border border-gray-400 p-2 flex items-center justify-center rounded-3xl w-35 text-sm md:text-base lg:text-lg font-medium bg-[#636AE8FF]"
                >
                    Shop Now
                </Link>
            </div>
        </div>
    );
}

export default Swipe;
