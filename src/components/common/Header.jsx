import React, { useState } from "react";
import logo from "../../assets/ChatGPT_Image_Sep_27__2025__12_04_37_AM-removebg-preview (1).png";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="flex justify-between items-center p-3 py-4 md:px-10 bg-black text-white">
            {/* Logo */}
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="w-16 md:w-20" />
            </div>

            {/* Desktop Navigation */}
            <aside className="hidden md:flex justify-evenly items-center w-[75%]">
                {/* Nav Links */}
                <ul className="flex w-[40%] justify-evenly text-lg font-normal">
                    <li className="hover:text-blue-400 cursor-pointer">Home</li>
                    <li className="hover:text-blue-400 cursor-pointer">Products</li>
                    <li className="hover:text-blue-400 cursor-pointer">About</li>
                    <li className="hover:text-blue-400 cursor-pointer">Contact</li>
                </ul>

                {/* Search Bar */}
                <div className="flex items-center gap-2 w-[35%] bg-white text-black rounded-md px-2">
                    <SearchIcon className="text-gray-600" />
                    <input
                        type="text"
                        placeholder="Search Products..."
                        className="p-2 w-full outline-none bg-transparent"
                    />
                </div>

                {/* Profile + Cart */}
                <div className="flex gap-4 w-[20%] justify-evenly">
                    <button className="flex gap-1 items-center hover:text-blue-400">
                        <PersonIcon />
                        <p className="text-lg font-normal">Profile</p>
                    </button>
                    <button className="flex gap-1 items-center hover:text-blue-400">
                        <ShoppingCartIcon />
                        <p className="text-lg font-normal">Cart</p>
                    </button>
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
                    {/* Search Bar (Mobile) */}
                    <div className="flex items-center gap-2 w-[90%] bg-white text-black rounded-md px-2">
                        <SearchIcon className="text-gray-600" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="p-2 w-full outline-none bg-transparent"
                        />
                    </div>

                    {/* Nav Links */}
                    <ul className="flex flex-col gap-4 text-lg font-normal items-center">
                        <li className="hover:text-blue-400 cursor-pointer">Home</li>
                        <li className="hover:text-blue-400 cursor-pointer">Products</li>
                        <li className="hover:text-blue-400 cursor-pointer">About</li>
                        <li className="hover:text-blue-400 cursor-pointer">Contact</li>
                    </ul>

                    {/* Profile + Cart */}
                    <div className="flex gap-6 mt-2">
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
