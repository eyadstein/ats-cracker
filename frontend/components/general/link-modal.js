import React, { useState, useRef, useEffect } from 'react';

function isValidUrl(string) {
    try {
        const url = new URL(string);
        // Only allow http and https protocols
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

function LinkModal({ link, setLink, divRef, isModalOpen, setIsModalOpen }) {
    const inputRef = useRef(null);
    const [modalStyle, setModalStyle] = useState({});
    const [localLink, setLocalLink] = useState(link);
    const [error, setError] = useState("");

    const handleCloseModal = () => {
        setError("");
        setIsModalOpen(false);
    };

    const handleAddLink = () => {
        if (!localLink.trim()) {
            setError("Please enter a URL");
            return;
        }
        
        // Auto-add https:// if missing
        let url = localLink.trim();
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        if (!isValidUrl(url)) {
            setError("Please enter a valid URL (http:// or https://)");
            return;
        }
        
        setLink(url);
        setError("");
        setIsModalOpen(false);
    }

    useEffect(() => {
        setLocalLink(link);
        setError("");
    }, [link]);

    return (
        <>
            {isModalOpen && (
                <div
                    style={modalStyle}
                    className="box shadow-add border-inputBackground shadow-addLinkPopup absolute
          z-[1000] flex w-[280px] flex-col border border-solid bg-white p-4 md:w-[320px]"
                >
                    <label className="text-primaryBlack mb-[2.5px] ml-[11px] inline-block w-full text-[14px] font-bold md:text-[15px]">
                        <span>Add Link</span>
                    </label>
                    <input type="text" placeholder="Enter Link (https://...)"
                        className="h-12 w-full appearance-none rounded-lg text-base leading-normal shadow-none outline-none md:text-[17px] font-sans m-0 placeholder-inputPlaceholder bg-inputBackground border border-solid border-inputBorder text-inputText p-2.5"
                        autoComplete="off"
                        value={localLink}
                        onChange={(e) => {
                            setLocalLink(e.target.value);
                            setError("");
                        }}
                        ref={inputRef} />
                    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        <button type="button" onClick={handleCloseModal}
                            className="cursor-pointer appearance-none touch-manipulation flex items-center justify-center focus-visible:outline-blue-600 hover:opacity-80 px-7 py-2 rounded-full font-extrabold text-[15px] min-w-[120px] text-primaryBlack border border-solid border-gray-200 h-8">
                            Cancel
                        </button>
                        <button
                            onClick={handleAddLink}
                            type="button"
                            className="border-none cursor-pointer appearance-none touch-manipulation flex items-center justify-center focus-visible:outline-blue-600 hover:opacity-80 px-7 py-2 rounded-full font-extrabold text-[15px] min-w-[120px] text-white bg-gradientPinkRed h-8">
                            Add
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default LinkModal;
