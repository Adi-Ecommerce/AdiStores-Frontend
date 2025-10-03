import React from 'react'
import logo from "../../assets/ChatGPT_Image_Sep_27__2025__12_04_37_AM-removebg-preview (1).png";
import getYear from '../../utils/NewDate';

function Footer() {
    return (
        <main className="flex flex-col gap-10 bg-black p-6 sm:p-8 md:px-12 lg:px-20 xl:px-32">
            <footer className="flex flex-col md:flex-row justify-between items-start md:items-center text-white gap-y-10 md:gap-y-0">

                {/* Left Section (Logo + Description) */}
                <div className="flex flex-col gap-4 md:w-[40%]">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-14 sm:w-16 md:w-20 lg:w-24 object-contain"
                    />
                    <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl tracking-wide leading-relaxed max-w-[300px] sm:max-w-[400px] md:max-w-none">
                        Your ultimate destination for fashion, electronics, and home essentials.
                        Discover quality and style.
                    </p>
                </div>

                {/* Right Section (Links) */}
                <aside className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12 w-full md:w-[60%]">
                    <ul className="flex flex-col gap-2 text-sm sm:text-base md:text-lg lg:text-xl">
                        <h2 className="font-semibold mb-2">Quick Links</h2>
                        <li className="hover:text-blue-400 cursor-pointer transition">Shop</li>
                        <li className="hover:text-blue-400 cursor-pointer transition">Contacts</li>
                        <li className="hover:text-blue-400 cursor-pointer transition">FAQs</li>
                        <li className="hover:text-blue-400 cursor-pointer transition">Policy</li>
                    </ul>

                    <ul className="flex flex-col gap-2 text-sm sm:text-base md:text-lg lg:text-xl">
                        <h2 className="font-semibold mb-2">Categories</h2>
                        <li className="hover:text-blue-400 cursor-pointer transition">Clothing</li>
                        <li className="hover:text-blue-400 cursor-pointer transition">Electronics</li>
                        <li className="hover:text-blue-400 cursor-pointer transition">Shoes</li>
                        <li className="hover:text-blue-400 cursor-pointer transition">Fashion</li>
                    </ul>

                    <ul className="flex flex-col gap-2 text-sm sm:text-base md:text-lg lg:text-xl">
                        <h2 className="font-semibold mb-2">About Us</h2>
                        <li className="hover:text-blue-400 cursor-pointer transition">Our Story</li>
                        <li className="hover:text-blue-400 cursor-pointer transition">Career</li>
                        <li className="hover:text-blue-400 cursor-pointer transition">Press</li>
                    </ul>
                </aside>
            </footer>

            {/* Bottom Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-t border-gray-600 pt-5">
                <p className="text-gray-400 text-sm sm:text-base">
                    © {getYear} A-D-I Stores. All rights reserved
                </p>
                <p className="text-gray-400 text-sm sm:text-base">
                    Made with ❤️ by A-D-I Team
                </p>
            </div>
        </main>

    )
}

export default Footer;
