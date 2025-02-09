export enum Category {
    FIRST = 'FIRST',
    SECOND = 'SECOND',
    THIRD = 'THIRD',
    FOURTH = 'FOURTH',
    FIFTH = 'FIFTH',
    SIXTH = 'SIXTH',
    SEVENTH = 'SEVENTH',
    DONE = 'DONE'
}

export function getCategoryDelayInDays(category: Category): number {
    switch (category) {
        case Category.FIRST:
            return 1;
        case Category.SECOND:
            return 2;
        case Category.THIRD:
            return 4;
        case Category.FOURTH:
            return 8;
        case Category.FIFTH:
            return 16;
        case Category.SIXTH:
            return 32;
        case Category.SEVENTH:
            return 64;
        default:
            throw new Error('Category not supported or not implemented');
    }
}