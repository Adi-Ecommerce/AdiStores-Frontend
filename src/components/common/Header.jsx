import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/ChatGPT_Image_Sep_27__2025__12_04_37_AM-removebg-preview (1).png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useCart } from "../../context/CartContext";
import MenuDemo from "../common/ProfileMenu";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartCount } = useCart();

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="flex justify-between items-center p-3 md:px-6 lg:px-10 bg-black text-white relative">
            {/* Logo */}
            <Link to="/" className="flex items-center">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-10 sm:w-14 md:w-16 lg:w-20 object-contain"
                />
            </Link>

            {/* Desktop Navigation */}
            <aside className="hidden md:flex flex-1 justify-evenly items-center gap-4 lg:gap-8 xl:gap-12">
                {/* Nav Links */}
                <ul className="flex gap-4 md:gap-6 lg:gap-10 text-sm md:text-base lg:text-lg font-normal">
                    <Link to="/home" className="hover:text-blue-400 transition">Home</Link>
                    <Link to="/products" className="hover:text-blue-400 transition">Products</Link>
                    <Link to="/about" className="hover:text-blue-400 transition">About</Link>
                    <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
                </ul>

                {/* Search Bar */}
                <div className="flex items-center gap-2 border border-gray-600 rounded-md px-2 py-1 w-[40%] md:w-[30%] lg:w-[25%] xl:w-[22%]">
                    <SearchIcon className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="bg-transparent p-1 w-full outline-none text-xs md:text-sm lg:text-base"
                    />
                </div>

                {/* Cart + Profile */}
                <div className="flex items-center gap-6 lg:gap-8 xl:gap-10">
                    {/* Cart with badge */}
                    <Link
                        to="/cart"
                        className="relative flex items-center gap-1 hover:text-blue-400 transition"
                    >
                        <ShoppingCartIcon className="!text-base md:!text-lg" />
                        <p className="text-xs md:text-sm lg:text-base">Cart</p>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] md:text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
                        )}
                    </Link>

                    {/* Profile Menu */}
                    <MenuDemo />
                </div>
            </aside>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-white cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-center gap-6 py-6 md:hidden shadow-lg z-50 transition-all duration-300 ease-in-out">
                    {/* Search for Mobile */}
                    <div className="flex items-center gap-2 border border-gray-600 rounded-md px-3 py-2 w-[90%]">
                        <SearchIcon className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="bg-transparent w-full outline-none text-sm"
                        />
                    </div>

                    {/* Nav Links */}
                    <ul className="flex flex-col gap-4 text-lg font-normal items-center">
                        <Link to="/home" onClick={closeMenu} className="hover:text-blue-400">Home</Link>
                        <Link to="/products" onClick={closeMenu} className="hover:text-blue-400">Products</Link>
                        <Link to="/about" onClick={closeMenu} className="hover:text-blue-400">About</Link>
                        <Link to="/contact" onClick={closeMenu} className="hover:text-blue-400">Contact</Link>
                    </ul>

                    {/* Cart + Profile for Mobile */}
                    <div className="flex items-center gap-8 mt-4">
                        <Link
                            to="/cart"
                            onClick={closeMenu}
                            className="relative flex gap-1 items-center hover:text-blue-400 transition"
                        >
                            <ShoppingCartIcon className="!text-base md:!text-lg" />
                            <p className="text-sm">Cart</p>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
                            )}
                        </Link>

                        <MenuDemo />
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
