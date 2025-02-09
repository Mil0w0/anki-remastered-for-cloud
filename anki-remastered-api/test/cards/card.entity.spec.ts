import {Card} from "../../src/cards/domain/card.entity";
import {Category} from "../../src/cards/domain/category.enum";

describe('Card', () => {

    describe('levelUpCategory', () => {
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

    describe('resetCategory', () => {
        it('should reset the category to FIRST', () => {
            const card = new Card(
                "1",
                Category.SEVENTH,
                "Who is that Pokemon?",
                "It's PIKACHU!",
                "Gaming"
            );
            card.resetCategory();

            expect(card.category).toBe(Category.FIRST);
        });
    });


    describe('answerQuestion', () => {
        it('should level up if answer is correct', () => {
            const card = new Card(
                "1",
                Category.FIRST,
                "Question?",
                "Answer",
                "Tag"
            );
            jest.spyOn(card, 'levelUpCategory');
            jest.spyOn(card, 'resetCategory');

            card.answerQuestion(true);

            expect(card.category).toBe(Category.SECOND);
            expect(card.levelUpCategory).toHaveBeenCalled();
            expect(card.resetCategory).not.toHaveBeenCalled();
        });

        it('should reset category if answer is incorrect', () => {
            const card = new Card(
                "1",
                Category.THIRD,
                "Question?",
                "Answer",
                "Tag"
            );
            jest.spyOn(card, 'resetCategory');
            jest.spyOn(card, 'levelUpCategory');

            card.answerQuestion(false);

            expect(card.category).toBe(Category.FIRST);
            expect(card.resetCategory).toHaveBeenCalled();
            expect(card.levelUpCategory).not.toHaveBeenCalled();
        });
    });
});