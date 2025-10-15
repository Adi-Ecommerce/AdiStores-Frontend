import { createContext, useContext, useState, useEffect } from 'react';
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
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    // Get token from localStorage
    const getToken = () => localStorage.getItem('token');

    // Create axios instance with auth header
    const api = axios.create({
        baseURL: BackendURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Add token to requests
    api.interceptors.request.use((config) => {
        const token = getToken();
        console.log('[Cart API] Request to:', config.url);
        console.log('[Cart API] Token exists:', !!token);
        console.log('[Cart API] Token preview:', token?.substring(0, 30) + '...');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // Handle auth errors - ONLY log out on actual auth failure
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error('[Cart API error]', {
                status: error.response?.status,
                message: error.response?.data?.message,
                code: error.code,
                success: error.response?.data?.success,
                wwwAuthenticate: error.response?.headers?.['www-authenticate'] || ''
            });

            if (error.response?.status === 401) {
                // Only logout if it's an actual authentication error
                const errorMessage = error.response?.data?.message?.toLowerCase() || '';
                const isAuthError =
                    errorMessage.includes('unauthorized') ||
                    errorMessage.includes('token') ||
                    errorMessage.includes('expired') ||
                    error.response?.data?.success === false;

                if (isAuthError) {
                    console.error('Authentication failed - logging out');
                    toast.error('Session expired. Please login again.');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                } else {
                    console.warn('Got 401 but not an auth error, might be a different issue');
                }
            }
            return Promise.reject(error);
        }
    );

    // Update cart count whenever cart changes
    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
    }, [cart]);

    // Fetch cart from API
    const fetchCart = async () => {
        const token = getToken();
        if (!token) {
            console.log('No token found, skipping cart fetch');
            return;
        }

        try {
            setLoading(true);
            const response = await api.get('/api/Cart');

            // Check the new response format
            if (response.data.success && response.data.data) {
                setCart(response.data.data);
            } else if (response.data.success && !response.data.data) {
                // Cart is empty
                setCart([]);
            } else {
                console.warn('Unexpected response format:', response.data);
                setCart([]);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            // Don't show error for 401 - interceptor handles it
            if (error.response?.status !== 401) {
                toast.error('Failed to load cart');
            }
            setCart([]);
        } finally {
            setLoading(false);
        }
    };

    // Add item to cart
    const addToCart = async (productId, quantity = 1) => {
        try {
            setLoading(true);
            const response = await api.post('/api/cart/add', {
                productId,
                quantity,
            });

            if (response.data.success && response.data.data) {
                setCart(response.data.data);
                toast.success(response.data.message || 'Item added to cart!');
                return true;
            } else {
                toast.error(response.data.message || 'Failed to add item');
                return false;
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            const errorMsg = error.response?.data?.message || 'Failed to add item';
            toast.error(errorMsg);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Update item quantity
    const updateQuantity = async (cartItemId, quantity) => {
        if (quantity < 1) {
            toast.error('Quantity must be at least 1');
            return false;
        }

        try {
            setLoading(true);
            const response = await api.put(`/api/cart/update/${cartItemId}`, {
                quantity,
            });

            if (response.data.success && response.data.data) {
                setCart(response.data.data);
                toast.success(response.data.message || 'Quantity updated');
                return true;
            } else {
                toast.error(response.data.message || 'Failed to update quantity');
                return false;
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            toast.error(error.response?.data?.message || 'Failed to update quantity');
            // Refetch to get correct state
            await fetchCart();
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Remove item from cart
    const removeItem = async (productId) => {
        try {
            setLoading(true);
            const response = await api.delete(`/api/cart/remove/${productId}`);

            if (response.data.success && response.data.data) {
                setCart(response.data.data);
                toast.success(response.data.message || 'Item removed from cart');
                return true;
            } else if (response.data.success && !response.data.data) {
                // Cart is now empty
                setCart([]);
                toast.success(response.data.message || 'Item removed from cart');
                return true;
            } else {
                toast.error(response.data.message || 'Failed to remove item');
                return false;
            }
        } catch (error) {
            console.error('Error removing item:', error);
            toast.error(error.response?.data?.message || 'Failed to remove item');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Checkout
    const checkout = async () => {
        try {
            setLoading(true);
            const response = await api.post('/api/cart/checkout/confirm');

            if (response.data.success) {
                setCart([]);
                toast.success(response.data.message || 'Checkout successful!');
                return response.data.data;
            } else {
                toast.error(response.data.message || 'Checkout failed');
                return null;
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            toast.error(error.response?.data?.message || 'Checkout failed. Please try again.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Clear cart locally (for logout, etc.)
    const clearCart = () => {
        setCart([]);
        setCartCount(0);
    };

    // Calculate cart total
    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.totalPrice || 0), 0);
    };

    // Get total items count
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const value = {
        cart,
        cartCount,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        checkout,
        clearCart,
        fetchCart,
        getCartTotal,
        getTotalItems,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;