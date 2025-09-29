import React from 'react'
import logo from "../../assets/ChatGPT_Image_Sep_27__2025__12_04_37_AM-removebg-preview (1).png";
import getYear from '../../utils/NewDate';

function Footer() {
    return (
        <main className="flex flex-col gap-10 bg-black p-6 md:px-10 lg:px-16 ">
            <footer className="flex flex-col md:flex-row justify-between items-start text-white gap-y-10 md:gap-y-0">

                {/* Left Section (Logo + Description) */}
                <div className="flex flex-col gap-4 md:w-[40%]">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-14 sm:w-16 md:w-20 lg:w-24 object-contain"
                    />
                    <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl tracking-wide leading-relaxed w-[65%]">
                        Your ultimate destination for fashion, electronics, and home essentials.
                        Discover quality and style.
                    </p>
                </div>

                {/* Right Section (Links) */}
                <aside className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12 w-full md:w-[60%]">
                    <ul className="flex flex-col gap-2 text-sm sm:text-base md:text-lg lg:text-xl">
                        <h2 className="font-semibold mb-2">Quick Links</h2>
                        <li className="hover:text-blue-400 cursor-pointer">Shop</li>
                        <li className="hover:text-blue-400 cursor-pointer">Contacts</li>
                        <li className="hover:text-blue-400 cursor-pointer">FAQs</li>
                        <li className="hover:text-blue-400 cursor-pointer">Policy</li>
                    </ul>

                    <ul className="flex flex-col gap-2 text-sm sm:text-base md:text-lg lg:text-xl">
                        <h2 className="font-semibold mb-2">Categories</h2>
                        <li className="hover:text-blue-400 cursor-pointer">Clothing</li>
                        <li className="hover:text-blue-400 cursor-pointer">Electronics</li>
                        <li className="hover:text-blue-400 cursor-pointer">Shoes</li>
                        <li className="hover:text-blue-400 cursor-pointer">Fashion</li>
                    </ul>

                    <ul className="flex flex-col gap-2 text-sm sm:text-base md:text-lg lg:text-xl">
                        <h2 className="font-semibold mb-2">About Us</h2>
                        <li className="hover:text-blue-400 cursor-pointer">Our Story</li>
                        <li className="hover:text-blue-400 cursor-pointer">Career</li>
                        <li className="hover:text-blue-400 cursor-pointer">Press</li>
                    </ul>
                </aside>
            </footer>

            {/* Bottom Bar */}
            <div className="flex flex-col items-start gap-2">
                <hr className="w-[80%] border-white mt-5" />
                <p className="text-white">© {getYear} A-D-I Stores. All rights reserved</p>
            </div>
        </main>
    )
}

export default Footer;
