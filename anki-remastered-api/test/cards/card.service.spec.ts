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
            // Arrange
            cardRepository.findById.mockResolvedValue(undefined);

            // Act & Assert
            await expect(
                cardService.answerCard('nonexistent-card-id', true),
            ).rejects.toThrow(NotFoundException);
        });
    });


});
