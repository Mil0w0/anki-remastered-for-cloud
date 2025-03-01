import {Injectable} from '@nestjs/common';
import {CardRepository} from '../../domain/ports/card.repository';
import {Card} from '../../domain/card.entity';
import { Repository } from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class CardRepositoryImpl implements CardRepository {
    constructor(
        @InjectRepository(Card)
        private readonly repository: Repository<Card>,
    ) {}

    async save(card: Card): Promise<void> {
        await this.repository.save(card);
    }

    async findById(id: string): Promise<Card | undefined> {
        return this.repository.findOne({ where: { id } }).then(card =>
            card ? card : undefined
        );
    }

    async findAll(): Promise<Card[]> {
        return this.repository.find();
    }
}