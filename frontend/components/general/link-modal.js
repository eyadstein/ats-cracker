import React, { useState, useRef, useEffect } from 'react';

function LinkModal({link,setLink, divRef, isModalOpen, setIsModalOpen }) {
    const inputRef = useRef(null);
    const [modalStyle, setModalStyle] = useState({});
    const [localLink, setLocalLink] = useState(link);


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddLink = () => {
        setLink(inputRef.current.value);
        setIsModalOpen(false);

    }



    useEffect(() => {
        setLocalLink(link);
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
                    <input type="text" placeholder="Enter Link"
                           className="h-12 w-full appearance-none rounded-lg text-base leading-normal shadow-none outline-none md:text-[17px] font-sans m-0 placeholder-inputPlaceholder bg-inputBackground border border-solid border-inputBorder text-inputText p-2.5"
                           autoComplete="off"
                           value={localLink}
                           onChange={(e) => setLocalLink(e.target.value)}
                           ref={inputRef}/>
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