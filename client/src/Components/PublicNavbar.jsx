import {
    faBars,
    faCartShopping,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function PublicNavbar() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="relative">
            {/* Navbar */}
            <div className="bg-black w-full flex flex-row items-center justify-center z-40 relative">
                <div className="w-[80%] py-3 flex flex-row justify-between items-center">
                    {/* Logo */}
                    <div>
                        <img onClick={()=>window.location.href='/'}
                            src="/images/web/logo.png"
                            className="h-[100px] cursor-pointer"
                            alt="Logo"
                        />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex flex-row gap-3">
                        <button onClick={()=>window.location.href='/'} className="text-[#ED7F23] text-[20px] hover:text-[#A17342] cursor-pointer">
                            Home
                        </button>
                        <button onClick={()=>window.location.href='/about'} className="text-[#ED7F23] text-[20px] hover:text-[#A17342] cursor-pointer">
                            About
                        </button>
                        <button onClick={()=>window.location.href='/contact-us'} className="text-[#ED7F23] text-[20px] hover:text-[#A17342] cursor-pointer">
                            Contact Us
                        </button>
                        <button onClick={()=>window.location.href='/order'} className="text-black bg-[#ED7F23] p-2 rounded-md text-[20px] hover:text-[#A17342] cursor-pointer">
                            <FontAwesomeIcon icon={faCartShopping} /> Order
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        {showMenu ? (
                            <FontAwesomeIcon
                                onClick={toggleMenu}
                                className="text-[#D7A0A6] text-[25px] cursor-pointer"
                                icon={faXmark}
                            />
                        ) : (
                            <FontAwesomeIcon
                                onClick={toggleMenu}
                                className="text-[#D7A0A6] text-[25px] cursor-pointer"
                                icon={faBars}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Slide from Left */}
            <div
                className={`fixed top-30 left-0 justify-start items-start h-full w-full bg-[#D7A0A6] p-6 flex flex-col gap-6 transform transition-transform duration-300 ease-in-out md:hidden z-50 ${
                    showMenu ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <button onClick={()=>window.location.href='/'} className="text-[#B17342] text-[20px] font-bold">Home</button>
                <button onClick={()=>window.location.href="/about"} className="text-[#B17342] text-[20px] font-bold">About</button>
                <button onClick={()=>window.location.href="/contact-us"} className="text-[#B17342] text-[20px] font-bold">Contact Us</button>
                <button onClick={()=>window.location.href='/order'} className="text-white w-max bg-black p-2 rounded-md text-[20px] hover:text-[#A17342]">
                    <FontAwesomeIcon icon={faCartShopping} /> Order
                </button>
            </div>
        </div>
    );
}
