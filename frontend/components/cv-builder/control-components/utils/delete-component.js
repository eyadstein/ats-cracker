import React from 'react';
import { MdDelete } from "react-icons/md";

const DeleteComponent = ({ onClick }) => {
    return (
        <div className={"flex items-center"}>
            <button
                className={"border-none cursor-pointer appearance-none touch-manipulation flex items-center justify-center focus-visible:outline-blue-600 font-bold rounded-xl h-8 px-3 text-gray-700 hover:opacity-80"}
                onClick={onClick}
            >
                <MdDelete sx={{fontSize: 18}} />
            </button>
        </div>
    );
};

export default DeleteComponent;