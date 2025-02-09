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


});
