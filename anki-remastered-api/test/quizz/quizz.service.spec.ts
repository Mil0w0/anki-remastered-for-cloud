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

        it('should return card with last response date as yesterday and FIRST category', async () => {
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
        });

        it('should not return card with last response date yesterday and SECOND category', async () => {
            const card = new Card(
                "1",
                Category.SECOND,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            card.lastResponseDate = LocalDateUtils.yesterday();
            cardRepository.findAll.mockResolvedValue([card]);

            const result = await quizzService.getEligibleCards();
            expect(result).toEqual([]);
        });

        it('should return card with last response date 2 days ago and SECOND or FIRST category', async () => {
            const card = new Card(
                "1",
                Category.SECOND,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            card.lastResponseDate = LocalDateUtils.daysAgo(2);
            cardRepository.findAll.mockResolvedValue([card]);

            const result = await quizzService.getEligibleCards();
            expect(result).toEqual([card]);

            card.category = Category.FIRST;
            cardRepository.findAll.mockResolvedValue([card]);

            const result2 = await quizzService.getEligibleCards();

            expect(result2).toEqual([card]);
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

        it('should return card with last response date 4 days ago and THIRD, SECOND or FIRST category', async () => {
            const card = new Card(
                "1",
                Category.THIRD,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            card.lastResponseDate = LocalDateUtils.daysAgo(4);
            cardRepository.findAll.mockResolvedValue([card]);

            const result = await quizzService.getEligibleCards();
            expect(result).toEqual([card]);

            card.category = Category.SECOND;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultSecondCategory = await quizzService.getEligibleCards();
            expect(resultSecondCategory).toEqual([card]);


            card.category = Category.FIRST;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultFirstCategory = await quizzService.getEligibleCards();
            expect(resultFirstCategory).toEqual([card]);
        });

        it('should not return card with last response date 4 days ago and FOURTH category', async () => {
            const card = new Card(
                "1",
                Category.FOURTH,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            card.lastResponseDate = LocalDateUtils.daysAgo(4);
            cardRepository.findAll.mockResolvedValue([card]);

            const result = await quizzService.getEligibleCards();
            expect(result).toEqual([]);
        });

        it('should return card with last response date 8 days ago and FOURTH, THIRD, SECOND or FIRST category', async () => {
            const card = new Card(
                "1",
                Category.FOURTH,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            card.lastResponseDate = LocalDateUtils.daysAgo(8);
            cardRepository.findAll.mockResolvedValue([card]);

            const result = await quizzService.getEligibleCards();
            expect(result).toEqual([card]);

            card.category = Category.THIRD;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultThirdCategory = await quizzService.getEligibleCards();
            expect(resultThirdCategory).toEqual([card]);

            card.category = Category.SECOND;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultSecondCategory = await quizzService.getEligibleCards();
            expect(resultSecondCategory).toEqual([card]);

            card.category = Category.FIRST;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultFirstCategory = await quizzService.getEligibleCards();
            expect(resultFirstCategory).toEqual([card]);
        });

        it('should not return card with last response date 8 days ago and FIFTH category', async () => {
            const card = new Card(
                "1",
                Category.FIFTH,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            card.lastResponseDate = LocalDateUtils.daysAgo(8);
            cardRepository.findAll.mockResolvedValue([card]);

            const result = await quizzService.getEligibleCards();
            expect(result).toEqual([]);
        });

        it('should return card with last response date 16 days ago and FIFTH, FOURTH, THIRD, SECOND or FIRST category', async () => {
            const card = new Card(
                "1",
                Category.FIFTH,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            card.lastResponseDate = LocalDateUtils.daysAgo(16);
            cardRepository.findAll.mockResolvedValue([card]);

            const result = await quizzService.getEligibleCards();
            expect(result).toEqual([card]);

            card.category = Category.FOURTH;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultFourthCategory = await quizzService.getEligibleCards();
            expect(resultFourthCategory).toEqual([card]);

            card.category = Category.THIRD;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultThirdCategory = await quizzService.getEligibleCards();
            expect(resultThirdCategory).toEqual([card]);

            card.category = Category.SECOND;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultSecondCategory = await quizzService.getEligibleCards();
            expect(resultSecondCategory).toEqual([card]);

            card.category = Category.FIRST;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultFirstCategory = await quizzService.getEligibleCards();
            expect(resultFirstCategory).toEqual([card]);
        });

        it('should not return card with last response date 16 days ago and SIXTH category', async () => {
            const card = new Card(
                "1",
                Category.SIXTH,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            card.lastResponseDate = LocalDateUtils.daysAgo(16);
            cardRepository.findAll.mockResolvedValue([card]);

            const result = await quizzService.getEligibleCards();
            expect(result).toEqual([]);
        });

        it('should return card with last response date 32 days ago and SIXTH, FIFTH, FOURTH, THIRD, SECOND or FIRST category', async () => {
            const card = new Card(
                "1",
                Category.SIXTH,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            card.lastResponseDate = LocalDateUtils.daysAgo(32);
            cardRepository.findAll.mockResolvedValue([card]);

            const result = await quizzService.getEligibleCards();
            expect(result).toEqual([card]);

            card.category = Category.FIFTH;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultFifthCategory = await quizzService.getEligibleCards();
            expect(resultFifthCategory).toEqual([card]);

            card.category = Category.FOURTH;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultFourthCategory = await quizzService.getEligibleCards();
            expect(resultFourthCategory).toEqual([card]);

            card.category = Category.THIRD;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultThirdCategory = await quizzService.getEligibleCards();
            expect(resultThirdCategory).toEqual([card]);

            card.category = Category.SECOND;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultSecondCategory = await quizzService.getEligibleCards();
            expect(resultSecondCategory).toEqual([card]);

            card.category = Category.FIRST;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultFirstCategory = await quizzService.getEligibleCards();
            expect(resultFirstCategory).toEqual([card]);
        });

        it('should not return card with last response date 32 days ago and SEVENTH category', async () => {
            const card = new Card(
                "1",
                Category.SEVENTH,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            card.lastResponseDate = LocalDateUtils.daysAgo(32);
            cardRepository.findAll.mockResolvedValue([card]);

            const result = await quizzService.getEligibleCards();
            expect(result).toEqual([]);
        });

        it('should return card with last response date 64 days ago and SEVENTH, SIXTH, FIFTH, FOURTH, THIRD, SECOND or FIRST category', async () => {
            const card = new Card(
                "1",
                Category.SEVENTH,
                "Who is that Pokemon ?",
                "It's PIKACHU !",
                "Gaming"
            );
            card.lastResponseDate = LocalDateUtils.daysAgo(64);
            cardRepository.findAll.mockResolvedValue([card]);

            const result = await quizzService.getEligibleCards();
            expect(result).toEqual([card]);

            card.category = Category.SIXTH;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultSixthCategory = await quizzService.getEligibleCards();
            expect(resultSixthCategory).toEqual([card]);

            card.category = Category.FIFTH;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultFifthCategory = await quizzService.getEligibleCards();
            expect(resultFifthCategory).toEqual([card]);

            card.category = Category.FOURTH;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultFourthCategory = await quizzService.getEligibleCards();
            expect(resultFourthCategory).toEqual([card]);

            card.category = Category.THIRD;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultThirdCategory = await quizzService.getEligibleCards();
            expect(resultThirdCategory).toEqual([card]);

            card.category = Category.SECOND;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultSecondCategory = await quizzService.getEligibleCards();
            expect(resultSecondCategory).toEqual([card]);

            card.category = Category.FIRST;
            cardRepository.findAll.mockResolvedValue([card]);

            const resultFirstCategory = await quizzService.getEligibleCards();
            expect(resultFirstCategory).toEqual([card]);
        });
    });
});