export const formatCurrency = (value: string | undefined): string => {
    if (!value) {
        return "R$0,00";
    }
    const numericValue = parseFloat(value.replace(",", "."));

    if (isNaN(numericValue)) {
        return "R$0,00";
    }

    return `R$${numericValue.toFixed(2).replace(".", ",")}`;
};
