export const getCurrentDate = () => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = (newDate.getMonth() + 1) % 13;
    let year = newDate.getFullYear();

    return `${year}-${month<10 ? `0${month}` : `${month}`}-${date}`;
};

export const getPreviousMonthDate = () => {
    let newDate = new Date();
    newDate.setMonth(newDate.getMonth() - 1);
    let date = newDate.getDate();
    let month = (newDate.getMonth() + 1) % 13;
    let year = newDate.getFullYear();

    return `${year}-${month<10 ? `0${month}` : `${month}`}-${date}`;
};

export const getPreviousWeekDate = () => {
    let newDate = new Date();
    newDate.setDate(newDate.getDate() - 7);
    let date = newDate.getDate();
    let month = (newDate.getMonth() + 1) % 13;
    let year = newDate.getFullYear();
    console.log(`${year}-${month<10 ? `0${month}` : `${month}`}-${date}`);
    return `${year}-${month<10 ? `0${month}` : `${month}`}-${date}`;
}

export const checkIfDateIsBetweenTwoDates = (minDate, maxDate, comparedDate) => {
    let minDateObject = new Date(minDate);
    minDateObject.setHours(0,0,0,0);
    let maxDateObject = new Date(maxDate);
    maxDateObject.setHours(0,0,0,0);
    let comparedDateObject = new Date(comparedDate);
    comparedDateObject.setHours(0,0,0,0);

    if (comparedDateObject.getTime()  <= maxDateObject.getTime() && comparedDateObject.getTime() >= minDateObject.getTime()) {
        return true;
    }
    return false; 
};

export const getPreviousCenturyDate = () => {
    let newDate = new Date();
    newDate.setFullYear(newDate.getFullYear() - 100);
    let date = newDate.getDate();
    let month = (newDate.getMonth() + 1) % 13;
    let year = newDate.getFullYear();

    return `${year}-${month<10 ? `0${month}` : `${month}`}-${date}`;
};

export const getMaxBirthDate = () => {
    let newDate = new Date();
    newDate.setFullYear(newDate.getFullYear() - 12);
    let date = newDate.getDate();
    let month = (newDate.getMonth() + 1) % 13;
    let year = newDate.getFullYear();

    return `${year}-${month<10 ? `0${month}` : `${month}`}-${date}`;
};

export const getNumberOfDaysBetweenTwoDates = (startDate, endDate) => {
    let startDateObject = new Date(startDate);
    let endDateObject = new Date(endDate);

    const oneDay = 1000 * 60 * 60 * 24;
    const returnValue = Math.round((endDateObject - startDateObject) / oneDay);
    return returnValue;
}