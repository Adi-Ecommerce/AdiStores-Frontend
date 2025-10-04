import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button } from "../../components/ui/button.jsx";
import ProductList from "./ProductList.jsx";
import axios from "axios";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import PriceRangeSlider from './Slider.jsx';

function Product() {
    const BackendURL = import.meta.env.VITE_BACKEND_URL;
    const [categories, setCategories] = useState([]);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BackendURL}/api/Category`);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen border-t border-gray-200">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden p-3 border-b border-gray-300 bg-gray-50">
                <button
                    className="flex items-center justify-between w-full p-2 bg-gray-100 rounded-md text-gray-700 font-semibold"
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                    <div className="flex items-center gap-2">
                        <FilterAltIcon />
                        <span>Filters</span>
                    </div>
                    <span>{mobileFiltersOpen ? "▲" : "▼"}</span>
                </button>

                {mobileFiltersOpen && (
                    <div className="mt-2">
                        <Accordion type="single" collapsible className="flex flex-col gap-3">
                            {/* Categories */}
                            <AccordionItem value="category" className="border-none">
                                <AccordionTrigger className="text-base font-medium bg-white hover:bg-gray-100 rounded-md px-2 py-2 transition border border-gray-300">
                                    Categories
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-2 px-3 py-2">
                                    {categories.length > 0 ? (
                                        categories.map((category, index) => (
                                            <label
                                                key={index}
                                                className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer"
                                            >
                                                <input type="checkbox" className="accent-blue-500" />
                                                {category.name}
                                            </label>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">No categories found.</p>
                                    )}
                                </AccordionContent>
                            </AccordionItem>

                            {/* Price */}
                            <AccordionItem value="price" className="border-none flex flex-col gap-5">
                                <AccordionTrigger className="text-base font-medium bg-white hover:bg-gray-100 rounded-md px-2 py-2 transition border border-gray-300">
                                    Price Range
                                </AccordionTrigger>
                                <AccordionContent>
                                    <PriceRangeSlider />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )}
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-1/5 border-r border-gray-300 p-5 flex-col gap-6 bg-gray-50">
                <div className="flex gap-2 items-center border-b pb-2">
                    <FilterAltIcon className="text-gray-600" />
                    <p className="text-lg font-semibold text-gray-700">Filters</p>
                </div>

                <Accordion type="single" collapsible className="w-full flex flex-col gap-3">
                    <AccordionItem value="category" className="border-none overflow-y-auto max-h-[70vh]">
                        <AccordionTrigger className="text-base font-medium bg-white hover:bg-gray-100 rounded-md px-2 py-2 transition border border-gray-300">
                            Categories
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2 px-3 py-2">
                            {categories.length > 0 ? (
                                categories.map((category, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer"
                                    >
                                        <input type="checkbox" className="accent-blue-500" />
                                        {category.name}
                                    </label>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No categories found.</p>
                            )}
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="price" className="border-none flex flex-col gap-5">
                        <AccordionTrigger className="text-base font-medium bg-white hover:bg-gray-100 rounded-md px-2 py-2 transition border border-gray-300">
                            Price Range
                        </AccordionTrigger>
                        <AccordionContent>
                            <PriceRangeSlider />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-5 bg-white">
                <h2 className="text-2xl font-semibold mb-5">All Products</h2>
                <ProductList />
            </main>
        </div>
    );
}

export default Product;
