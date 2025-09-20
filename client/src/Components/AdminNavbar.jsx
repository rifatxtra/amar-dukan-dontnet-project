import {
    faBars,
    faCartShopping,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function AdminNavbar() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const logout = async() => {
        try {
            const res=await api.post("/Auth/logout");
            if(res.status===200){
                localStorage.removeItem("token");
                window.location.href="/admin";
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="relative w-[100vw]">
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
                        <button onClick={()=>window.location.href='/admin'} className="text-[#ED7F23] text-[20px] hover:text-[#A17342] cursor-pointer">
                            Dashboard
                        </button>
                        <button onClick={()=>window.location.href='/admin/order-history'} className="text-[#ED7F23] text-[20px] hover:text-[#A17342] cursor-pointer">
                            Orders
                        </button>
                        <button onClick={()=>window.location.href='/admin/manage-product'} className="text-[#ED7F23] text-[20px] hover:text-[#A17342] cursor-pointer">
                            Products
                        </button>
                        <button onClick={()=>window.location.href='/admin/manage-category'} className="text-[#ED7F23] text-[20px] hover:text-[#A17342] cursor-pointer">
                            Categories
                        </button>
                        <button onClick={logout} className="text-black bg-[#ED7F23] p-2 rounded-md text-[20px] hover:text-[#A17342] cursor-pointer">
                            Logout
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
                <button onClick={()=>window.location.href='/admin'} className="text-[#B17342] text-[20px] font-bold">Dashboard</button>
                <button onClick={()=>window.location.href="/admin/order-history"} className="text-[#B17342] text-[20px] font-bold">Orders</button>
                <button onClick={()=>window.location.href="/admin/manage-product"} className="text-[#B17342] text-[20px] font-bold">Products</button>
                <button onClick={()=>window.location.href="/admin/manage-category"} className="text-[#B17342] text-[20px] font-bold">Categories</button>
                <button onClick={logout} className="text-white w-max bg-black p-2 rounded-md text-[20px] hover:text-[#A17342]">
                    Logout
                </button>
            </div>
        </div>
    );
}
