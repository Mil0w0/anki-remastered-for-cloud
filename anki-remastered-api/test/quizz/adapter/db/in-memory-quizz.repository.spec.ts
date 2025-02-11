import {LocalDateUtils} from '../../../../src/utils/local.date.utils';
import {Card} from '../../../../src/cards/domain/card.entity';
import {InMemoryQuizzRepository} from "../../../../src/quizz/adapter/db/inMemoryQuizz.repository.impl";

describe('InMemoryQuizzRepository', () => {
    let quizzRepository: InMemoryQuizzRepository;
    let mockCard: Card;
    let mockCard2: Card;
    let userId: string;
    let quizzDate: Date;
    let quizzDateStr: string;

    beforeEach(() => {
        quizzRepository = new InMemoryQuizzRepository();
        userId = "user-123";
        quizzDate = LocalDateUtils.today();
        quizzDateStr = LocalDateUtils.getLocalISOString(quizzDate);

        mockCard = {id: "card-1", question: "What is NestJS?", answer: "A framework for building Node.js apps"} as Card;
        mockCard2 = {id: "card-2", question: "What is TypeScript?", answer: "A typed superset of JavaScript"} as Card;
    });

    describe('saveQuizzForUser', () => {
        it('should save quiz data for a user on a specific date', () => {
            quizzRepository.saveQuizzForUser(userId, quizzDate, [mockCard]);

            const storedQuizz = quizzRepository.getQuizzForUser(userId, quizzDate);
            expect(storedQuizz).toBeDefined();
            expect(storedQuizz?.length).toBe(1);
            expect(storedQuizz?.[0]).toEqual(mockCard);
        });

        it('should overwrite existing quiz data for the same date', () => {
            quizzRepository.saveQuizzForUser(userId, quizzDate, [mockCard]);
            quizzRepository.saveQuizzForUser(userId, quizzDate, [mockCard2]); // Overwriting with a different card

            const storedQuizz = quizzRepository.getQuizzForUser(userId, quizzDate);
            expect(storedQuizz).toBeDefined();
            expect(storedQuizz?.length).toBe(1);
            expect(storedQuizz?.[0]).toEqual(mockCard2); // Should contain the latest data
        });
    });

    describe('getQuizzForUser', () => {
        it('should return undefined if no quiz is found for the user', () => {
            const storedQuizz = quizzRepository.getQuizzForUser(userId, quizzDate);
            expect(storedQuizz).toBeUndefined();
        });

        it('should return stored quiz data if available', () => {
            quizzRepository.saveQuizzForUser(userId, quizzDate, [mockCard]);
            const storedQuizz = quizzRepository.getQuizzForUser(userId, quizzDate);

            expect(storedQuizz).toBeDefined();
            expect(storedQuizz?.length).toBe(1);
            expect(storedQuizz?.[0]).toEqual(mockCard);
        });
    });

    describe('getCardByIdAndQuizzDateForUser', () => {
        it('should return undefined if no quiz exists for the user on that date', () => {
            const foundCard = quizzRepository.getCardByIdAndQuizzDateForUser(userId, quizzDate, "card-1");
            expect(foundCard).toBeUndefined();
        });

        it('should return undefined if card ID does not exist in the quiz', () => {
            quizzRepository.saveQuizzForUser(userId, quizzDate, [mockCard]);
            const foundCard = quizzRepository.getCardByIdAndQuizzDateForUser(userId, quizzDate, "non-existent-card");

            expect(foundCard).toBeUndefined();
        });

        it('should return the correct card if it exists in the quiz', () => {
            quizzRepository.saveQuizzForUser(userId, quizzDate, [mockCard, mockCard2]);
            const foundCard = quizzRepository.getCardByIdAndQuizzDateForUser(userId, quizzDate, "card-2");

            expect(foundCard).toBeDefined();
            expect(foundCard).toEqual(mockCard2);
        });
    });
});
