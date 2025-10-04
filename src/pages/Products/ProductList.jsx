import React, { useState, useEffect, useRef } from "react";
import { Button } from "../../components/ui/button";
import axios from "axios";
import Loader from "../../components/kokonutui/loader.jsx";

function ProductList() {
    const BackendURL = import.meta.env.VITE_BACKEND_URL;
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const productsPerPage = 20;

    const gridRef = useRef(null); // ref for the product grid

    // Fetch and shuffle products
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BackendURL}/api/product`);
                const shuffled = response.data.sort(() => Math.random() - 0.5);
                setProducts(shuffled);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [BackendURL]);

    // Pagination calculations
    const totalPages = Math.ceil(products.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

    // Truncate text
    function truncateWords(text, wordLimit) {
        if (!text) return "";
        const words = text.split(" ");
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : text;
    }

    // Handle page navigation
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            // Scroll to the top of the grid
            if (gridRef.current) {
                gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    // Loading placeholder
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="p-4">
            {/* Product Grid */}
            <div
                ref={gridRef} // attach the ref here
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-2 max-h-screen overflow-y-auto"
            >
                {currentProducts.map((product, i) => (
                    <div
                        key={i}
                        className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col items-center text-center"
                    >
                        <img
                            src={product.image}
                            alt="Product"
                            className="w-full h-50 object-cover mb-3 rounded-md object-top"
                        />
                        <p className="font-medium text-gray-800">{truncateWords(product.name, 5)}</p>
                        <p className="text-sm text-gray-500 mb-3">$ {product.price}</p>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
                            View Details
                        </Button>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 space-x-2">
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
                >
                    Prev
                </Button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`${
                            currentPage === i + 1
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        } px-3 py-1 rounded`}
                    >
                        {i + 1}
                    </Button>
                ))}

                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </Button>
            </div>
        </div>
    );
}

export default ProductList;
