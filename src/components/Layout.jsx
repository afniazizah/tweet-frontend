import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col font-poppins bg-primary-bg">
            <Header />
            <main className="flex-grow">
                <div className="min-h-screen py-8">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">{children}</div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
