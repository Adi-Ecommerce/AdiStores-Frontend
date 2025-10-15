import React, { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

function CartItem({ item, onUpdateQuantity, onRemove, loading }) {
    const [updating, setUpdating] = useState(false);

    const handleQuantityChange = async (newQuantity) => {
        if (newQuantity < 1 || updating) return;

        setUpdating(true);
        await onUpdateQuantity(item.id, newQuantity);
        setUpdating(false);
    };

    const handleRemove = async () => {
        setUpdating(true);
        await onRemove(item.productId);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
            {/* Product Image */}
            <div className="w-full sm:w-24 h-24 flex-shrink-0">
                <img
                    src={item.image || '/placeholder-image.png'}
                    alt={item.product || 'Product'}
                    className="w-full h-full object-cover rounded-md"
                />
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                {/* Info Section */}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {item.product || 'Product Name'}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                        ${item.price?.toFixed(2) || '0.00'} each
                    </p>

                    {/* Mobile Quantity Controls */}
                    <div className="flex items-center gap-2 sm:hidden">
                        <button
                            onClick={() => handleQuantityChange(item.quantity - 1)}
                            disabled={item.quantity <= 1 || updating || loading}
                            className="p-1.5 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            <Minus size={16} />
                        </button>

                        <span className="w-12 text-center font-medium text-gray-800">
              {item.quantity}
            </span>

                        <button
                            onClick={() => handleQuantityChange(item.quantity + 1)}
                            disabled={updating || loading}
                            className="p-1.5 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>

                {/* Desktop Quantity Controls */}
                <div className="hidden sm:flex items-center gap-3">
                    <button
                        onClick={() => handleQuantityChange(item.quantity - 1)}
                        disabled={item.quantity <= 1 || updating || loading}
                        className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        <Minus size={18} />
                    </button>

                    <span className="w-12 text-center font-medium text-gray-800 text-lg">
            {item.quantity}
          </span>

                    <button
                        onClick={() => handleQuantityChange(item.quantity + 1)}
                        disabled={updating || loading}
                        className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        <Plus size={18} />
                    </button>
                </div>

                {/* Price & Remove */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-4">
                    <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">Total</p>
                        <p className="text-xl font-bold text-gray-900">
                            ${item.totalPrice?.toFixed(2) || '0.00'}
                        </p>
                    </div>

                    <button
                        onClick={handleRemove}
                        disabled={updating || loading}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-md transition disabled:opacity-50"
                        title="Remove item"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            {/* Loading Overlay */}
            {updating && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
            )}
        </motion.div>
    );
}

export default CartItem;