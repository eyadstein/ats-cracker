const PdfSave = ({ printDivId }) => {
    const printElement = document.getElementById(printDivId);

    if (!printElement) {
        console.error(`Element with id ${printDivId} not found.`);
        return;
    }

    const printContents = printElement.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = `
        <div style="width: 210mm; margin: 0 auto;">
            ${printContents}
        </div>
    `;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
};

export default PdfSave;



