import {Injectable} from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';
import {Card} from '../domain/card.entity';
import {CardRepository} from '../domain/ports/card.repository';
import {CreateCardDto} from '../domain/dto/createCard.dto';

@Injectable()
export class CardService {
    constructor(private readonly cardRepository: CardRepository) {
    }

    async createCard(createCardDto: CreateCardDto): Promise<Card> {
        const card = new Card(uuidv4(), "FIRST", createCardDto.question, createCardDto.answer, createCardDto.tag);
        await this.cardRepository.save(card);
        return card;
    }

    async getCardById(id: string): Promise<Card | undefined> {
        return this.cardRepository.findById(id);
    }

    async getAllCards(tag?: string): Promise<Card[]> {
        const cards = this.cardRepository.findAll();
        if (tag) {
            return cards.then(cards => cards.filter(card => card.tag === tag));
        }
        return cards;
    }
}