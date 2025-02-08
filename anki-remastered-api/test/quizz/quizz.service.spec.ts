import { QuizzService } from '../../src/quizz/services/quizz.service';
import {Card} from "../../src/cards/domain/card.entity";


describe('QuizzService', () => {
    let quizzService: QuizzService;

    beforeEach(async () => {
        quizzService = new QuizzService();
    });

    describe('getEligibleCards', () => {
        it('should return an array of cards', async () => {
            const cards = await quizzService.getEligibleCards();
            expect(cards).toBeInstanceOf(Array);
            // assert that the array contains only Card instances
            cards.forEach(card => {
                expect(card).toBeInstanceOf(Card);
            });
        });
    });
});