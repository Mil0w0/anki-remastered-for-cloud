import { Injectable } from "@nestjs/common";
import { QuizzRepository } from "../../domain/ports/quizz.repository";
import { Card } from "../../../cards/domain/card.entity";

@Injectable()
export class InMemoryQuizzRepository implements QuizzRepository {

    // specific to our implementation because we are not handling user related data
    private userQuizzes: Card[] | null = null;

    getQuizzForUser(userId: string): Card[] | null {
        return this.userQuizzes;
    }

    saveQuizzForUser(userId: string, quizzData: Card[]): void {
        this.userQuizzes = quizzData;
    }
}
