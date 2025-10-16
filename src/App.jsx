import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import AuthLayout from './components/layout/AuthLayout';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home/Home';
import Products from './pages/Products/Product';
import ProductList from './pages/Products/ProductList';
import Profile from './pages/Profile';
import Cart from "./pages/Cart/Cart.jsx";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/common/PrivateRoute";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/CHeckOut";
import ProductDetail from "./pages/ProductDetail";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public routes - no CartProvider needed */}
                    <Route element={<AuthLayout />}>
                        <Route path='/login' element={<Login />} />
                        <Route path='/' element={<Register />} />
                    </Route>

                    {/* Protected routes - wrapped with CartProvider */}
                    <Route element={
                        <PrivateRoute>
                            <CartProvider>
                                <MainLayout />
                            </CartProvider>
                        </PrivateRoute>
                    }>
                        <Route path='/home' element={<Home />} />
                        <Route path='/products' element={<Products />} />
                        <Route path='/products/:id' element={<ProductList />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;