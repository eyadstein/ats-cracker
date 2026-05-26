import React from 'react';

const CircularButton = ({ tooltipText, onClick, icon: Icon, iconColor = "text-white", bgColor, style, ...props }) => {
    return (
        <button
            className={`relative group ${bgColor} text-white rounded-full w-12 h-12 flex items-center justify-center
            shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${props.className}`}
            onClick={onClick}
        >
            {/* Tooltip */}
            <span
                className="absolute bottom-full mb-2 text-xs
                bg-gray-800 text-white px-3 py-1 rounded-md
                opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            >
                {tooltipText}
            </span>

            {/* Icon */}
            <Icon className={`w-5 h-5 ${iconColor}`} />
        </button>
    );
};

export default CircularButton;
