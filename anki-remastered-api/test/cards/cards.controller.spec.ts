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
    jest.clearAllMocks();
    cardRepository = { save: jest.fn(), findById: jest.fn(), findAll: jest.fn() };
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

  describe('getCardById', () => {
    it('should return an exisiting card with it informations', async () => {
      const expectedResult = new Card("1", "FIRST", "Who is that Pokemon ?", "It's PIKACHU !", "Gaming");

      (cardRepository.findById as jest.Mock).mockResolvedValue(expectedResult);
      const cardById = await cardController.getCardById(expectedResult.id);
      expect(cardById).toEqual(expectedResult);

      expect(cardRepository.findById).toHaveBeenCalledWith(expectedResult.id);
    });
    it('should throw an error if the card does not exist', async () => {
      const expectedResult = new Card("1", "FIRST", "Who is that Pokemon ?", "It's PIKACHU !", "Gaming");

      (cardRepository.findById as jest.Mock).mockResolvedValue(undefined);
      expect(cardController.getCardById(expectedResult.id)).rejects.toThrow('Card with id ' + expectedResult.id + ' not found');
    });
  });
  describe('getAllCards', () => {
    it('should return all created cards', async () => {
      const expectedResult1 = new Card("1", "FIRST", "Who is that Pokemon ?", "It's PIKACHU !", "Gaming");
      const expectedResult2 = new Card("2", "FIRST", "Who is the best Pokemon", "It's FARFETCH'D !", "Gaming");

      (cardRepository.findAll as jest.Mock).mockResolvedValue([expectedResult1, expectedResult2]);
      const cards = await cardController.getAllCards();
      expect(cards).toHaveLength(2);
      expect(cards).toEqual([expectedResult1, expectedResult2]);

      expect(cardRepository.findAll).toHaveBeenCalled();
    });
  });
});
