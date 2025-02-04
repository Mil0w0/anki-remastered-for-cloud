import { CardController } from './../../src/cards/adapters/controller/card.controller';
import { CardService } from './../../src/cards/services/card.service';
import { CardRepository } from '../../src/cards/domain/ports/card.repository';
import { CreateCardDto } from '../../src/cards/domain/dto/createCard.dto';
import { Card } from '../../src/cards/domain/card.entity';

describe('CardController', () => {
  let cardController: CardController;
  let cardService: CardService;
  let cardRepository: jest.Mocked<CardRepository>;

  beforeEach(() => {
    cardRepository = { save: jest.fn() };
    cardService = new CardService(cardRepository);
    cardController = new CardController(cardService);
  });

  describe('createNewCard', () => {
    it('should return a new card with parameters', async () => {

      const createCardDto = new CreateCardDto("Who is that Pokemon ?", "It's PIKACHU !", "Gaming");
      const expectedResult = new Card("1", "FIRST", "Who is that Pokemon ?", "It's PIKACHU !", "Gaming");

      (cardRepository.save as jest.Mock).mockResolvedValue(expectedResult);
      const createdCard = await cardController.createCard(createCardDto);
      expectedResult.id = createdCard.id;

      expect(createdCard).toEqual(expectedResult);
      expect(typeof createdCard.id).toBe('string');
      expect(createdCard.id).toHaveLength(36);


      expect(cardRepository.save).toHaveBeenCalledWith(expect.objectContaining({
        question: "Who is that Pokemon ?",
        answer: "It's PIKACHU !",
        tag: "Gaming",
      }));
    });
  });
});
