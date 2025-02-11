import {CardService} from '../../../src/cards/services/card.service';
import {CardRepository} from '../../../src/cards/domain/ports/card.repository';
import {Card} from '../../../src/cards/domain/card.entity';
import {Category} from '../../../src/cards/domain/category.enum';
import {NotFoundException} from "@nestjs/common";
import {AnswerCardDto} from "../../../src/cards/domain/dto/answerCard.dto";
import {InMemoryQuizzRepository} from "../../../src/quizz/adapter/db/inMemoryQuizz.repository.impl";
import {QuizzValidationService} from "../../../src/quizz/services/quizz.validation.service";
import {LocalDateUtils} from "../../../src/utils/local.date.utils";

describe('CardService', () => {
    let cardService: CardService;
    let cardRepository: jest.Mocked<CardRepository>;
    let quizzValidationService: QuizzValidationService;

    beforeEach(() => {
        cardRepository = {
            findById: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn()
        } as unknown as jest.Mocked<CardRepository>;

        quizzValidationService = new QuizzValidationService(new InMemoryQuizzRepository());
        cardService = new CardService(
            cardRepository,
            quizzValidationService
        );
    });

    describe('answerCard', () => {

        it('should throw NotFoundException if card does not exist', async () => {
            cardRepository.findById.mockResolvedValue(undefined);

            await expect(
                cardService.answerCard('nonexistent-card-id', true),
            ).rejects.toThrow(NotFoundException);
        });

        it('should call answerQuestion on found card', async () => {
            const existingCard = new Card(
                'card-123',
                Category.FIRST,
                'Question?',
                'Answer',
                'SomeTag'
            );
            jest.spyOn(existingCard, 'answerQuestion');

            cardRepository.findById.mockResolvedValue(existingCard);
            quizzValidationService.isCardInQuizz = jest.fn().mockReturnValue(true);

            await cardService.answerCard('card-123', true);

            expect(existingCard.answerQuestion).toHaveBeenCalledWith(true);
        });

        it('should save the card after answering', async () => {
            const existingCard = new Card(
                'card-123',
                Category.FIRST,
                'Question?',
                'Answer',
                'SomeTag'
            );

            cardRepository.findById.mockResolvedValue(existingCard);
            quizzValidationService.isCardInQuizz = jest.fn().mockReturnValue(true);

            await cardService.answerCard('card-123', true);

            expect(cardRepository.save).toHaveBeenCalledWith(existingCard);
        });

        it('should handle isCorrect = false by calling answerQuestion(false)', async () => {
            const existingCard = new Card(
                'card-456',
                Category.FIFTH,
                'Question?',
                'Answer',
                'SomeTag'
            );
            jest.spyOn(existingCard, 'answerQuestion');

            cardRepository.findById.mockResolvedValue(existingCard);
            quizzValidationService.isCardInQuizz = jest.fn().mockReturnValue(true);

            await cardService.answerCard('card-456', false);

            expect(existingCard.answerQuestion).toHaveBeenCalledWith(false);
            expect(cardRepository.save).toHaveBeenCalledWith(existingCard);
        });

        it('should throw and error if the card is not in the quizz of the day', async () => {
            const cardId = 'card-123';
            const body: AnswerCardDto = {isValid: true};


            cardRepository.findById.mockResolvedValue(new Card(
                cardId,
                Category.FIRST,
                'Question?',
                'Answer',
                'SomeTag'
            ));

            await expect(cardService.answerCard(cardId, body.isValid)).rejects.toThrowError('Card with id card-123 is not in the current quizz');
        });

        it('should be possible possible to answer a card a given day', async () => {
            const cardId = 'card-123';
            const today = LocalDateUtils.today();
            const twoDaysAhead = LocalDateUtils.daysAhead(2);
            const body: AnswerCardDto = {
                isValid: true,
                quizzDate: twoDaysAhead
            };

            const card = new Card(
                cardId,
                Category.FIRST,
                'Question?',
                'Answer',
                'SomeTag'
            );

            cardRepository.findById.mockResolvedValue(card);
            // mock isCardInQuizz for today to return true and for the day of the card to return false
            quizzValidationService.isCardInQuizz = jest.fn().mockImplementation((id, date) => {
                return date === twoDaysAhead;
            });

            card.answerQuestion = jest.fn();

            await cardService.answerCardAtDate(cardId, body.isValid, body.quizzDate as Date);
            expect(card.answerQuestion).toHaveBeenCalledWith(true);
            expect(cardRepository.save).toHaveBeenCalledWith(card);


            await expect(cardService.answerCardAtDate(cardId, body.isValid, today)).rejects.toThrowError('Card with id card-123 is not in the current quizz');
        });
    });


});
