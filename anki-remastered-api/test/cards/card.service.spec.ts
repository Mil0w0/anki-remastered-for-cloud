import { CardService } from '../../src/cards/services/card.service';
import { CardRepository } from '../../src/cards/domain/ports/card.repository';
import { Card } from '../../src/cards/domain/card.entity';
import { Category } from '../../src/cards/domain/category.enum';

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

    it('should level up the category of an existing card', async () => {
        const card = new Card(
            "1",
            Category.FIRST,
            "Question?",
            "Answer",
            "Tag"
        );
        cardRepository.findById.mockResolvedValue(card);
        cardRepository.save.mockResolvedValue(undefined);

        const updatedCard = await cardService.levelUpCardCategory("1");

        expect(cardRepository.findById).toHaveBeenCalledWith("1");
        expect(cardRepository.save).toHaveBeenCalledWith(card);
        expect(updatedCard?.category).toBe(Category.SECOND);
    });

    it('should return undefined if the card does not exist', async () => {
        cardRepository.findById.mockResolvedValue(undefined);

        const result = await cardService.levelUpCardCategory("non-existent-id");

        expect(cardRepository.findById).toHaveBeenCalledWith("non-existent-id");
        expect(cardRepository.save).not.toHaveBeenCalled();
        expect(result).toBeUndefined();
    });

    it('should throw an error if the category is already at the maximum level', async () => {
        const card = new Card(
            "1",
            Category.SEVENTH,
            "Question?",
            "Answer",
            "Tag"
        );
        cardRepository.findById.mockResolvedValue(card);

        await expect(cardService.levelUpCardCategory("1")).rejects.toThrow('Category is already at the maximum level');

        expect(cardRepository.findById).toHaveBeenCalledWith("1");
        expect(cardRepository.save).not.toHaveBeenCalled();
    });
});
