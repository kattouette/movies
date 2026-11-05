export function validateTitle(title) {
    if (title === "") {
        return false;
    }
    return true;
}

export function validateYear(year) {
    const numberYear = Number(year);
    if (
        year === "" ||
        !Number.isInteger(numberYear) ||
        numberYear < 1900 ||
        numberYear > new Date().getFullYear()
    ) {
        return false;
    }
    return true;
}