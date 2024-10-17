export const checkAge = (birthDate: string | null) => {
    if (!birthDate) return false;

    const [day, month, year] = birthDate.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    const birth = new Date(formattedDate);
    if (isNaN(birth.getTime())) {
        console.error('Data de nascimento inválida');
        return false;
    }
    
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    return (
        age > 18 ||
        (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
    );
};
