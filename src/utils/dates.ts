export const formatShort = (iso: string) => {
    const date = new Date(iso);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    return `${day}/${month}/${year}`;
};

export const formatMonthYear = (iso: string) => {
    const date = new Date(iso);
    return `${date.toLocaleDateString('en-GB', { month: 'long' })}, ${date.getFullYear()}`;
};

//"T" is a placeholder for whatever type you pass in
export const groupByMonth = <T>(items: T[], getDate: (item: T) => string) => {
    const groups: { title: string; items: T[] }[] = [];
    items.forEach((item) => {
        const title = formatMonthYear(getDate(item));
        const group = groups.find((existing) => existing.title === title);
        if (group) group.items.push(item);
        else groups.push({ title, items: [item] });
    });
    return groups;
};