import {Module} from "@nestjs/common";
import {QuizzController} from "./adapter/controller/quizz.controller";
import {QuizzService} from "./services/quizz.service";
import {QuizzValidationService} from "./services/quizz.validation.service";
import {InMemoryQuizzRepository} from "./adapter/db/inMemoryQuizz.repository.impl";
import {UtilsModule} from "../utils/utils.module";


@Module({
    imports: [UtilsModule],
    controllers: [QuizzController],
    providers: [
        QuizzService,
        QuizzValidationService,
        InMemoryQuizzRepository,
        {
            provide: 'QuizzRepository',
            useClass: InMemoryQuizzRepository
        }
    ],
    exports: [
        QuizzService,
        QuizzValidationService,
        'QuizzRepository'
    ],
})
export class QuizzModule {
}