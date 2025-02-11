// quizz.controller.ts
import {Controller, Get, Query} from '@nestjs/common';
import {QuizzService} from "../../services/quizz.service";
import {Card} from "../../../cards/domain/card.entity";
import {DateService} from "../../../utils/services/date.service";

@Controller('cards/quizz')
export class QuizzController {
    constructor(
        private readonly quizzService: QuizzService,
        private readonly dateService: DateService
    ) {
    }

    @Get()
    async getQuizz(@Query('date') date?: string): Promise<Card[]> {
        const quizzDate = this.dateService.parseDate(date);
        return this.quizzService.getEligibleCardsAtDate(quizzDate);
    }
}
