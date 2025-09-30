import React from "react";
import { motion } from "framer-motion";
import SwipeData from "./SwipeData.js";
import Headings from "../../components/common/Heading";

function TopCats() {
    return (
        <div className="flex flex-col gap-10 items-center py-10 bg-gray-200">
            <Headings title={`Explore Top Categories`} />
            <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 w-[90%] mx-auto">
                {SwipeData.filter(item => item.summary).map((icon, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center justify-center gap-3 text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <img
                            src={icon.img}
                            alt={icon.summary}
                            className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover object-center shadow-md"
                        />
                        <p className="text-sm sm:text-base md:text-lg font-medium">
                            {icon.summary}
                        </p>
                    </motion.div>
                ))}
            </main>
        </div>
    );
}

export default TopCats;
