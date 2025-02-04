import { Controller, Post, Body } from '@nestjs/common';
import { CardService } from '../../services/card.service';
import { Card } from '../../domain/card.entity';
import { CreateCardDto } from '../../domain/dto/createCard.dto';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async createCard(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardService.createCard(createCardDto);
  }
}