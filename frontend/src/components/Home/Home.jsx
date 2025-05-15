import React from "react";
import Spline from '@splinetool/react-spline';
import { Link } from "react-router";
import { LuCodesandbox } from "react-icons/lu";

export default function Home() {
    return (
        <div className="relative h-screen w-full flex flex-col bg-black">
            {/* Navigation Bar */}
            <nav className="w-full bg-black shadow-md py-2 sm:py-10 px-4 sm:px-6 flex flex-col items-center justify-between z-10">
                <div className="text-2xl sm:text-9xl md:text-4xl font-bold text-white relative h-full w-full flex items-end justify-center">
                    Braynix
                </div>
                <div className="w-full mt-4">
                    <hr className="border-t-2 border-white my-4" />
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative h-full w-full flex items-end justify-center">
                <div className="absolute inset-0 z-0 mb-36 justify-center items-center scale-100 transform-gpu">
                <Spline
                    scene="https://prod.spline.design/19O-VO-aduVtWZfR/scene.splinecode"
                />
                </div>
                <Link
                    to="/chat"
                    className="px-2 relative rounded-full py-2 m-4 mt-20 sm:m-6 md:m-10 hover:bg-gray-500 hover:text-white font-cool text-4xl sm:text-6xl md:text-7xl text-black bg-white flex items-center justify-center text-center z-10"
                >
                    <LuCodesandbox />
                </Link>
            </div>
        </div>
    );
}