import {Card} from "../../src/cards/domain/card.entity";

describe('Card', () => {

    describe('levelUpCategory', () => {
        it('should return card with level two', async () => {
            const card = new Card(
                "1",
                "FIRST",
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            const expectedCard = new Card(
                "1",
                "SECOND",
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );

            expect(card.levelUpCategory()).toEqual(expectedCard);
        });

        it('should return card with level three', async () => {
            const card = new Card(
                "1",
                "SECOND",
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            const expectedCard = new Card(
                "1",
                "THIRD",
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );

            expect(card.levelUpCategory()).toEqual(expectedCard);
        });

        it('should return card with level four', async () => {
            const card = new Card(
                "1",
                "THIRD",
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            const expectedCard = new Card(
                "1",
                "FOURTH",
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );

            expect(card.levelUpCategory()).toEqual(expectedCard);
        });
    });

});