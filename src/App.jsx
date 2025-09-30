import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import AuthLayout from './components/layout/AuthLayout';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home/Home';
import Products from './pages/Products/Product';
import Profile from './pages/Profile';
import ProductList from './pages/Products/ProductList..jsx';
import Cart from "./pages/Cart/Cart.jsx";



function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout/>}>
            <Route path='/login' element={<Login />} /> 
            <Route path='/' element={<Register/>} />
        </Route>
        <Route element={<MainLayout/>} >
            <Route path='/home' element={<Home/>} />
            <Route path='/products' element={<Products/>} />
            <Route path='/products/:id' element={<ProductList/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/cart" element={<Cart/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
