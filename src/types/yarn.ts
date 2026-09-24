export type YarnType = 'skeins' | 'balls' | 'hanks' | 'bobins';

export type Yarn = {
    id: string;
    name: string;
    material: string;
    lengthM: number;
    weightG: number;
    hookSize?: string;
    needleSize?: string;
    type: YarnType;
    quantity: number;
    notes?: string;
    photoUri?: string;
    archived: boolean;
    createdAt: string; //to getwhen added 
};
