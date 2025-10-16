import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Minus, Plus } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext.jsx';
import Loader from '../components/kokonutui/loader.jsx';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const BackendURL = import.meta.env.VITE_BACKEND_URL;
    const { addToCart, loading: cartLoading } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `${BackendURL}/api/Product/${id}`,
                    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
                );
                setProduct(response.data);
                setSelectedImage(response.data.image);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id, BackendURL]);

    const handleAddToCart = async () => {
        const success = await addToCart(product.id, quantity);
        if (success) {
            navigate('/cart');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Not Found</h2>
                <button
                    onClick={() => navigate('/products')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    const discountedPrice = ((33 / 100) * product.price).toFixed(2);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
                >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        {/* Main Image */}
                        <div className="bg-white rounded-lg p-4 shadow-md">
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="w-full h-96 object-cover rounded-lg"
                                onError={(e) => {
                                    e.target.src = '/placeholder-image.png';
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {/* Product Name */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {product.name}
                            </h1>
                            <p className="text-gray-500">SKU: #{product.id}</p>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-bold text-gray-900">
                                ${discountedPrice}
                            </span>
                            <span className="text-2xl line-through text-gray-400">
                                ${product.price}
                            </span>
                            <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-full">
                                33% OFF
                            </span>
                        </div>

                        {/* Description */}
                        <div className="border-t border-b border-gray-200 py-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2">
                            {product.stockQuantity > 0 ? (
                                <>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-green-600 font-medium">
                                        In Stock ({product.stockQuantity} available)
                                    </span>
                                </>
                            ) : (
                                <>
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span className="text-red-600 font-medium">Out of Stock</span>
                                </>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        <div className="space-y-4">
                            <label className="text-lg font-semibold text-gray-900">Quantity:</label>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={cartLoading}
                                    className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    <Minus size={20} />
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-20 text-center text-lg font-semibold border border-gray-300 rounded-lg px-4 py-3"
                                    min="1"
                                    disabled={cartLoading}
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    disabled={cartLoading}
                                    className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="space-y-3">
                            <button
                                onClick={handleAddToCart}
                                disabled={cartLoading || product.stockQuantity === 0}
                                className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                            >
                                {cartLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={20} />
                                        Add to Cart
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => navigate('/products')}
                                className="w-full py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold text-lg hover:bg-gray-50 transition"
                            >
                                Continue Shopping
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div className="bg-gray-100 rounded-lg p-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>✓</span>
                                <span>Free shipping on orders over $50</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>✓</span>
                                <span>30-day return policy</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>✓</span>
                                <span>Secure checkout</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;