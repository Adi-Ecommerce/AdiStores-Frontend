import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

function Checkout() {
    const navigate = useNavigate();
    const { cart, getCartTotal, getTotalItems, checkout, loading, confirmCheckout } = useCart();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (cart.length === 0) {
            toast.error('Your cart is empty');
            navigate('/cart');
        }
    }, [cart, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';

        if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
        else if (formData.cardNumber.replace(/\s/g, '').length !== 16)
            newErrors.cardNumber = 'Card number must be 16 digits';
        if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
        if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
        else if (formData.cvv.length !== 3) newErrors.cvv = 'CVV must be 3 digits';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fill in all required fields correctly');
            return;
        }

        const result = await confirmCheckout();
        if (result) {
            toast.success('Order placed successfully!');
            navigate('/home');
        }
    };

    const getImageUrl = (imageData) => {
        if (!imageData) return '/placeholder-image.png';
        if (typeof imageData === 'string') return imageData;
        if (imageData.url) return imageData.url;
        return '/placeholder-image.png';
    };

    if (cart.length === 0) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/cart')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Cart</span>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Shipping Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-lg shadow-md p-6"
                            >
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    Shipping Information
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        ['firstName', 'First Name *'],
                                        ['lastName', 'Last Name *'],
                                        ['email', 'Email *'],
                                        ['phone', 'Phone *'],
                                        ['address', 'Address *', true],
                                        ['city', 'City *'],
                                        ['state', 'State *'],
                                        ['zipCode', 'Zip Code *'],
                                    ].map(([name, label, full]) => (
                                        <div key={name} className={full ? 'sm:col-span-2' : ''}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {label}
                                            </label>
                                            <input
                                                type={name === 'email' ? 'email' : 'text'}
                                                name={name}
                                                value={formData[name]}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border ${errors[name]
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            />
                                            {errors[name] && (
                                                <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Payment Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-lg shadow-md p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Payment Information
                                    </h2>
                                    <Lock size={20} className="text-green-600" />
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Card Number *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleChange}
                                                placeholder="1234 5678 9012 3456"
                                                maxLength="19"
                                                className={`w-full px-4 py-2 pl-10 border ${errors.cardNumber
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            />
                                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        </div>
                                        {errors.cardNumber && (
                                            <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Cardholder Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            value={formData.cardName}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className={`w-full px-4 py-2 border ${errors.cardName
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        />
                                        {errors.cardName && (
                                            <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Expiry Date *
                                            </label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={formData.expiryDate}
                                                onChange={handleChange}
                                                placeholder="MM/YY"
                                                maxLength="5"
                                                className={`w-full px-4 py-2 border ${errors.expiryDate
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            />
                                            {errors.expiryDate && (
                                                <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                CVV *
                                            </label>
                                            <input
                                                type="password"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleChange}
                                                maxLength="3"
                                                className={`w-full px-4 py-2 border ${errors.cvv
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            />
                                            {errors.cvv && (
                                                <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-70"
                            >
                                {loading ? 'Processing...' : 'Place Order'}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-lg shadow-md p-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            {cart.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 border-b pb-4">
                                    <img
                                        src={getImageUrl(item.image)}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        ₦{(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            ))}

                            <div className="pt-4 border-t">
                                <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                                    <span>Items:</span>
                                    <span>{getTotalItems()}</span>
                                </div>
                                <div className="flex justify-between text-base font-semibold text-gray-900">
                                    <span>Total:</span>
                                    <span>₦{getCartTotal().toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
