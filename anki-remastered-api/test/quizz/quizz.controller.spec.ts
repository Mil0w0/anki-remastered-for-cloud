// quizz.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import {QuizzService} from "../../src/quizz/services/quizz.service";
import {Card} from "../../src/cards/domain/card.entity";
import {Category} from "../../src/cards/domain/category.enum";

describe('QuizzController', () => {
    let quizzController: QuizzController;
    let quizzService: QuizzService;

    beforeEach(async () => {

    });

    it('should return whatever quizzService.getEligibleCards() returns', async () => {
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

        (quizzService.getEligibleCards as jest.Mock).mockResolvedValue(mockCards);

        const result = await quizzController.getQuizz();

        expect(quizzService.getEligibleCards).toHaveBeenCalledTimes(1);
        expect(result).toBe(mockCards);
    });
});
