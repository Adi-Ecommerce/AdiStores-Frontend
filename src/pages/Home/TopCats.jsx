import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Headings from "../../components/common/Heading";
import AuthContext from "../../context/AuthContext.jsx";

function TopCats() {
    const BackendURL = import.meta.env.VITE_BACKEND_URL;
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const { setSelectedCategories } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BackendURL}/api/Category`);
                const allCategories = response.data;

                const today = new Date().toISOString().split("T")[0];
                const stored = JSON.parse(localStorage.getItem("dailyCategories"));

                if (stored && stored.date === today) {
                    setCategories(stored.categories);
                    return;
                }

                const seededRandom = (seed) => {
                    let x = Math.sin(seed++) * 10000;
                    return x - Math.floor(x);
                };

                const seed = parseInt(today.replace(/-/g, ""), 10);
                const shuffled = [...allCategories].sort(
                    () => 0.5 - seededRandom(seed)
                );

                const selected = shuffled.slice(0, 8);
                setCategories(selected);

                localStorage.setItem(
                    "dailyCategories",
                    JSON.stringify({ date: today, categories: selected })
                );
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [BackendURL]);

    return (
        <div className="flex flex-col gap-10 items-center py-10 bg-gray-100 dark:bg-gray-900">
            <Headings title="Explore Top Categories" />
            <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 w-[90%] max-w-7xl mx-auto">
                {categories.map((icon, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center justify-center gap-3 text-center cursor-pointer"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        viewport={{ once: true, amount: 0.2 }}
                        whileHover={{
                            scale: 1.08,
                            y: -6,
                            transition: { type: "spring", stiffness: 300 },
                        }}
                        onClick={() => {
                            setSelectedCategories([icon.id]);
                            navigate("/products");
                        }}
                    >
                        <motion.img
                            src={`${icon.image}&fm=jpg`}
                            alt={icon.description || icon.name}
                            className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-300/40 dark:hover:shadow-blue-500/30"
                        />
                        <motion.p
                            className="text-sm sm:text-base md:text-lg font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300"
                            whileHover={{ color: "#3b82f6" }} // Tailwind blue-500
                        >
                            {icon.name}
                        </motion.p>
                    </motion.div>
                ))}
            </main>
        </div>
    );
}

export default TopCats;
