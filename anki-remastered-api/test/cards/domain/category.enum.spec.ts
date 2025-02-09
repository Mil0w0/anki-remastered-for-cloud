import {Category, getCategoryDelayInDays} from '../../../src/cards/domain/category.enum';

describe('Category Enum', () => {
    it('should have the correct values', () => {
        expect(Category.FIRST).toBe('FIRST');
        expect(Category.SECOND).toBe('SECOND');
        expect(Category.THIRD).toBe('THIRD');
        expect(Category.FOURTH).toBe('FOURTH');
        expect(Category.FIFTH).toBe('FIFTH');
        expect(Category.SIXTH).toBe('SIXTH');
        expect(Category.SEVENTH).toBe('SEVENTH');
        expect(Category.DONE).toBe('DONE');
    });
});

describe('getCategoryDelayInDays', () => {
    it('should return correct delay for each category', () => {
        expect(getCategoryDelayInDays(Category.FIRST)).toBe(1);
        expect(getCategoryDelayInDays(Category.SECOND)).toBe(2);
        expect(getCategoryDelayInDays(Category.THIRD)).toBe(4);
        expect(getCategoryDelayInDays(Category.FOURTH)).toBe(8);
        expect(getCategoryDelayInDays(Category.FIFTH)).toBe(16);
        expect(getCategoryDelayInDays(Category.SIXTH)).toBe(32);
        expect(getCategoryDelayInDays(Category.SEVENTH)).toBe(64);
    });

    it('should throw an error for an invalid category', () => {
        expect(() => getCategoryDelayInDays(Category.DONE)).toThrow('Category not supported or not implemented');
        expect(() => getCategoryDelayInDays('INVALID' as Category)).toThrow('Category not supported or not implemented');
    });
});
