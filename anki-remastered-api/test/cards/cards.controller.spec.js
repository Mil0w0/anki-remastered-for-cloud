"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_controller_1 = require("./../../src/cards/adapters/controller/card.controller");
const card_service_1 = require("./../../src/cards/services/card.service");
const createCard_dto_1 = require("../../src/cards/domain/dto/createCard.dto");
const card_entity_1 = require("../../src/cards/domain/card.entity");
describe('CardController', () => {
    let cardController;
    let cardService;
    let cardRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        cardRepository = { save: jest.fn(), findById: jest.fn(), findAll: jest.fn() };
        cardService = new card_service_1.CardService(cardRepository);
        cardController = new card_controller_1.CardController(cardService);
    });
    describe('createNewCard', () => {
        it('should return a new card with parameters', async () => {
            const createCardDto = new createCard_dto_1.CreateCardDto("Who is that Pokemon ?", "It's PIKACHU !", "Gaming");
            const expectedResult = new card_entity_1.Card("1", "FIRST", "Who is that Pokemon ?", "It's PIKACHU !", "Gaming");
            cardRepository.save.mockResolvedValue(expectedResult);
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
            const expectedResult = new card_entity_1.Card("1", "FIRST", "Who is that Pokemon ?", "It's PIKACHU !", "Gaming");
            cardRepository.findById.mockResolvedValue(expectedResult);
            const cardById = await cardController.getCardById(expectedResult.id);
            expect(cardById).toEqual(expectedResult);
            expect(cardRepository.findById).toHaveBeenCalledWith(expectedResult.id);
        });
        it('should throw an error if the card does not exist', async () => {
            const expectedResult = new card_entity_1.Card("1", "FIRST", "Who is that Pokemon ?", "It's PIKACHU !", "Gaming");
            cardRepository.findById.mockResolvedValue(undefined);
            expect(cardController.getCardById(expectedResult.id)).rejects.toThrow('Card with id ' + expectedResult.id + ' not found');
        });
    });
    describe('getAllCards', () => {
        it('should return all created cards', async () => {
            const expectedResult1 = new card_entity_1.Card("1", "FIRST", "Who is that Pokemon ?", "It's PIKACHU !", "Gaming");
            const expectedResult2 = new card_entity_1.Card("2", "FIRST", "Who is the best Pokemon", "It's FARFETCH'D !", "Gaming");
            cardRepository.findAll.mockResolvedValue([expectedResult1, expectedResult2]);
            const cards = await cardController.getAllCards();
            expect(cards).toHaveLength(2);
            expect(cards).toEqual([expectedResult1, expectedResult2]);
            expect(cardRepository.findAll).toHaveBeenCalled();
        });
        it('should return an empty array if no card has been created', async () => {
            cardRepository.findAll.mockResolvedValue([]);
            const cards = await cardController.getAllCards();
            expect(cards).toHaveLength(0);
            expect(cards).toEqual([]);
            expect(cardRepository.findAll).toHaveBeenCalled();
        });
        it('should return the cards with a specific tag', async () => {
            const expectedResult1 = new card_entity_1.Card("1", "FIRST", "Who is that Pokemon ?", "It's PIKACHU !", "Gaming");
            const expectedResult2 = new card_entity_1.Card("2", "FIRST", "What is the moon made of ?", "Lotta Cheese", "Astrology");
            cardRepository.findAll.mockResolvedValue([expectedResult1, expectedResult2]);
            const cards = await cardController.getAllCards("Gaming");
            expect(cards).toHaveLength(1);
            expect(cards).toEqual([expectedResult1]);
            expect(cardRepository.findAll).toHaveBeenCalled;
        });
    });
});
