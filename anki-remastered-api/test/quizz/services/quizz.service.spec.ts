import {QuizzService} from '../../../src/quizz/services/quizz.service';
import {Card} from "../../../src/cards/domain/card.entity";
import {CardService} from "../../../src/cards/services/card.service";
import {CardRepository} from "../../../src/cards/domain/ports/card.repository";
import {Category} from "../../../src/cards/domain/category.enum";
import {LocalDateUtils} from "../../../src/utils/local.date.utils";
import {CardRepositoryImpl} from "../../../src/cards/adapters/db/card.repository.impl";
import {InMemoryQuizzRepository} from "../../../src/quizz/adapter/db/inMemoryQuizz.repository.impl";


describe('QuizzService', () => {
    let quizzService: QuizzService;
    let cardRepository: jest.Mocked<CardRepository>;

    beforeEach(async () => {
        jest.clearAllMocks();
        // mock the card repository
        cardRepository = {save: jest.fn(), findById: jest.fn(), findAll: jest.fn()};
        const cardService = new CardService(cardRepository);
        const quizzRepository = new InMemoryQuizzRepository();
        quizzService = new QuizzService(cardService, quizzRepository);
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

        /**
         * Table of scenarios:
         * "daysAgo" -> how many days in the past `lastResponseDate` is
         * "category" -> the card's category
         * "expected" -> boolean, whether we expect it to be returned
         * "description" -> optional short description
         */
        it.each`
              daysAgo | category               | expected   | description
              // Newly created card
              ${null} | ${Category.FIRST}      | ${true}    | ${'no last response date -> should be returned'}
              
              // Category.FIRST checks
              ${0}    | ${Category.FIRST}      | ${false}   | ${'last response is today for FIRST -> not returned'}
              ${1}    | ${Category.FIRST}      | ${true}    | ${'last response is yesterday for FIRST -> returned'}
              ${2}    | ${Category.FIRST}      | ${true}    | ${'2 days ago for FIRST -> returned'}
              
              // Category.SECOND checks
              ${1}    | ${Category.SECOND}     | ${false}   | ${'last response is yesterday for SECOND -> not returned'}
              ${2}    | ${Category.SECOND}     | ${true}    | ${'2 days ago for SECOND -> returned'}
              ${4}    | ${Category.SECOND}     | ${true}    | ${'4 days ago for SECOND -> returned'}
              
              // Category.THIRD checks
              ${2}    | ${Category.THIRD}      | ${false}   | ${'2 days ago for THIRD -> not returned'}
              ${4}    | ${Category.THIRD}      | ${true}    | ${'4 days ago for THIRD -> returned'}
              ${8}    | ${Category.THIRD}      | ${true}    | ${'8 days ago for THIRD -> returned'}
              
              // Category.FOURTH checks
              ${4}    | ${Category.FOURTH}     | ${false}   | ${'4 days ago for FOURTH -> not returned'}
              ${8}    | ${Category.FOURTH}     | ${true}    | ${'8 days ago for FOURTH -> returned'}
              ${16}   | ${Category.FOURTH}     | ${true}    | ${'16 days ago for FOURTH -> returned'}
              
              // Category.FIFTH checks
              ${8}    | ${Category.FIFTH}      | ${false}   | ${'8 days ago for FIFTH -> not returned'}
              ${16}   | ${Category.FIFTH}      | ${true}    | ${'16 days ago for FIFTH -> returned'}
              ${32}   | ${Category.FIFTH}      | ${true}    | ${'32 days ago for FIFTH -> returned'}
              
              // Category.SIXTH checks
              ${16}   | ${Category.SIXTH}      | ${false}   | ${'16 days ago for SIXTH -> not returned'}
              ${32}   | ${Category.SIXTH}      | ${true}    | ${'32 days ago for SIXTH -> returned'}
              ${64}   | ${Category.SIXTH}      | ${true}    | ${'64 days ago for SIXTH -> returned'}
              
              // Category.SEVENTH checks
              ${32}   | ${Category.SEVENTH}    | ${false}   | ${'32 days ago for SEVENTH -> not returned'}
              ${64}   | ${Category.SEVENTH}    | ${true}    | ${'64 days ago for SEVENTH -> returned'}
              ${128}  | ${Category.SEVENTH}    | ${true}    | ${'128 days ago for SEVENTH -> returned'}
              
              // Category.DONE checks
              ${64}   | ${Category.DONE}       | ${false}   | ${'64 days ago for DONE -> not returned'}$
              ${128}  | ${Category.DONE}       | ${false}   | ${'128 days ago for DONE -> not returned'}$
              ${null} | ${Category.DONE}       | ${false}   | ${'no last response date for DONE -> not returned'}$
            `(
            '($description) -> daysAgo=$daysAgo, category=$category => expected=$expected',
            async ({daysAgo, category, expected}) => {
                // Create the card
                const card = new Card(
                    "1",
                    category,
                    "Who is that Pokemon ?",
                    "It's PIKACHU !",
                    "Gaming"
                );

                // If daysAgo is null, we'll interpret that as "never answered"
                if (daysAgo !== null) {
                    card.lastResponseDate = LocalDateUtils.daysAgo(daysAgo);
                } else {
                    card.lastResponseDate = null;
                }

                cardRepository.findAll.mockResolvedValue([card]);

                const result = await quizzService.getEligibleCards();
                if (expected) {
                    expect(result).toEqual([card]);
                } else {
                    expect(result).toEqual([]);
                }
            }
        );

        it('should only return eligible cards when multiple cards are provided', async () => {
            const eligibleCardA = new Card('A', Category.FIRST, 'Q1', 'A1', 'Tag1');
            eligibleCardA.lastResponseDate = LocalDateUtils.daysAgo(1);

            const cardB = new Card('B', Category.FIRST, 'Q2', 'A2', 'Tag2');
            cardB.lastResponseDate = LocalDateUtils.daysAgo(0);

            const eligibleCardC = new Card('C', Category.SECOND, 'Q3', 'A3', 'Tag3');
            eligibleCardC.lastResponseDate = LocalDateUtils.daysAgo(2);

            const cardD = new Card('D', Category.SECOND, 'Q4', 'A4', 'Tag4');
            cardD.lastResponseDate = LocalDateUtils.daysAgo(1);

            cardRepository.findAll.mockResolvedValue([eligibleCardA, cardB, eligibleCardC, cardD]);

            const result = await quizzService.getEligibleCards();

            // We expect only the eligible ones: eligibleCardA and eligibleCardC
            expect(result).toEqual([eligibleCardA, eligibleCardC]);
        });

        it('should not return newly created cards if a quizz has already has been generated today', async () => {
            const card = new Card(
                '1',
                Category.FIRST,
                'Q1',
                'A1',
                'Tag1'
            );

            cardRepository.findAll.mockResolvedValue([card]);

            const result = await quizzService.getEligibleCards();

            expect(result).toEqual([card]);

            const card2 = new Card(
                '2',
                Category.FIRST,
                'Q2',
                'A2',
                'Tag2'
            );

            cardRepository.findAll.mockResolvedValue([card, card2]);

            const updatedResult = await quizzService.getEligibleCards();

            expect(updatedResult).toEqual([card]);
        });

        it('should be able to get eligible cards for a given day', async () => {
            const card = new Card(
                '1',
                Category.FIRST,
                'Q1',
                'A1',
                'Tag1'
            );

            cardRepository.findAll.mockResolvedValue([card]);

            const result = await quizzService.getEligibleCardsAtDate(LocalDateUtils.daysAhead(1));

            expect(result).toEqual([card]);
        });

        it('should return the same cards if no new cards have been created or answered since yesterday / last quizz', async () => {
            const card = new Card(
                '1',
                Category.FIRST,
                'Q1',
                'A1',
                'Tag1'
            );

            cardRepository.findAll.mockResolvedValue([card]);

            const resultToday = await quizzService.getEligibleCardsAtDate(LocalDateUtils.today());

            expect(resultToday).toEqual([card]);

            const resultTomorrow = await quizzService.getEligibleCardsAtDate(LocalDateUtils.daysAhead(1));

            expect(resultTomorrow).toEqual([card]);
        });

        it('should not return newly created cards if a quizz has already has been generated today but should return it tomorrow', async () => {
            const card = new Card(
                '1',
                Category.FIRST,
                'Q1',
                'A1',
                'Tag1'
            );

            cardRepository.findAll.mockResolvedValue([card]);

            const result = await quizzService.getEligibleCards();

            expect(result).toEqual([card]);

            const card2 = new Card(
                '2',
                Category.FIRST,
                'Q2',
                'A2',
                'Tag2'
            );

            cardRepository.findAll.mockResolvedValue([card, card2]);

            const updatedResultToday = await quizzService.getEligibleCardsAtDate(LocalDateUtils.daysAhead(1));

            expect(updatedResultToday).toEqual([card]);

            const updatedResultTomorrow = await quizzService.getEligibleCardsAtDate(LocalDateUtils.daysAhead(1));

            expect(updatedResultTomorrow).toEqual([card, card2]);
        });
    });
});