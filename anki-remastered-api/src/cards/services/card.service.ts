import {ForbiddenException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';
import {Card} from '../domain/card.entity';
import {CARD_REPOSITORY, CardRepository} from '../domain/ports/card.repository';
import {CreateCardDto} from '../domain/dto/createCard.dto';
import {Category} from "../domain/category.enum";
import {QuizzService} from "../../quizz/services/quizz.service";
import {QuizzValidationService} from "../../quizz/services/quizz.validation.service";
import {LocalDateUtils} from "../../utils/local.date.utils";

@Injectable()
export class CardService {
    constructor(
        @Inject(CARD_REPOSITORY) private cardRepository: CardRepository,
        private readonly quizzValidationService: QuizzValidationService
    ) {}

    async createCard(createCardDto: CreateCardDto): Promise<Card> {
        const card = new Card(uuidv4(), Category.FIRST, createCardDto.question, createCardDto.answer, createCardDto.tag);
        await this.cardRepository.save(card);
        return card;
    }

    async getCardById(id: string): Promise<Card | undefined> {
        return this.cardRepository.findById(id);
    }

    async getAllCards(tags?: string[]): Promise<Card[]> {
        const cards = this.cardRepository.findAll();
        if (tags) {
            return cards.then(cards => cards.filter(card => tags.includes(card.tag)));
        }
        return cards;
    }

    async answerCardAtDate(cardId: string, isCorrect: boolean, quizzDate:Date): Promise<void> {
        const card = await this.cardRepository.findById(cardId);
        if (!card) {
            throw new NotFoundException(`Card with id ${cardId} not found`);
        }

        if (!this.quizzValidationService.isCardInQuizz(card, quizzDate)) {
            throw new ForbiddenException(`Card with id ${cardId} is not in the current quizz`);
        }

        card.answerQuestion(isCorrect);
        await this.cardRepository.save(card);
    }

    async answerCard(cardId: string, isCorrect: boolean): Promise<void> {
       return this.answerCardAtDate(cardId, isCorrect, LocalDateUtils.today());
    }
}