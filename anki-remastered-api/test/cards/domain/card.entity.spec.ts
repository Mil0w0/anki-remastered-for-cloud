import {Card} from "../../../src/cards/domain/card.entity";
import {Category} from "../../../src/cards/domain/category.enum";
import {LocalDateUtils} from "../../../src/utils/local.date.utils";

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
            const expectedTransitions: Category[] = [
                Category.SECOND,
                Category.THIRD,
                Category.FOURTH,
                Category.FIFTH,
                Category.SIXTH,
                Category.SEVENTH,
                Category.DONE,
            ];

            jest.spyOn(card, 'levelUpCategory');

            for (const nextCategory of expectedTransitions) {
                const newCard = card.levelUpCategory();

                expect(newCard.category).toBe(nextCategory);
            }

            expect(card.levelUpCategory).toHaveBeenCalledTimes(7);
            expect(card.category).toBe(Category.DONE);
        });

        it('should throw error when category is already DONE', () => {
            const card = new Card(
                "1",
                Category.DONE,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );

            expect(() => card.levelUpCategory()).toThrow('Card category is already DONE');
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

        it('should throw an error if the category is already DONE', () => {
            const card = new Card(
                "1",
                Category.DONE,
                "Question?",
                "Answer",
                "Tag"
            );

            expect(() => card.answerQuestion(true)).toThrow('Card category is already DONE');
        });

        it('should set the date of the last test as today no matter the answer', () => {
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

            expect(card.lastResponseDate).toEqual(LocalDateUtils.today());

            card.lastResponseDate = null;
            card.answerQuestion(false);

            expect(card.lastResponseDate).toEqual(LocalDateUtils.today());
        });
    });
});