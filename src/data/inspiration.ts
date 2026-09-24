export type Inspiration = {
    id: string;
    title: string;
    category: 'patterns' | 'tutorials' | 'products' | 'pictures';
    link?: string;
    notes?: string;
};

export const inspiration: Inspiration[] = [
    { id: '1', title: 'Textured stitch', category: 'patterns', link: 'https://example.com', notes: 'Try for the next scarf' },
    { id: '2', title: 'Magic ring tutorial', category: 'tutorials' },
    { id: '3', title: 'Bamboo needles', category: 'products' },
];