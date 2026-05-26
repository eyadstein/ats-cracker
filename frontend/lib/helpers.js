const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
// Extend string prototype to capitalize first letter

String.prototype.capitalize = function () {
    return capitalizeFirstLetter(this);
}

function formatDateRange(startYear, endYear) {
    const start = new Date(startYear);
    const end = new Date(endYear);

    const startFormatted = `${start.toLocaleString('default', { month: 'short' })} ${start.getFullYear()}`;
    const endFormatted = end != "Invalid Date" ? `${end.toLocaleString('default', { month: 'short' })} ${end.getFullYear()}` : 'Present';

    return `${startFormatted} - ${endFormatted}`;
}

export { capitalizeFirstLetter,formatDateRange };