import {Card} from '../card.entity';

export const CARD_REPOSITORY = Symbol('CardRepositorytest');

export interface CardRepository {
    save(card: Card): Promise<void>;

    findById(id: string): Promise<Card | undefined>;

    findAll(): Promise<Card[]>;
}