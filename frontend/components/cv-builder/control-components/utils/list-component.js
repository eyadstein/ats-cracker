import React from 'react';
import { FaList } from "react-icons/fa";

const ListComponent = ({ onClick }) => {
    return (
        <div className={"mr-4 flex h-8 w-6 cursor-move items-center justify-center text-gray-500 "}>
            <button
                className={"border-none cursor-pointer appearance-none touch-manipulation flex items-center justify-center focus-visible:outline-blue-600 font-bold rounded-xl h-8 px-3 text-gray-700 hover:opacity-80"}
                onClick={onClick}
            >
                <FaList sx={{fontSize: 18}} />
            </button>
        </div>
    );
};

export default ListComponent;