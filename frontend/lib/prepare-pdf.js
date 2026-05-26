import React from 'react';
import { jsPDF } from 'jspdf';

const WinPrintPDF = ({ printDivId }) => {
    const generatePDF = () => {
        const printContents = document.getElementById(printDivId).innerHTML;

        // Create a new jsPDF instance with A4 size (210mm x 297mm)
        const doc = new jsPDF('p', 'mm', 'a4');

        // Use html method with scaling to fit the content in the PDF
        doc.html(printContents, {
            callback: function (doc) {
                doc.save('resume.pdf');
            },
            margin: [10, 10, 10, 10], // margin: [top, left, bottom, right]
            x: 10, // horizontal starting position
            y: 10, // vertical starting position
            html2canvas: {
                scale: 2, // increases resolution for images and content
                logging: false, // prevents console logs from cluttering
            },
            width: 180, // set content width to leave margins (A4 - margins)
        });
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
