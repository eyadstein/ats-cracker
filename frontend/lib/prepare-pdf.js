import React from 'react';

const WinPrintPDF = ({ printDivId }) => {
    const generatePDF = () => {
        const printElement = document.getElementById(printDivId);
        if (!printElement) {
            console.error(`Element with id ${printDivId} not found.`);
            return;
        }
        window.print();
    };

    return (
        <button
            aria-label="Download Resume"
            onClick={generatePDF}
            className="your-button-class"
        >
            Download PDF
        </button>
    );
};

export default WinPrintPDF;
