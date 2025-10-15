import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function EmptyCart() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 px-4"
        >
            <div className="bg-gray-100 p-8 rounded-full mb-6">
                <ShoppingCart size={64} className="text-gray-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 text-center">
                Your Cart is Empty
            </h2>

            <p className="text-gray-500 text-center mb-8 max-w-md">
                Looks like you haven't added anything to your cart yet.
                Start shopping to fill it up!
            </p>

            <Link
                to="/products"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
            >
                Browse Products
            </Link>
        </motion.div>
    );
}

export default EmptyCart;