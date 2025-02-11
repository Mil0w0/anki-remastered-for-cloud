import {Body, Controller, Get, HttpCode, NotFoundException, Param, Patch, Post, Query} from '@nestjs/common';
import {CardService} from '../../services/card.service';
import {Card} from '../../domain/card.entity';
import {CreateCardDto} from '../../domain/dto/createCard.dto';
import {AnswerCardDto} from "../../domain/dto/answerCard.dto";
import {LocalDateUtils} from "../../../utils/local.date.utils";

@Controller('cards')
export class CardController {
    constructor(private readonly cardService: CardService) {
    }

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

    @Get()
    async getAllCards(@Query('tag') tag?: string): Promise<Card[]> {
        return this.cardService.getAllCards(tag);
    }

    @Patch(':id/answer')
    @HttpCode(204)
    async answerCard(@Param('id') id: string, @Body() answerCardDto: AnswerCardDto): Promise<void> {
        return this.cardService.answerCardAtDate(id, answerCardDto.isValid, answerCardDto.quizzDate || LocalDateUtils.today());
    }
}