import React from "react";

const Card = ({ children, className = "" }) => {
    return (
        <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};

export default Card;
