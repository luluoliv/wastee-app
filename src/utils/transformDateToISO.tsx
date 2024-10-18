export const transformDateToISO = (date: string) => {
    const [day, month, year] = date.split("/"); 
    return `${year}-${month}-${day}`; 
};
