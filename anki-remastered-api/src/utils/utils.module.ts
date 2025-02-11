import {Module} from "@nestjs/common";
import {QuizzController} from "../quizz/adapter/controller/quizz.controller";
import {QuizzService} from "../quizz/services/quizz.service";
import {QuizzValidationService} from "../quizz/services/quizz.validation.service";
import {InMemoryQuizzRepository} from "../quizz/adapter/db/inMemoryQuizz.repository.impl";
import {DateService} from "./services/date.service";

@Module({
    providers: [
        DateService
    ],
    exports: [
        DateService
    ],
})
export class UtilsModule {
}