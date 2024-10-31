export const formatCurrency = (value: string | undefined): string => {
    if (!value) {
        return "R$0,00";
    }

    const numericValue = parseFloat(value.replace(",", "."));

    if (isNaN(numericValue)) {
        return "R$0,00";
    }

    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numericValue);

    return formattedValue;
};
