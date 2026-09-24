export type ProjectStep = {
    id: string;
    title: string;
    done: boolean;
};

export type Project = {
    id: string;
    name: string;
    craft: 'knitting' | 'crochet';
    status: 'active' | 'finished';
    createdAt: string;
    hookNeedleSize: string;
    stitches: string;
    steps: ProjectStep[];
};

export const projects: Project[] = [
    {
        id: '1',
        name: 'Cozy bulky sweater',
        craft: 'knitting',
        status: 'active',
        createdAt: '2026-09-05',
        hookNeedleSize: '4mm',
        stitches: 'Stockinette, 1x1 ribbing',
        steps: [
            { id: 's1', title: 'Ribbing', done: true },
            { id: 's2', title: 'Bodice', done: true },
            { id: 's3', title: 'Sleeves', done: false },
            { id: 's4', title: 'Collar', done: false },
        ],
    },
    {
        id: '2',
        name: 'Granny square bag',
        craft: 'crochet',
        status: 'active',
        createdAt: '2026-09-12',
        hookNeedleSize: '5mm',
        stitches: 'Double crochet',
        steps: [
            { id: 's1', title: 'Squares', done: false },
            { id: 's2', title: 'Joining', done: false },
        ],
    },
    {
        id: '3',
        name: 'Striped scarf',
        craft: 'knitting',
        status: 'finished',
        createdAt: '2026-08-01',
        hookNeedleSize: '6mm',
        stitches: 'Garter stitch',
        steps: [{ id: 's1', title: 'Knit scarf', done: true }],
    },
];