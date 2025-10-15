import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import CartItem from './Cartitem.jsx';
import EmptyCart from './EmptyCart.jsx';

function Cart() {
    const navigate = useNavigate();
    const {
        cart,
        loading,
        updateQuantity,
        removeItem,
        checkout,
        getCartTotal,
        getTotalItems,
        fetchCart,
    } = useCart();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Cart page mounted. Token exists:', !!token);
        console.log('Token value:', token?.substring(0, 20) + '...');
    }, []);
    // Fetch cart on mount
    useEffect(() => {
        fetchCart();
    }, []);

    const handleCheckout = async () => {
        const result = await checkout();
        if (result) {
            navigate('/home');
        }
    };

    // Show loading state
    if (loading && cart.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Show empty cart
    if (cart.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                        Shopping Cart
                    </h1>
                    <p className="text-gray-600">
                        {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence mode="popLayout">
                            {cart.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeItem}
                                    loading={loading}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-lg shadow-md p-6 sticky top-8"
                        >
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Order Summary
                            </h2>

                            {/* Summary Details */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({getTotalItems()} items)</span>
                                    <span className="font-medium">
                    ${getCartTotal().toFixed(2)}
                  </span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-medium text-green-600">Free</span>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>${getCartTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Processing...
                                    </>
                                ) : (
                                    'Proceed to Checkout'
                                )}
                            </button>

                            {/* Continue Shopping */}
                            <button
                                onClick={() => navigate('/products')}
                                className="w-full mt-3 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            >
                                Continue Shopping
                            </button>

                            {/* Info Text */}
                            <p className="text-xs text-gray-500 text-center mt-4">
                                Tax and shipping calculated at checkout
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;