import {CardController} from '../../src/cards/adapters/controller/card.controller';
import {CardService} from '../../src/cards/services/card.service';
import {CardRepository} from '../../src/cards/domain/ports/card.repository';
import {CreateCardDto} from '../../src/cards/domain/dto/createCard.dto';
import {Card} from '../../src/cards/domain/card.entity';
import {Category} from "../../src/cards/domain/category.enum";
import {AnswerCardDto} from "../../src/cards/domain/dto/answerCard.dto";

describe('CardController', () => {
    let cardController: CardController;
    let cardService: CardService;
    let cardRepository: jest.Mocked<CardRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        cardRepository = {save: jest.fn(), findById: jest.fn(), findAll: jest.fn()};
        cardService = new CardService(cardRepository);
        cardController = new CardController(cardService);
    });

    describe('createNewCard', () => {
        it('should return a new card with parameters', async () => {

            const createCardDto = new CreateCardDto(
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            const expectedResult = new Card(
                "1",
                Category.FIRST,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );

            (cardRepository.save as jest.Mock).mockResolvedValue(expectedResult);
            const createdCard = await cardController.createCard(createCardDto);
            expectedResult.id = createdCard.id;

            expect(createdCard).toEqual(expectedResult);
            expect(typeof createdCard.id).toBe('string');
            expect(createdCard.id).toHaveLength(36); //uuid length


            expect(cardRepository.save).toHaveBeenCalledWith(
                expect.objectContaining({
                    question: "Who is that Pokemon ?",
                    answer: "It's PIKACHU !",
                    tag: "Gaming",
                })
            );
        });
    });

    describe('getCardById', () => {
        it('should return an existing card with its information', async () => {
            const expectedCard = new Card(
                "1",
                Category.FIRST,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );

            (cardRepository.findById as jest.Mock).mockResolvedValue(expectedCard);
            const cardById = await cardController.getCardById(expectedCard.id);
            expect(cardById).toEqual(expectedCard);

            expect(cardRepository.findById).toHaveBeenCalledWith(expectedCard.id);
        });

        it('should throw an error if the card does not exist', async () => {
            const expectedResult = new Card(
                "1",
                Category.FIRST,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );

            (cardRepository.findById as jest.Mock).mockResolvedValue(undefined);
            await expect(
                cardController.getCardById(expectedResult.id)
            ).rejects.toThrow(
                'Card with id ' + expectedResult.id + ' not found'
            );
        });
    });

    describe('getAllCards', () => {
        it('should return all created cards', async () => {
            const expectedCards = [
                new Card(
                    "1",
                    Category.FIRST,
                    "Who is that Pokemon ?",
                    "It's PIKACHU !",
                    "Gaming"
                ),
                new Card(
                    "2",
                    Category.FIRST,
                    "Who is the best Pokemon",
                    "It's FARFETCH'D !",
                    "Gaming"
                ),
            ];

            (cardRepository.findAll as jest.Mock).mockResolvedValue(expectedCards);
            const cards = await cardController.getAllCards();
            expect(cards).toHaveLength(expectedCards.length);
            expect(cards).toEqual(expectedCards);

            expect(cardRepository.findAll).toHaveBeenCalled();
        });

        it('should return an empty array if no card has been created', async () => {
            (cardRepository.findAll as jest.Mock).mockResolvedValue([]);
            const cards = await cardController.getAllCards();
            expect(cards).toHaveLength(0);
            expect(cards).toEqual([]);

            expect(cardRepository.findAll).toHaveBeenCalled();
        });

        it('should return the cards with a specific tag', async () => {
            const expectedCards = [
                new Card(
                    "1",
                    Category.FIRST,
                    "Who is that Pokemon ?",
                    "It's PIKACHU !",
                    "Gaming"
                ),
                new Card(
                    "2",
                    Category.FIRST,
                    "What is the moon made of ?",
                    "Lotta Cheese",
                    "Astrology"
                ),
            ];

            (cardRepository.findAll as jest.Mock).mockResolvedValue(expectedCards);
            const cards = await cardController.getAllCards("Gaming");
            expect(cards).toHaveLength(1);
            expect(cards).toEqual([expectedCards[0]]);

            expect(cardRepository.findAll).toHaveBeenCalled();
        });
    });

    describe('answerCard', () => {
        it('should return 204', async () => {
            const cardId = 'card-123';
            const body: AnswerCardDto = {isValid: true};

            const result = await cardController.answerCard(cardId, body);

            expect(result).toBeUndefined();
        });
    });
});
