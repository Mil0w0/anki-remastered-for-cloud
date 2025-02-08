import {Card} from "../../src/cards/domain/card.entity";
import {Category} from "../../src/cards/domain/category.enum";

describe('Card', () => {

    describe('levelUpCategory', () => {
        it('should return card with level two', async () => {
            const card = new Card(
                "1",
                Category.FIRST,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            const expectedCard = new Card(
                "1",
                Category.SECOND,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );

            expect(card.levelUpCategory()).toEqual(expectedCard);
        });

        it('should return card with level three', async () => {
            const card = new Card(
                "1",
                Category.SECOND,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            const expectedCard = new Card(
                "1",
                Category.THIRD,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );

            expect(card.levelUpCategory()).toEqual(expectedCard);
        });

        it('should return card with level four', async () => {
            const card = new Card(
                "1",
                Category.THIRD,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            const expectedCard = new Card(
                "1",
                Category.FOURTH,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );

            expect(card.levelUpCategory()).toEqual(expectedCard);
        });
    });

});