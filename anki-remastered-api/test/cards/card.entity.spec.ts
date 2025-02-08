import {Card} from "../../src/cards/domain/card.entity";
import {Category} from "../../src/cards/domain/category.enum";

describe('Card', () => {

    it('should return card with the next category level', () => {
        const card = new Card(
            "1",
            Category.FIRST,
            "Who is that Pokemon ?",
            "It's PIKACHU !",
            "Gaming"
        );
        const categories: Category[] = Object.values(Category);
        expect(categories.length).toBe(7);

        for (let i = 0; i < 6; i++) {
            let expectedCard = new Card(
                "1",
                categories[i + 1],
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            expect(card.levelUpCategory()).toEqual(expectedCard);
        }

        expect(card.category).toBe(Category.SEVENTH);
    });

    it('should throw error when category is already at the max level', () => {
        const card = new Card(
            "1",
            Category.SEVENTH,
            "Who is that Pokemon ?",
            "It's PIKACHU !",
            "Gaming"
        );

        expect(() => card.levelUpCategory()).toThrow('Category is already at the maximum level');
    });

});