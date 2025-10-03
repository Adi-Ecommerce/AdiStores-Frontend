import React from "react";
import SwipeData from "./SwipeData";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import {Typewriter} from "react-simple-typewriter";

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
                className="h-full w-full"
            >
                {SwipeData.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-full w-full">
                            <img
                                src={item.img}
                                alt={item.alt}
                                className="w-full h-full object-cover lg:object-fit object-center"
                            />

                            {/* Animated overlay */}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-black/50 lg:from-black/100 via-black/50 to-transparent flex flex-col items-start justify-center gap-10 text-white z-10 px-5 lg:px-20"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                 // <-- key is important so animation replays on slide change
            >
                <motion.h1
                    className="text-xl md:text-4xl lg:text-7xl font-normal w-[90%] md:w-[70%] lg:w-[60%] leading-tight"
                    variants={childVariants}
                >
                    New Season Collection
                </motion.h1>

                <motion.p
                    className="text-base md:text-lg lg:text-3xl font-normal max-w-2xl"
                    variants={childVariants}
                >
                    <Typewriter words={['Explore the latest trends in fashion and accessories, crafted for style\n' +
                    '                    and comfort. Discover your next favorite piece.','Explore a curated collection of unique products and trending styles.', 'Explore our new collection featuring fresh styles and timeless pieces. Shop now and elevate your wardrobe.','Elevate your style with our exclusive seasonal range. Discover fashion-forward pieces and timeless essentials for every occasion.']}
                    loop={0}
                    typeSpeed={30}
                    deleteSpeed={5}/>


                </motion.p>

                <motion.div variants={childVariants}>
                    <Link
                        to="/products"
                        className="px-6 py-3 rounded-lg bg-[#636AE8] hover:bg-[#4f54c7] transition-colors text-sm md:text-base lg:text-lg font-medium"
                    >
                        Discover More!
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Swipe;
