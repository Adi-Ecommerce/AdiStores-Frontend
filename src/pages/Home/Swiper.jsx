import React from "react";
import SwipeData from "./SwipeData";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const overlayVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, staggerChildren: 0.3 },
    },
};

const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

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

                            {/* Animated overlay */}
                            <motion.div
                                className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-6 text-white z-10 text-center px-4"
                                variants={overlayVariants}
                                initial="hidden"
                                animate="visible"
                                key={index} // <-- key is important so animation replays on slide change
                            >
                                <motion.h1
                                    className="text-xl md:text-4xl lg:text-6xl font-bold w-[90%] md:w-[70%] lg:w-[60%] leading-tight"
                                    variants={childVariants}
                                >
                                    Discover your Next Favourite Find
                                </motion.h1>

                                <motion.p
                                    className="text-base md:text-lg lg:text-xl font-medium max-w-2xl"
                                    variants={childVariants}
                                >
                                    Explore a curated collection of unique products and trending styles.
                                </motion.p>

                                <motion.div variants={childVariants}>
                                    <Link
                                        to="/products"
                                        className="px-6 py-2 rounded-3xl bg-[#636AE8] hover:bg-[#4f54c7] transition-colors text-sm md:text-base lg:text-lg font-medium"
                                    >
                                        Shop Now
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Swipe;
