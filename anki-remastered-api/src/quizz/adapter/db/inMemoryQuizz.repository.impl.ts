import {Injectable} from "@nestjs/common";
import {QuizzRepository} from "../../domain/ports/quizz.repository";
import {Card} from "../../../cards/domain/card.entity";
import {LocalDateUtils} from "../../../utils/local.date.utils";

@Injectable()
export class InMemoryQuizzRepository implements QuizzRepository {

    // specific to our implementation because we are not handling user related data
    private userQuizzes:Map<String, Card[]> = new Map<String, Card[]>();

    getQuizzForUser(userId: string, quizzDate: Date): Card[] | undefined {
        return this.userQuizzes.get(LocalDateUtils.getLocalISOString(quizzDate));
    }

    saveQuizzForUser(userId: string, quizzDate: Date, quizzData: Card[]): void {
        this.userQuizzes.set(LocalDateUtils.getLocalISOString(quizzDate), quizzData);
    }

    getCardByIdAndQuizzDateForUser(userId: string, quizzDate:Date, cardId: string): Card | undefined {
        const quizz = this.getQuizzForUser(userId, quizzDate);
        if (!quizz) {
            return undefined;
        }
        return quizz.find(card => card.id === cardId);
    }
}
