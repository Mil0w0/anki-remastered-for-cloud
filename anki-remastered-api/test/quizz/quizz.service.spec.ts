import {QuizzService} from '../../src/quizz/services/quizz.service';
import {Card} from "../../src/cards/domain/card.entity";
import {CardService} from "../../src/cards/services/card.service";
import {CardRepository} from "../../src/cards/domain/ports/card.repository";
import {Category} from "../../src/cards/domain/category.enum";
import {LocalDateUtils} from "../../src/utils/LocalDateUtils";


describe('QuizzService', () => {
    let quizzService: QuizzService;
    let cardRepository: jest.Mocked<CardRepository>;

    beforeEach(async () => {
        jest.clearAllMocks();
        // mock the card repository
        cardRepository = {save: jest.fn(), findById: jest.fn(), findAll: jest.fn()};
        const cardService = new CardService(cardRepository);
        quizzService = new QuizzService(cardService);
    });

    describe('getEligibleCards', () => {
        it('should return an array of cards', async () => {
            // mock the card repository to return an empty array
            cardRepository.findAll.mockResolvedValue([]);

            const cards = await quizzService.getEligibleCards();
            expect(cards).toBeInstanceOf(Array);
            // assert that the array contains only Card instances
            cards.forEach(card => {
                expect(card).toBeInstanceOf(Card);
            });
        });

        // create a card, then we should get it in the eligible cards
        it('should return newly created card', async () => {
            const cards = [new Card(
                "1",
                Category.FIRST,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            )];
            cardRepository.findAll.mockResolvedValue(cards);

            const result = await quizzService.getEligibleCards();
            expect(result[0]).toEqual(cards[0]);
        });

        // if the card last response date is today, it should not be returned
        it('should not return card with last response date today', async () => {
            const card = new Card(
                "1",
                Category.FIRST,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            card.lastResponseDate = LocalDateUtils.today();
            cardRepository.findAll.mockResolvedValue([card]);

            const result = await quizzService.getEligibleCards();
            expect(result).toEqual([]);
        });

        it('should return card with last response date yesterday and FIRST or SECOND category', async () => {
            const card = new Card(
                "1",
                Category.FIRST,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            card.lastResponseDate = LocalDateUtils.yesterday();
            cardRepository.findAll.mockResolvedValue([card]);

            const result = await quizzService.getEligibleCards();
            expect(result).toEqual([card]);

            card.category = Category.SECOND;

            const resultSecondCategory = await quizzService.getEligibleCards();
            expect(resultSecondCategory).toEqual([card]);
        });

        it('should not return card with last response date yesterday and THIRD category', async () => {
            const card = new Card(
                "1",
                Category.THIRD,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            card.lastResponseDate = LocalDateUtils.yesterday();
            cardRepository.findAll.mockResolvedValue([card]);

            const result = await quizzService.getEligibleCards();
            expect(result).toEqual([]);
        });

    });
});