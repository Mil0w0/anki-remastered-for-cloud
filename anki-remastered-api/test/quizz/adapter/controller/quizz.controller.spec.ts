// quizz.controller.spec.ts
import {QuizzService} from "../../../../src/quizz/services/quizz.service";
import {Card} from "../../../../src/cards/domain/card.entity";
import {Category} from "../../../../src/cards/domain/category.enum";
import {QuizzController} from "../../../../src/quizz/adapter/controller/quizz.controller";
import {DateService} from "../../../../src/utils/services/date.service";

describe('QuizzController', () => {
    let quizzController: QuizzController;
    let quizzService: QuizzService;

    beforeEach(async () => {
        jest.clearAllMocks();
        quizzService = {getEligibleCards: jest.fn()} as unknown as QuizzService;
        quizzController = new QuizzController(
            quizzService,
            new DateService()
        );
    });

    describe('getQuizz', () => {
        it('should return whatever quizzService.getEligibleCards() returns', async () => {
            // if it returns an empty array, it should return an empty array
            jest.spyOn(quizzService, 'getEligibleCards').mockResolvedValue([]);
            expect(await quizzController.getQuizz()).toEqual([]);

            // if it returns an array of cards, it should return that array
            const mockCards = [
                new Card(
                    '1',
                    Category.FIRST,
                    'Q1',
                    'A1',
                    'tag1'
                ),
                new Card(
                    '2',
                    Category.SECOND,
                    'Q2',
                    'A2',
                    'tag2'
                ),
            ];

            jest.spyOn(quizzService, 'getEligibleCardsAtDate').mockResolvedValue(mockCards);

            const result = await quizzController.getQuizz();

            expect(quizzService.getEligibleCards).toHaveBeenCalledTimes(2);
            expect(result).toBe(mockCards);
        });
    });
});
