import { CardService } from '../../src/cards/services/card.service';
import { CardRepository } from '../../src/cards/domain/ports/card.repository';
import { Card } from '../../src/cards/domain/card.entity';
import { Category } from '../../src/cards/domain/category.enum';
import {NotFoundException} from "@nestjs/common";

describe('CardService', () => {
    let cardService: CardService;
    let cardRepository: jest.Mocked<CardRepository>;

    beforeEach(() => {
        cardRepository = {
            findById: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn()
        } as unknown as jest.Mocked<CardRepository>;

        cardService = new CardService(cardRepository);
    });

    describe('answerCard', () => {

        it('should throw NotFoundException if card does not exist', async () => {
            cardRepository.findById.mockResolvedValue(undefined);

            await expect(
                cardService.answerCard('nonexistent-card-id', true),
            ).rejects.toThrow(NotFoundException);
        });

        it('should call answerQuestion on found card', async () => {
            const existingCard = new Card(
                'card-123',
                Category.FIRST,
                'Question?',
                'Answer',
                'SomeTag'
            );
            jest.spyOn(existingCard, 'answerQuestion');

            cardRepository.findById.mockResolvedValue(existingCard);

            await cardService.answerCard('card-123', true);

            expect(existingCard.answerQuestion).toHaveBeenCalledWith(true);
        });
    });


});
