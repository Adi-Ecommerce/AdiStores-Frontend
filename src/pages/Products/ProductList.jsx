import React, {useState, useEffect, useRef, useContext} from "react";
import { Button } from "../../components/ui/button";
import axios from "axios";
import Loader from "../../components/kokonutui/loader.jsx";
import SmoothDrawer from "../../components/kokonutui/smooth-drawer.jsx";
import AuthContext from "../../context/AuthContext.jsx";

function ProductList() {
    const BackendURL = import.meta.env.VITE_BACKEND_URL;
    const {setProductId, selectedCategories, priceRange} = useContext(AuthContext);
    // useEffect(() => {
    //     console.log('ProductList.jsx - selectedCategories:', selectedCategories);
    // }, [selectedCategories]);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const productsPerPage = 20;

    const gridRef = useRef(null);

    // Fetch products with filters
    useEffect(() => {
        const fetchData = async () => {
            // console.log('🔍 Fetching with selectedCategories:', selectedCategories, 'priceRange:', priceRange);
            setLoading(true);
            try {
                let allProducts = [];

                // If categories are selected, fetch by category
                if (selectedCategories.length > 0) {
                    // console.log('📦 Fetching products for categories:', selectedCategories);
                    const categoryPromises = selectedCategories.map(categoryId => {
                        // console.log('🌐 API call for category:', categoryId, 'URL:', `/api/Product/by-category/${categoryId}`);
                        return axios.get(`/api/Product/by-category/${categoryId}`)
                    });

                    const categoryResponses = await Promise.all(categoryPromises);
                    // console.log('📥 Category responses:', categoryResponses);
                    // Combine all products and remove duplicates
                    const productsMap = new Map();
                    categoryResponses.forEach(response => {
                        // console.log('📦 Processing response with', response.data.length, 'products');
                        response.data.forEach(product => {
                            productsMap.set(product.id, product);
                        });
                    });

                    allProducts = Array.from(productsMap.values());
                    // console.log('📊 Total unique products before price filter:', allProducts.length);
                } else {
                    // Fetch all products if no category selected
                    const response = await axios.get(`/api/product`);
                    allProducts = response.data;
                }

                // Apply price filter
                const filteredProducts = allProducts.filter(
                    product => product.price >= priceRange[0] && product.price <= priceRange[1]
                );
                // console.log('💰 Products after price filter:', filteredProducts.length);
                // console.log('💰 Sample product prices:', allProducts.slice(0, 5).map(p => p.price));

                // Shuffle products
                const shuffled = filteredProducts.sort(() => Math.random() - 0.5);
                setProducts(shuffled);
                setCurrentPage(1); // Reset to first page when filters change
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [BackendURL, selectedCategories, priceRange]);

    const totalPages = Math.ceil(products.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

    const truncateWords = (text, wordLimit) => {
        if (!text) return "";
        const words = text.split(" ");
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : text;
    };

    // Scroll to top of product grid
    const scrollToTop = () => {
        gridRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            scrollToTop();
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="p-4">
            {/* Results count */}
            <div className="mb-4 text-gray-600">
                Showing {currentProducts.length} of {products.length} products
            </div>

            {/* Product Grid */}
            <div
                ref={gridRef}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 max-h-screen overflow-y-scroll"
            >
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <div
                            key={product.id}
                            className="border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition p-4 flex flex-col items-center text-center bg-white"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 sm:h-56 md:h-48 lg:h-52 object-cover mb-3 rounded-md"
                            />
                            <p className="font-medium text-gray-800">{truncateWords(product.name, 5)}</p>
                            <p className="text-sm text-gray-500 mb-3">${product.price}</p>
                            <SmoothDrawer
                                productId={product.id}
                                onPreview={() => setProductId(product.id)}
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                        <p className="text-gray-400 text-sm mt-2">Try adjusting your filters to see more results.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex flex-wrap justify-center mt-8 gap-2">
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50 px-3 py-1 rounded"
                    >
                        Prev
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                            return (
                                <Button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 py-1 rounded ${
                                        currentPage === page
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                    }`}
                                >
                                    {page}
                                </Button>
                            );
                        } else if (
                            (page === currentPage - 2 && page > 1) ||
                            (page === currentPage + 2 && page < totalPages)
                        ) {
                            return <span key={page} className="px-2 py-1">…</span>;
                        } else {
                            return null;
                        }
                    })}

                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50 px-3 py-1 rounded"
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}

export default ProductList;