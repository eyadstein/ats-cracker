'use client';
import { useState } from "react";


export default function ImageViewer() {
    const numberOfImages = 8;

    // Dynamically generate the image data for the gallery
    const data = Array.from({ length: numberOfImages }, (_, index) => ({
        imageLink: `/about/${index + 1}.png`, // Generate image link dynamically
    }));

    // State to manage the modal visibility and selected image
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Function to open the modal with the selected image
    const openModal = (imageLink) => {
        setSelectedImage(imageLink);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div>
            {/* Grid for images */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1">
                {data.map(({ imageLink }, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                        <img
                            className="w-full h-[500px] object-cover rounded-lg cursor-pointer"
                            src={imageLink}
                            alt={`gallery-photo-${index + 1}`}
                            onClick={() => openModal(imageLink)} // Open modal on image click
                        />
                    </div>
                ))}
            </div>

            {/* Modal for full image view */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
                    onClick={closeModal} // Close modal when clicking outside of the image
                >
                    <div className="relative">
                        <img
                            className="max-w-full max-h-screen object-contain rounded-lg"
                            src={selectedImage}
                            alt="Full view"
                        />
                        {/* Close button */}
                        <button
                            className="absolute top-2 right-2 text-white font-bold text-xl"
                            onClick={closeModal}
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}