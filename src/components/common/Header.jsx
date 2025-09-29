import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/ChatGPT_Image_Sep_27__2025__12_04_37_AM-removebg-preview (1).png";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="flex justify-between items-center p-3 md:px-6 lg:px-10 bg-black text-white relative">
            {/* Logo */}
            <div className="flex items-center">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-12 sm:w-14 md:w-16 lg:w-20"
                />
            </div>

            {/* Desktop Navigation */}
            <aside className="hidden md:flex flex-1 justify-evenly items-center gap-4 lg:gap-8 xl:gap-12">
                {/* Nav */}
                <ul className="flex gap-4 md:gap-6 lg:gap-10 text-sm md:text-base lg:text-lg xl:text-xl font-normal">
                    <Link to="/" className="hover:text-blue-400 cursor-pointer">Home</Link>
                    <Link to="/products" className="hover:text-blue-400 cursor-pointer">Products</Link>
                    <Link to='/about' className="hover:text-blue-400 cursor-pointer">About</Link>
                    <li className="hover:text-blue-400 cursor-pointer">Contact</li>
                </ul>

                {/* Search */}
                <div className="flex items-center gap-2 border border-gray-600 rounded-md px-2 py-1
                    w-[50%] md:w-[30%] lg:w-[40%] xl:w-[30%]">
                    <SearchIcon className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search Products..."
                        className="bg-transparent p-1 w-full outline-none text-xs md:text-sm lg:text-base"
                    />
                </div>

                {/* Profile + Cart */}
                <div className="flex gap-4 md:gap-6 lg:gap-10">
                    <Link to="/profile" className="flex gap-1 items-center hover:text-blue-400">
                        <PersonIcon className="!text-sm md:!text-base lg:!text-lg" />
                        <p className="text-xs md:text-sm lg:text-base xl:text-lg font-normal">Profile</p>
                    </Link>
                    <Link to='/cart' className="flex gap-1 items-center hover:text-blue-400">
                        <ShoppingCartIcon className="!text-sm md:!text-base lg:!text-lg" />
                        <p className="text-xs md:text-sm lg:text-base xl:text-lg font-normal">Cart</p>
                    </Link>
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
                <div className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-center gap-6 py-6 md:hidden shadow-lg z-50">
                    {/* Search for Mobile */}
                    <div className="flex items-center gap-2 border border-gray-600 rounded-md px-3 py-2 w-[90%]">
                        <SearchIcon className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Products..."
                            className="bg-transparent w-full outline-none text-base"
                        />
                    </div>

                    {/* Nav */}
                    <ul className="flex flex-col gap-4 text-lg font-normal items-center">
                        <li className="hover:text-blue-400 cursor-pointer">Home</li>
                        <li className="hover:text-blue-400 cursor-pointer">Products</li>
                        <li className="hover:text-blue-400 cursor-pointer">About</li>
                        <li className="hover:text-blue-400 cursor-pointer">Contact</li>
                    </ul>

                    {/* Profile + Cart */}
                    <div className="flex gap-8 mt-4">
                        <button className="flex gap-1 items-center hover:text-blue-400">
                            <PersonIcon />
                            <p>Profile</p>
                        </button>
                        <button className="flex gap-1 items-center hover:text-blue-400">
                            <ShoppingCartIcon />
                            <p>Cart</p>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
