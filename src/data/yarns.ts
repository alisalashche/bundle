export type Yarn = {
    id: string;
    name: string;
    material: string;
    quantity: number;
};

export const yarns: Yarn[] = [
    { id: '1', name: 'Corel cotton', material: 'Cotton', quantity: 8 },
    { id: '2', name: 'Merino soft', material: 'Merino wool', quantity: 3 },
    { id: '3', name: 'Chunky wool', material: 'Wool', quantity: 5 },
];