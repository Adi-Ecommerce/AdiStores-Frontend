import { createContext, useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const BackendURL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate(); // ✅ Add navigation hook
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);

    const getToken = () => localStorage.getItem('token');

    const api = axios.create({
        baseURL: BackendURL,
        headers: { 'Content-Type': 'application/json' },
    });

    api.interceptors.request.use((config) => {
        const token = getToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                const msg = error.response?.data?.message?.toLowerCase() || '';
                const isAuthError =
                    msg.includes('unauthorized') ||
                    msg.includes('token') ||
                    msg.includes('expired') ||
                    error.response?.data?.success === false;

                if (isAuthError) {
                    toast.error('Session expired. Please login again.');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }
            }
            return Promise.reject(error);
        }
    );

    const cartCount = useMemo(
        () => cart.reduce((sum, item) => sum + item.quantity, 0),
        [cart]
    );

    // Fetch cart
    const fetchCart = async () => {
        const token = getToken();
        if (!token) return;
        try {
            setLoading(true);
            const response = await api.get('/api/Cart');
            if (response.data.success && Array.isArray(response.data.data)) {
                setCart(response.data.data);
            } else {
                setCart([]);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            if (error.response?.status !== 401) {
                toast.error('Failed to load cart');
            }
            setCart([]);
        } finally {
            setLoading(false);
        }
    };

    // Add item
    const addToCart = async (productId, quantity = 1) => {
        try {
            setLoading(true);
            const response = await api.post('/api/cart/add', { productId, quantity });
            if (response.data.success && response.data.data) {
                setCart(response.data.data);
                toast.success(response.data.message || 'Item added to cart!');
                return true;
            } else {
                toast.error(response.data.message || 'Failed to add item');
                return false;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add item');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Update quantity
    const updateQuantity = async (cartItemId, quantity) => {
        if (quantity < 1) {
            toast.error('Quantity must be at least 1');
            return false;
        }
        try {
            setLoading(true);
            const response = await api.put(`/api/cart/update/${cartItemId}`, { quantity });
            if (response.data.success && response.data.data) {
                setCart(response.data.data);
                toast.success(response.data.message || 'Quantity updated');
                return true;
            } else {
                toast.error(response.data.message || 'Failed to update quantity');
                return false;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update quantity');
            await fetchCart();
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Remove item
    const removeItem = async (productId) => {
        try {
            setLoading(true);
            const response = await api.delete(`/api/cart/remove/${productId}`);
            if (response.data.success && response.data.data) {
                setCart(response.data.data);
                toast.success(response.data.message || 'Item removed');
                return true;
            } else {
                setCart([]);
                toast.success(response.data.message || 'Item removed');
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to remove item');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // ✅ NEW: Start checkout process (go to checkout page)
    const startCheckout = async () => {
        if (cart.length === 0) {
            toast.error('Your cart is empty');
            return;
        }
        navigate('/checkout'); // ✅ redirect user to checkout page
    };

    // ✅ Confirm checkout (actual payment)
    const confirmCheckout = async () => {
        try {
            setLoading(true);
            const response = await api.post('/api/cart/checkout/confirm');
            if (response.data.success) {
                setCart([]); // clear after payment
                toast.success(response.data.message || 'Checkout successful!');
                navigate('/order-success'); // ✅ optional success page
                return response.data.data;
            } else {
                toast.error(response.data.message || 'Checkout failed');
                return null;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Checkout failed.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Clear cart locally
    const clearCart = () => setCart([]);

    const getCartTotal = () =>
        cart.reduce((total, item) => total + (item.totalPrice || 0), 0);

    const getTotalItems = () =>
        cart.reduce((total, item) => total + item.quantity, 0);

    const value = {
        cart,
        cartCount,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        startCheckout, // ✅ use this instead of checkout()
        confirmCheckout, // ✅ actual payment confirmation
        clearCart,
        fetchCart,
        getCartTotal,
        getTotalItems,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
