const PdfSave = ({ printDivId }) => {
    const printElement = document.getElementById(printDivId);
    if (!printElement) { console.error(`Element with id ${printDivId} not found.`); return; }

    const style = document.createElement("style");
    style.id = "__ats_print_style__";
    style.innerHTML = `
        @media print {
            @page { size: A4; margin: 0; }
            body * { visibility: hidden !important; }
            #${printDivId}, #${printDivId} * { visibility: visible !important; }
            #${printDivId} {
                position: absolute !important;
                top: 0 !important; left: 0 !important;
                width: 210mm !important;
                margin: 0 auto !important;
                background: white !important;
                transform: none !important;
                overflow: visible !important;
            }
            #${printDivId} .resumePage {
                transform: none !important;
                margin: 0 !important;
                box-shadow: none !important;
            }
        }
    `;
    document.head.appendChild(style);

    window.print();

    setTimeout(() => {
        const s = document.getElementById("__ats_print_style__");
        if (s) document.head.removeChild(s);
    }, 100);
};
export default PdfSave;
