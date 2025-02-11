import {Inject, Injectable} from "@nestjs/common";
import {QuizzRepository} from "../domain/ports/quizz.repository";
import {Card} from "../../cards/domain/card.entity";

@Injectable()
export class QuizzValidationService {
    constructor(@Inject('QuizzRepository') private readonly quizzRepository: QuizzRepository) {}

    isCardInQuizz(card: Card, quizzDate:Date): boolean {
        const cardFromQuizz = this.quizzRepository.getCardByIdAndQuizzDateForUser("1", quizzDate, card.id);
        return cardFromQuizz !== undefined;
    }
}