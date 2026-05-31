const capitalizeFirstLetter = (string) => {
    if (!string || typeof string !== "string") return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

String.prototype.capitalize = function () {
    return capitalizeFirstLetter(this);
}

function formatDateRange(startYear, endYear) {
    try {
        const start = new Date(startYear);
        const end = new Date(endYear);
        const startFormatted = `${start.toLocaleString("default", { month: "short" })} ${start.getFullYear()}`;
        const endFormatted = isNaN(end.getTime()) ? "Present" : `${end.toLocaleString("default", { month: "short" })} ${end.getFullYear()}`;
        return `${startFormatted} - ${endFormatted}`;
    } catch {
        return "";
    }
}

export { capitalizeFirstLetter, formatDateRange };
