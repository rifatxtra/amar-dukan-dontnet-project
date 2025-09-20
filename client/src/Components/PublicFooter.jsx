import {
    faGoogle,
    faInstagram,
    faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function PublicFooter() {
    return (
        <div className="w-full">
            <div className="bg-black flex items-center justify-center py-2">
                <div className="w-[80%] flex flex-row justify-between items-center">
                    <div>
                        <img
                            onClick={() => (window.location.href = "/")}
                            src="/images/web/logo.png"
                            className="h-[100px] cursor-pointer"
                            alt="Logo"
                        />
                    </div>
                    <div className="flex flex-row gap-2">
                        <FontAwesomeIcon
                            onClick={() =>
                                (window.location.href =
                                    "https://www.instagram.com/rifatxtra")
                            }
                            className="text-[25px] rounded-md p-4 bg-[#ED7F23] cursor-pointer"
                            icon={faInstagram}
                        />
                        <FontAwesomeIcon
                            onClick={() =>
                                (window.location.href ="mailto:contact@amardukan.com")
                            }
                            className="text-[25px] rounded-md p-4 bg-[#ED7F23] cursor-pointer"
                            icon={faGoogle}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full bg-[#ED7F23] flex flex-row items-center justify-center text-[18px]">
                <div className="w-full lg:w-[80%] lg:h-[10vh] py-2 text-black flex flex-col md:flex-row items-center justify-center font-bold">
                    <div className="w-full text-center lg:w-1/2">
                        <p className="w-full md:w-[80%]">
                            © Amar Dukan || Developed By Md. Rashedul Islam
                        </p>
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-4">
                        <p className="text-center lg:text-left">
                            <a href="/terms-and-conditions">Terms and Conditions</a>
                        </p>
                        <p className="text-center lg:text-left">
                            <a href="/data-consumer-policy">Data Consumer Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
