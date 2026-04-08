export const formatINR = (val) => {
    if (val === undefined || val === null) return "0.00";
    return val.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
};


export const formatDate = (dateStr) => {
    if (!dateStr) return "";
    // split the YYYY-MM-DD string
    const [year, month, day] = dateStr.split("-");
    // return in DD-MM-YYYY format
    return `${day}-${month}-${year}`;
}