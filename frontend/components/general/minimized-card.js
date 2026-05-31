import React, {useState} from 'react';
import {FaChevronDown, FaChevronUp, FaTrash, FaPen} from 'react-icons/fa';
import {deleteCv} from "@/actions/cvs";
import {useRouter} from "next/navigation";
import {showErrorAlert} from "@/lib/alerts";

// Helper to capitalize first letter (replaces .capitalize())
const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export default function MinimizedCard({id, name, completion, date, onUpdate}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(name);
    const router = useRouter();

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this CV?")) {
            const response = await deleteCv(id);
            if (response.success) {
                onUpdate();
            }
        }
    };

    const handleSave = async () => {
        setIsEditing(false);
        // Save title logic here
    };

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
            <div 
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold text-sm">
                        {capitalize(title || "").charAt(0)}
                    </div>
                    <div>
                        {!isExpanded ? (
                            <p className="truncate text-xl font-bold text-gray-800 max-w-[200px]">
                                {capitalize(title || "")}
                            </p>
                        ) : (
                            <input 
                                type="text" 
                                placeholder={capitalize(title || "")}
                                className="text-xl font-bold text-gray-800 border-b-2 border-pink-500 focus:outline-none bg-transparent w-full"
                                autoComplete="off"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        )}
                        <p className="text-xs text-gray-500 mt-0.5">{formattedDate}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end mr-2">
                        <span className="text-xs font-semibold text-gray-600">{completion}%</span>
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-pink-500 to-orange-400 rounded-full transition-all"
                                style={{width: `${completion}%`}}
                            />
                        </div>
                    </div>
                    {isExpanded ? <FaChevronUp className="text-gray-400"/> : <FaChevronDown className="text-gray-400"/>}
                </div>
            </div>
            
            {isExpanded && (
                <div className="px-4 pb-4 pt-0 flex gap-2 justify-end">
                    <button 
                        onClick={(e) => {e.stopPropagation(); setIsEditing(!isEditing);}}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                    >
                        <FaPen size={14}/>
                    </button>
                    <button 
                        onClick={(e) => {e.stopPropagation(); handleDelete();}}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                    >
                        <FaTrash size={14}/>
                    </button>
                </div>
            )}
        </div>
    );
}

