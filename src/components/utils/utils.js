export const formatINR = (val) => {
    if (val === undefined || val === null || val === "") return "0.00";
    
    // Convert string to number and remove existing commas if any
    const numberValue = typeof val === 'string' 
        ? parseFloat(val.replace(/,/g, '')) 
        : val;

    if (isNaN(numberValue)) return "0.00";

    // Use 'en-IN' for the Indian Numbering System (2,00,000.00)
    return numberValue.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

export const formatDate = (dateStr) => {
    if (!dateStr) return "";
    // split the YYYY-MM-DD string
    const [year, month, day] = dateStr.split("-");
    // return in DD-MM-YYYY format
    return `${day}-${month}-${year}`;
}