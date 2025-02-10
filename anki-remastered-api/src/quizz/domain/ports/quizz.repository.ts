import { Card } from "../../../cards/domain/card.entity";

export interface QuizzRepository {
    getQuizzForUser(userId: string): Card[] | null;
    saveQuizzForUser(userId: string, quizzData: Card[]): void;
}