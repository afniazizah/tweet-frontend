import React from "react";
import { FaChartBar, FaDatabase, FaQuestionCircle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
        <header className="print:hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-800 text-white shadow-lg">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="rounded-lg flex items-center justify-center">
                                <span className="font-bold text-5xl">
                                    <FaXTwitter />
                                </span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">
                                    ANALISIS SENTIMEN X
                                </h1>
                                <p className="text-blue-100 text-sm">
                                    Analisis Sentimen Berbagai Topik Dari Data
                                    Opini di Platform X
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="bg-white shadow-sm mx-auto max-w-4xl mt-6 rounded-md overflow-hidden">
                <div className="container mx-auto">
                    <div className="grid grid-cols-3">
                        <Link
                            to="/"
                            className={`flex justify-center items-center space-x-2 text-primary py-4 px-4 border-b-2 transition-colors hover:bg-primary-hover ${
                                isActive("/")
                                    ? "border-blue-600 bg-primary-hover"
                                    : "border-transparent bg-white"
                            }`}
                        >
                            <span className="text-lg">
                                <FaDatabase />
                            </span>
                            <span className="font-medium">Data Scraping</span>
                        </Link>

                        <Link
                            to="/hasil-analisis"
                            className={`flex justify-center items-center space-x-2 text-primary py-4 px-4 border-b-2 transition-colors hover:bg-primary-hover ${
                                isActive("/hasil-analisis")
                                    ? "border-blue-600 bg-primary-hover"
                                    : "border-transparent bg-white"
                            }`}
                        >
                            <span className="text-lg">
                                <FaChartBar />
                            </span>
                            <span className="font-medium">Hasil Analisis</span>
                        </Link>

                        <Link
                            to="/panduan"
                            className={`flex justify-center items-center space-x-2 text-primary py-4 px-4 border-b-2 transition-colors hover:bg-primary-hover ${
                                isActive("/panduan")
                                    ? "border-blue-600 bg-primary-hover"
                                    : "border-transparent bg-white"
                            }`}
                        >
                            <span className="text-lg">
                                <FaQuestionCircle />
                            </span>
                            <span className="font-medium">Panduan</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
        <header className="hidden print:block">
            <h1 className="text-center font-semibold text-2xl my-1 pt-5">Hasil Analisis Sentimen Platform X</h1>
        </header>
        </>
    );
};

export default Header;
