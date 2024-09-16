export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const isISODate = /^\d{4}-\d{2}-\d{2}$/.test(dateString);

    if (isISODate) {
        const day = date.getDate();
        const month = date.toLocaleDateString("pt-BR", { month: "short" });
        const year = date.getFullYear().toString().slice(-2);
        return `${day} ${month} ${year}`;
    }

    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
