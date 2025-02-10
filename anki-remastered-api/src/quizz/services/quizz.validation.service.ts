import {Injectable} from "@nestjs/common";
import {QuizzRepository} from "../domain/ports/quizz.repository";
import {Card} from "../../cards/domain/card.entity";
import {LocalDateUtils} from "../../utils/local.date.utils";

@Injectable()
export class QuizzValidationService {
    constructor(private readonly quizzRepository: QuizzRepository) {}

    isCardInQuizz(card: Card, quizzDate:Date): boolean {
        const quizz = this.quizzRepository.getQuizzForUser("1", quizzDate);
        return !!quizz?.map(card => card.id).includes(card.id);
    }
}