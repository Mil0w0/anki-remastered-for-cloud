import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

//import { CardsController } from './../src/adapters/controller/cards.controller';
//import { CardsService } from './../src/services/cats.service';

describe('CardsController', () => {
  let cardsController: CardsController;
  let cardsService: CardsService;

  beforeEach(() => {
    cardsService = new CardsService();
    cardsController = new CardsController(cardsService);
  });

  describe('createNewCard', () => {
    it('should return a new card with parameters', async () => {
      const result = {
        "question": "Who is that Pokemon ?",
        "answer": "It's PIKACHU !",
        "tag": "Gaming"
      };
      jest.spyOn(cardsService, 'createNewCard').mockImplementation(() => result);

      expect(await cardsController.createNewCard()).toBe(result);
    });
  });
});
