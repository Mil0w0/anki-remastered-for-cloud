import {Inject, Injectable} from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';
import {Card} from '../domain/card.entity';
import {CardRepository} from '../domain/ports/card.repository';
import {CreateCardDto} from '../domain/dto/createCard.dto';
import {Category} from "../domain/category.enum";

@Injectable()
export class CardService {
    constructor(@Inject('CardRepository') private cardRepository: CardRepository) {
    }

    async createCard(createCardDto: CreateCardDto): Promise<Card> {
        const card = new Card(uuidv4(), Category.FIRST, createCardDto.question, createCardDto.answer, createCardDto.tag);
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

    async levelUpCardCategory(id: string): Promise<Card | undefined> {
        const card = await this.cardRepository.findById(id);
        if (!card) {
            return undefined;
        }
        card.levelUpCategory();
        await this.cardRepository.save(card);
        return card;
    }
}