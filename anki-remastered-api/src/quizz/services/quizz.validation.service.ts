import {Injectable} from "@nestjs/common";
import {QuizzRepository} from "../domain/ports/quizz.repository";
import {Card} from "../../cards/domain/card.entity";
import {LocalDateUtils} from "../../utils/local.date.utils";

@Injectable()
export class QuizzValidationService {
    constructor(private readonly quizzRepository: QuizzRepository) {}

    isCardInQuizz(card: Card): boolean {
        const quizz = this.quizzRepository.getQuizzForUser("1", LocalDateUtils.today());
        return !!quizz?.map(card => card.id).includes(card.id);
    }
}