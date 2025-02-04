import { Controller, Post, Body, Param, Get, NotFoundException } from '@nestjs/common';
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

  @Get(':id')
  async getCardById(@Param('id') id: string): Promise<Card> {
    const card = await this.cardService.getCardById(id);
    if (!card) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }
    return card;
  }
}