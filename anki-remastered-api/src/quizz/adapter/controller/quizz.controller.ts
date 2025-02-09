// quizz.controller.ts
import {Controller, Get} from '@nestjs/common';
import {QuizzService} from "../../services/quizz.service";
import {Card} from "../../../cards/domain/card.entity";

@Controller('quizz')
export class QuizzController {
    constructor(private readonly quizzService: QuizzService) {}

    @Get()
    async getQuizz(): Promise<Card[]> {
        return this.quizzService.getEligibleCards();
    }

}
