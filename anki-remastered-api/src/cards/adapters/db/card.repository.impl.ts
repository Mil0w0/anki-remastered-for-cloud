import { Injectable } from '@nestjs/common';
import { CardRepository } from '../../domain/ports/card.repository';
import { Card } from '../../domain/card.entity';

@Injectable()
export class CardRepositoryImpl implements CardRepository {
  private cards: Map<string, Card> = new Map();

  async save(card: Card): Promise<void> {
    this.cards.set(card.id, card);
  }
}