import { Card } from '../card.entity';

export interface CardRepository {
  save(card: Card): Promise<void>;
}