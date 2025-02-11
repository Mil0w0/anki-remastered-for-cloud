// quizz.controller.spec.ts
import {QuizzService} from "../../../../src/quizz/services/quizz.service";
import {Card} from "../../../../src/cards/domain/card.entity";
import {Category} from "../../../../src/cards/domain/category.enum";
import {QuizzController} from "../../../../src/quizz/adapter/controller/quizz.controller";
import {DateService} from "../../../../src/utils/services/date.service";
import {LocalDateUtils} from "../../../../src/utils/local.date.utils";

describe('QuizzController', () => {
    let quizzController: QuizzController;
    let quizzService: QuizzService;
    let dateService: DateService;

    beforeEach(async () => {
        jest.clearAllMocks();
        quizzService = {getEligibleCardsAtDate: jest.fn()} as unknown as QuizzService;
        dateService = new DateService();
        quizzController = new QuizzController(
            quizzService,
            dateService
        );
    });

    describe('getQuizz', () => {
        it('should return whatever quizzService.getEligibleCardsAtDate() returns', async () => {
            // if it returns an empty array, it should return an empty array
            jest.spyOn(quizzService, 'getEligibleCardsAtDate').mockResolvedValue([]);
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

            expect(quizzService.getEligibleCardsAtDate).toHaveBeenCalledTimes(2);
            expect(result).toBe(mockCards);
        });

        it('should call quizzService.getEligibleCardsAtDate with the parsed date', async () => {
            const date = '2021-01-01';
            const parsedDate = LocalDateUtils.fromString(date);

            jest.spyOn(DateService.prototype, 'parseDate').mockReturnValue(parsedDate);

            await quizzController.getQuizz(date);

            expect(quizzService.getEligibleCardsAtDate).toHaveBeenCalledWith(parsedDate);
            expect(DateService.prototype.parseDate).toHaveBeenCalledWith(date);
        });
    });
});
