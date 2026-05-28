const PdfSave = ({ printDivId }) => {
    const printElement = document.getElementById(printDivId);
    if (!printElement) { console.error(`Element with id ${printDivId} not found.`); return; }

    const style = document.createElement("style");
    style.id = "__ats_print_style__";
    style.innerHTML = `
        @media print {
            body > *:not(#__ats_print_wrapper__) { display: none !important; }
            #__ats_print_wrapper__ {
                display: block !important;
                position: fixed;
                top: 0; left: 0;
                width: 210mm;
                margin: 0 auto;
                background: white;
                z-index: 99999;
            }
            @page { size: A4; margin: 10mm; }
        }
    `;
    document.head.appendChild(style);

    const wrapper = document.createElement("div");
    wrapper.id = "__ats_print_wrapper__";
    wrapper.innerHTML = printElement.innerHTML;
    document.body.appendChild(wrapper);

    window.print();

    document.head.removeChild(style);
    document.body.removeChild(wrapper);
};
export default PdfSave;
