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
    });
});