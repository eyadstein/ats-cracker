const capitalizeFirstLetter = (string) => {
    if (!string || typeof string !== "string") return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// SECURITY FIX: Don't pollute global String prototype
// Use as standalone function instead
export const capitalize = (str) => capitalizeFirstLetter(str);

function formatDateRange(startYear, endYear) {
    if (!startYear || startYear === "") return "";
    try {
        // Validate date is reasonable (between 1950 and 2050)
        const start = new Date(startYear);
        const end = new Date(endYear);
        const startYearNum = start.getFullYear();
        
        if (isNaN(start.getTime()) || startYearNum < 1950 || startYearNum > 2050) {
            return "";
        }
        
        const startFormatted = `${start.toLocaleString("default", { month: "short" })} ${startYearNum}`;
        const endFormatted = isNaN(end.getTime()) ? "Present" : `${end.toLocaleString("default", { month: "short" })} ${end.getFullYear()}`;
        return `${startFormatted} - ${endFormatted}`;
    } catch {
        return "";
    }
}

export { capitalizeFirstLetter, formatDateRange };
